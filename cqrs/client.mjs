import { accountCommand } from "./accountCommand.mjs";
import { accountQuery } from "./accountQuery.mjs";

const id = accountCommand.addAccount("Dupont", "Jean");
accountCommand.addAccount("Martin", "Alice");

console.log("Liste :", accountQuery.getAccountList());

accountCommand.saveAccount(id, "Dupont", "Jeanne");

console.log("Liste :", accountQuery.getAccountList());
console.log("Compte :", accountQuery.getAccount(id));