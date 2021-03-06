import { DB } from "https://deno.land/x/keyv/mod.ts";

// Need to make a new file called `db.sqlite` in your folder.
// The second value is the name of the database.. You can name is anything you want
const db = new DB("db.sqlite", "userinfo");

// Important line to write before doing any operations!
await db.init();

// Set an object in the database.
//            Key           Value
await db.set("user", { name: "Alex" });
// Data -> 'user': { 'name': 'Alex' }

await db.set("user.gender", "male");
// Data -> 'user': { 'name': 'Alex', 'gender': 'male' }

await db.set("user.age", 33);
// Data -> 'user': { 'name': 'Alex', 'gender': 'male', 'age': 33}

// Getting the data from the database
const data = await db.get("user");
console.log(data);
// Output -> { 'name': 'Alex', 'gender': 'male', 'age': 33}

const age = await db.get("user.age");
console.log(age);
// Output -> 33
