import { ACCOUNT_LIST } from "./database.mjs";

export const accountCommandDAO = {
  insertAccount(account) {
    ACCOUNT_LIST.push(account);
    console.log("BDD :", ACCOUNT_LIST);
  },

  updateAccount(account) {
    const index = ACCOUNT_LIST.findIndex((a) => a.id === account.id);
    if (index === -1) throw new Error(`Compte introuvable : ${account.id}`);
    ACCOUNT_LIST[index] = account;
    console.log("BDD :", ACCOUNT_LIST);
  },

  retrieveAccount(id) {
    return ACCOUNT_LIST.find((a) => a.id === id);
  },
};