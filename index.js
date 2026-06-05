/**
 * Returns a hello world greeting.
 * @returns {string}
 */
export function helloWorld() {
  return "Hello, World!";
}

// Run when executed directly: `node index.js`
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(helloWorld());
}
