import app from "./backhend/main.js";
import connectDb from "./backhend/config/db.js";
import dotenv from "dotenv";
import dns from "node:dns";

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);



dotenv.config({
    path: "./backhend/.env"
});

await connectDb();

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });


export default app;