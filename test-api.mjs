// Test the API endpoint without auth
const testData = {
  product: "Test Product",
  customer: "Test Customer",
  goal: "awareness",
  platforms: ["instagram"],
  budget: "0-500",
  tried: "content",
  tried_details: "Some previous attempts",
  differentiator: "Test differentiator",
  extra: ""
};

// We can't actually test without a valid Clerk token, but we can check
// if the endpoint exists and what the errors are
console.log('Test data:', testData);
console.log('Note: Full test requires valid Clerk authentication token');
