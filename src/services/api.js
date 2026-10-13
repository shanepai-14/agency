/**
 * Form submission services.
 *
 * Every function below is a MOCK: it waits for a short delay and resolves
 * with a success response. Nothing is sent anywhere.
 *
 * To connect a real backend later, replace the body of each function with
 * the `fetch` call shown in its "REAL API" comment. Components only depend
 * on the function names and on the promise resolving (success) or
 * rejecting with an Error (failure), so no component changes are needed.
 *
 * Testing tip: an email address ending in "@fail.test" makes the mock
 * reject, so you can see the error state in each form.
 */

/** Base URL for the future API, e.g. VITE_API_URL=https://api.example.com in .env */
// eslint-disable-next-line no-unused-vars
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

const MOCK_DELAY_MS = 1200;

/** Simulates a network request. */
function mockRequest(endpoint, payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const email = payload instanceof FormData ? payload.get('email') : payload?.email;
      if (typeof email === 'string' && email.toLowerCase().endsWith('@fail.test')) {
        reject(new Error('The server could not process your request. Please try again.'));
        return;
      }
      resolve({ ok: true, endpoint, reference: `REF-${Date.now().toString(36).toUpperCase()}` });
    }, MOCK_DELAY_MS);
  });
}

/**
 * Honeypot check: bots tend to fill every field. If the hidden `website`
 * field has a value, pretend the submission succeeded but send nothing.
 * Keep this check on the server as well once a real API exists.
 */
function isSpam(data) {
  return Boolean(data?.website);
}

/** Converts form values (including File arrays) into multipart FormData. */
function toFormData(data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item)); // Files and string arrays
    } else if (value !== undefined && value !== null) {
      formData.append(key, typeof value === 'boolean' ? String(value) : value);
    }
  });
  return formData;
}

/** Shared error handling for real fetch calls (used once the API is connected). */
// eslint-disable-next-line no-unused-vars
async function handleResponse(response) {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Something went wrong. Please try again.');
  }
  return response.json();
}

/**
 * Seafarer application (multipart: includes CV and certificate files).
 * @param {object} data – values from the application form
 */
export async function submitApplication(data) {
  if (isSpam(data)) return { ok: true };
  const formData = toFormData(data);

  // REAL API: replace the line below with:
  // const response = await fetch(`${API_BASE_URL}/api/applications`, {
  //   method: 'POST',
  //   body: formData, // do NOT set Content-Type; the browser sets the multipart boundary
  // });
  // return handleResponse(response);
  return mockRequest('/api/applications', formData);
}

/**
 * Ship owner inquiry (JSON).
 * @param {object} data – values from the inquiry form
 */
export async function submitInquiry(data) {
  if (isSpam(data)) return { ok: true };

  // REAL API: replace the line below with:
  // const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return handleResponse(response);
  return mockRequest('/api/inquiries', data);
}

/**
 * General contact message (JSON).
 * @param {object} data – values from the contact form
 */
export async function submitContact(data) {
  if (isSpam(data)) return { ok: true };

  // REAL API: replace the line below with:
  // const response = await fetch(`${API_BASE_URL}/api/contact`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return handleResponse(response);
  return mockRequest('/api/contact', data);
}
