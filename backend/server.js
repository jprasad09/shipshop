const app = require("./app");
const connectDatabase = require("./db/database");
const cloudinary = require("cloudinary");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server to handle uncaught exception`);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
}

// Connect db
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// Create server
const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server is running on port ${process.env.PORT}`
    );
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server. Error: ${err.message}`);
    console.log(`Shutting down the server to handle promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});