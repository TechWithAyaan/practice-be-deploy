import app from "./src/main.js";
import connectDb from "./src/config/db.js";
import dotenv from "dotenv";
import dns from "node:dns";

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);

dotenv.config();

await connectDb();

// For Vercel serverless environment
export default app;

// For local development
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}