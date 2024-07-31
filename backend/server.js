const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

process.on("uncaughtException", (err)=>{
    console.log(`Error : ${err.message} `);
    console.log("server is closed due to uncaught exception");

    process.exit(1);

})

dotenv.config({path : "backend/config/.env"});
connectDB();
// Access the PORT environment variable
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined

// Start the server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message} `);
    console.log("server is closed due to unhandled promise rejection");

    server.close(()=>{
        process.exit(1);
    });
});
