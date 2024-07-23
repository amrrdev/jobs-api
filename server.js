import connectDB from "./db/connect.js";

import dotenv from "dotenv";

import app from "./app.js";

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

connectDB(DB)
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => console.log(`DB Connection Error -> ${err.message}`));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
