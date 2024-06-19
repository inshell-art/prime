// sigterm-example.js

console.log(`Process PID: ${process.pid}`);

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Exiting gracefully...");
  process.exit(0);
});

// Keep the process running
setInterval(() => {
  console.log("Process is running...");
}, 1000);
