global.__VITE_GET_PRIME = 'http://localhost:3000/';
// jest.setup.js
Object.defineProperty(window.navigator, 'userAgent', {
  value:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  writable: true,
});
