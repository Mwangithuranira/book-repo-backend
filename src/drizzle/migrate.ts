// import "dotenv/config";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
// import db from "./db";
// import client from "./db";


// async function migration() {
//     console.log("===Running migrations====");
//     await migrate(db,{ migrationsFolder: __dirname + "/migrations" });
//     await client.end();
//     console.log("====Migrations complete=====");
//     process.exit(0)

// } 
// migration().catch((err) => {
//     console.error(err);
//     process.exit(0);
// });