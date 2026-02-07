import app from "./app.js";
import connectDB from "./config/db.js";


// ---------------------------
// DATABASE CONNECTION
// ---------------------------
connectDB();

// ---------------------------
// START SERVER
// ---------------------------
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
})

// ---------------------------
// ERROR HANDLING
// ---------------------------
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

export default server;