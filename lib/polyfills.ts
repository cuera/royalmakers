// Next 14+ (webpack 5) no longer polyfills node core libs in the browser.
// Supabase needs crypto (webcrypto). Provide it if it's missing.
if (typeof window !== 'undefined' && !window.crypto) {
  // @ts-ignore
  window.crypto = require('crypto').webcrypto;
}
