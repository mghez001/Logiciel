import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";

export const accountCommand = {
  addAccount(lastName, firstName) {
    const account = new Account(undefined, lastName, firstName);
    accountCommandDAO.insertAccount(account);
    return account.id;
  },

  saveAccount(id, lastName, firstName) {
    const existing = accountCommandDAO.retrieveAccount(id);
    if (!existing) throw new Error(`Compte introuvable : ${id}`);
    const account = new Account(id, lastName, firstName, existing.creationDate);
    accountCommandDAO.updateAccount(account);
  },
};