import { Database, DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";

console.info("> Creating database..."); // LOG
const db = new Database("sqlite3", {
  filepath: "./database.sqlite",
});

console.info("> Create a model to a table..."); // LOG
class Management extends Model {
  static table = "top_clothes"; // name of the table
  static timestamps = true; // to add 'created_at' and 'updated_at' fields

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    product: DataTypes.STRING, // produto
    quantity: DataTypes.INTEGER, // quantidade
    provider: DataTypes.STRING, // fornecedor
    price: DataTypes.BOOLEAN, // preço
    current_inventory: DataTypes.INTEGER, // estoque atual
    size: DataTypes.STRING, // tamanho
    input_values: DataTypes.FLOAT, // valor de entrada
    output_values: DataTypes.FLOAT, // valor de saida
  };
}

Management.on("creating", () => {
  console.log("- Creating a flight record");
});

Management.on("created", (model: Management) => {
  console.log("- Created:", model.id);
});

Management.on("updating", () => {
  console.log("- Updating a flight record");
});

Management.on("updated", (model: Management) => {
  console.log("- Updated:", model.id);
});

Management.on("deleting", () => {
  console.log("- Deleting a flight record");
});

Management.on("deleted", (model: Management) => {
  console.log("- Deleted:", model.id);
});

console.info("> Linking a model to database..."); // LOG
db.link([Management]);

console.info("> Sync database with models..."); // LOG
// sync with existing data
db.sync();

// drop existing data and sync the new models
// db.sync({ drop: true });

console.info("> Add some data inside 'top_clothes' table..."); // LOG
await Management.create([
  {
    product: "CROPPED COURINO MARROM CLARO – VILMITA",
    quantity: 2, // quantidade
    provider: "Luana", // fornecedor
    price: 25.00, // preço
    current_inventory: 2, // estoque atual
    size: "M", // tamanho
    input_values: 25.00, // valor de entrada
    output_values: 25.00, // valor de saida
  },
  {
    product: "CROPPED COURINO PRETO – ANTONY",
    quantity: 2, // quantidade
    provider: "Luana", // fornecedor
    price: 20.00, // preço
    current_inventory: 2, // estoque atual
    size: "M, G", // tamanho
    input_values: 20.00, // valor de entrada
    output_values: 20.00, // valor de saida
  },
]);

console.info("> Get all data inside 'product' column..."); // LOG
console.log(await Management.select("product").all());

console.info("> Get all data of 'top_clothes' table..."); // LOG
console.log(await Management.all());

console.info("> Get all data of id 1..."); // LOG
console.log(await Management.where("id", 1).all());

console.info("> Update the data of id 1..."); // LOG
await Management.where("id", 1).update("current_inventory", 5);

console.info("> Get all data of id 1..."); // LOG
console.log(await Management.where("id", 1).all());
