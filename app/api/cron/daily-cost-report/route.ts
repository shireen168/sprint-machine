import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Runs daily at 21:00 MYT (13:00 UTC)
export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized invocations
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Query Anthropic API usage
    const response = await fetch('https://api.anthropic.com/account/usage', {
      method: 'GET',
      headers: {
        'api-key': process.env.ANTHROPIC_API_KEY!,
      },
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const usage = await response.json() as {
      input_tokens: number;
      output_tokens: number;
    };

    // Calculate costs
    const inputCost = (usage.input_tokens / 1_000_000) * 0.8; // Haiku input
    const outputCost = (usage.output_tokens / 1_000_000) * 4.0; // Haiku output
    const dailyCost = inputCost + outputCost;
    const monthlyCost = dailyCost; // Approximation - actual is cumulative

    // Format report
    const report = {
      date: new Date().toISOString().split('T')[0],
      daily_spend: dailyCost.toFixed(4),
      estimated_monthly: monthlyCost.toFixed(4),
      monthly_budget: '5.00',
      budget_used: ((monthlyCost / 5.0) * 100).toFixed(1),
      tokens_used: {
        input: usage.input_tokens,
        output: usage.output_tokens,
      },
    };

    // Send email
    if (process.env.RESEND_API_KEY) {
      await sendEmail(report);
    }

    return NextResponse.json({
      success: true,
      report,
      email_sent: !!process.env.RESEND_API_KEY,
    });
  } catch (error) {
    console.error('Cost report generation failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function sendEmail(report: {
  date: string;
  daily_spend: string;
  estimated_monthly: string;
  monthly_budget: string;
  budget_used: string;
  tokens_used: { input: number; output: number };
}) {
  const subject = `Sprint Machine API Cost Report - ${report.date}`;
  const htmlContent = `
    <h2>Daily API Cost Report</h2>
    <p><strong>Date:</strong> ${report.date}</p>
    <table border="1" cellpadding="10">
      <tr>
        <td><strong>Metric</strong></td>
        <td><strong>Value</strong></td>
      </tr>
      <tr>
        <td>Daily Spend</td>
        <td>$${report.daily_spend}</td>
      </tr>
      <tr>
        <td>Estimated Monthly</td>
        <td>$${report.estimated_monthly}</td>
      </tr>
      <tr>
        <td>Monthly Budget</td>
        <td>$${report.monthly_budget}</td>
      </tr>
      <tr>
        <td>Budget Used</td>
        <td>${report.budget_used}%</td>
      </tr>
      <tr>
        <td>Input Tokens</td>
        <td>${report.tokens_used.input.toLocaleString()}</td>
      </tr>
      <tr>
        <td>Output Tokens</td>
        <td>${report.tokens_used.output.toLocaleString()}</td>
      </tr>
    </table>
    <p style="margin-top: 20px; color: #666; font-size: 12px;">
      Automated report from Sprint Machine. Monthly budget reset: 1st of each month.
    </p>
  `;

  if (process.env.RESEND_API_KEY) {
    // Using Resend email service (free tier available)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@sprint-machine.vercel.app',
        to: process.env.DAILY_REPORT_EMAIL || 'shireenlowyk@gmail.com',
        subject,
        html: htmlContent,
      }),
    });
  }
}
