import "dotenv/config";
import mongoose from "mongoose";
import { Server, createServer } from "http";
import app from "./app";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server = createServer(app);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) {
  throw new Error("MONGODB_URL is not defined in the environment variables");
}
async function main() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Mongodb connected successfully");

    server = app.listen(PORT, () => {
      console.log(`App is listening on port:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

export default server;
