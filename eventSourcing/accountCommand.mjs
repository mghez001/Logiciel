import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";
import { queryDatabase } from "./queryDatabase.mjs";
import { accountCache } from "./cache.mjs";
import { Event } from "./event.mjs";
import { eventStore } from "./eventStore.mjs";

function toSummary({ creationDate, ...summary }) {
  return summary;
}

function toCacheEntry({ lastName, firstName, ...rest }) {
  return { ...rest, name: `${firstName} ${lastName}` };
}

export const accountCommand = {
  addAccount(lastName, firstName) {
    const account = new Account(undefined, lastName, firstName);
    eventStore.addEvent(new Event("accountAdded", account.id, account));

    queryDatabase.accountSummaryList.push(toSummary(account));
    accountCache[account.id] = toCacheEntry(account);

    return account.id;
  },

  saveAccount(id, lastName, firstName) {
    const existing = accountCommandDAO.retrieveAccount(id);
    if (!existing) throw new Error(`Compte introuvable : ${id}`);
    const account = new Account(id, lastName, firstName, existing.creationDate);
    accountCommandDAO.updateAccount(account);

    const index = queryDatabase.accountSummaryList.findIndex((a) => a.id === id);
    queryDatabase.accountSummaryList[index] = toSummary(account);
    accountCache[id] = toCacheEntry(account);
  },
};