import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";
import { queryDatabase } from "./queryDatabase.mjs";

function toSummary({ creationDate, ...summary }) {
  return summary;
}

export const accountCommand = {
  addAccount(lastName, firstName) {
    const account = new Account(undefined, lastName, firstName);
    accountCommandDAO.insertAccount(account);
    queryDatabase.accountSummaryList.push(toSummary(account));
    return account.id;
  },

  saveAccount(id, lastName, firstName) {
    const existing = accountCommandDAO.retrieveAccount(id);
    if (!existing) throw new Error(`Compte introuvable : ${id}`);
    const account = new Account(id, lastName, firstName, existing.creationDate);
    accountCommandDAO.updateAccount(account);

    const index = queryDatabase.accountSummaryList.findIndex((a) => a.id === id);
    queryDatabase.accountSummaryList[index] = toSummary(account);
  },
};