import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://tutulkabir:Tk3066abd%40@cluster0.vzz24au.mongodb.net/library-management-system?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Mongodb connected successfully");

    server = app.listen(PORT, () => {
      console.log(`App is listening on port:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
