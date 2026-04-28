'use client';

interface Step8ExtraProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const inputStyle = {
  background: '#091420',
  border: '1px solid rgba(0,200,255,0.18)',
  borderRadius: '12px',
  color: '#EEF6FF',
  fontFamily: "'IBM Plex Sans'",
  fontSize: '18px',
  lineHeight: '1.6',
  padding: '12px 16px',
  width: '100%',
  resize: 'none' as const,
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

export function Step8Extra({ value, onChange, error }: Step8ExtraProps) {
  const maxLength = 200;

  return (
    <div className="space-y-3">
      <div>
        <label
          className="block font-semibold mb-2"
          style={{ color: '#7ABFDF', fontFamily: "'Exo 2'", fontSize: '16px' }}
        >
          Final Context <span style={{ color: '#4A7C9A', fontWeight: 400 }}>(Optional)</span>
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          placeholder="E.g., Launching next month, team of 3, targeting enterprise, seasonal business"
          maxLength={maxLength}
          rows={3}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,200,255,0.55)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,200,255,0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,200,255,0.18)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <div className="text-right mt-1" style={{ color: '#4A7C9A', fontFamily: "'IBM Plex Sans'", fontSize: '14px' }}>
          {value.length} / {maxLength}
        </div>
      </div>

      {error && (
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5', fontFamily: "'IBM Plex Sans'", fontSize: '16px' }}
        >
          {error}
        </div>
      )}

      <div
        className="rounded-xl px-4 py-3"
        style={{ background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.12)', color: '#7ABFDF', fontFamily: "'IBM Plex Sans'", fontSize: '14px' }}
      >
        Click "Generate Sprint" to create your 30-day plan.
      </div>
    </div>
  );
}
