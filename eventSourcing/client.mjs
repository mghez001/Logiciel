import { accountCommand } from "./accountCommand.mjs";
import { accountQuery } from "./accountQuery.mjs";

const id = accountCommand.addAccount("Dupont", "Jean");
console.log("Compte :", accountQuery.getAccount(id));
const id2 = accountCommand.saveAccount(id,"Martin", "Alice");

//console.log("Liste :", accountQuery.getAccountList());

console.log("Compte :", accountQuery.getAccount(id2));