import { type Server } from "http";

export function shutdown(server: Server) {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed successfully.");
    process.exit(0);
  });
  setTimeout(() => {
    console.error("Server did not close in time. Forcing shutdown.");
    process.exit(1);
  }, 10000);
}
