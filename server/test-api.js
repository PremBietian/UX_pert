import http from 'http';

function makeRequest({ path, method = 'GET', body = null, headers = {} }) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
          ...headers,
        },
      },
      (res) => {
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            const json = JSON.parse(rawData);
            resolve({ statusCode: res.statusCode, data: json });
          } catch {
            resolve({ statusCode: res.statusCode, raw: rawData });
          }
        });
      }
    );

    req.on('error', reject);
    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting UXpert Backend API Tests ---');

  // Test 1: Health Check
  console.log('\n[Test 1] GET /api/health');
  const healthRes = await makeRequest({ path: '/api/health' });
  console.log('Status:', healthRes.statusCode);
  console.log('Response:', healthRes.data);
  if (healthRes.statusCode !== 200 || healthRes.data?.status !== 'ok') {
    throw new Error('Health check failed');
  }

  // Test 2: Validation Failure (empty body)
  console.log('\n[Test 2] POST /api/enquiries (empty payload for validation failure)');
  const invalidRes = await makeRequest({
    path: '/api/enquiries',
    method: 'POST',
    body: {},
  });
  console.log('Status:', invalidRes.statusCode);
  console.log('Errors:', invalidRes.data?.errors);
  if (invalidRes.statusCode !== 400 || !invalidRes.data?.errors) {
    throw new Error('Validation test failed');
  }

  // Test 3: Valid Enquiry Submission
  console.log('\n[Test 3] POST /api/enquiries (valid payload)');
  const validPayload = {
    name: 'Sarah Connor',
    organization: 'Cyberdyne Systems',
    email: 'sarah.connor@example.com',
    phone: '+91 9876543210',
    service: 'Web Development',
    description: 'We need a high-performance web platform redesign with custom interactive animations.',
  };
  const validRes = await makeRequest({
    path: '/api/enquiries',
    method: 'POST',
    body: validPayload,
  });
  console.log('Status:', validRes.statusCode);
  console.log('Created Data:', validRes.data);
  if (validRes.statusCode !== 201 || !validRes.data?.success) {
    throw new Error('Valid enquiry creation failed');
  }

  // Test 4: Retrieve Enquiries
  console.log('\n[Test 4] GET /api/enquiries (verify persistence)');
  const listRes = await makeRequest({ path: '/api/enquiries' });
  console.log('Status:', listRes.statusCode);
  console.log('Total Count:', listRes.data?.pagination?.total);
  console.log('First Record Name:', listRes.data?.data?.[0]?.name);
  if (listRes.statusCode !== 200 || listRes.data?.pagination?.total < 1) {
    throw new Error('Listing enquiries failed');
  }

  console.log('\n=== All 4 API Tests Passed Successfully! ===');
}

runTests().catch((err) => {
  console.error('\n❌ Test Failure:', err);
  process.exit(1);
});
