import { Account } from "./account.mjs";
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

function rebuildAccount(id) {
  let account;
  for (const event of eventStore.getEvents(id)) {
    if (event.name === "accountAdded") account = { ...event.payload };
    if (event.name === "accountUpdated") account = { ...account, ...event.payload };
  }
  return account;
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
    if (!rebuildAccount(id)) throw new Error(`Compte introuvable : ${id}`);
    eventStore.addEvent(new Event("accountUpdated", id, { lastName, firstName }));

    const account = rebuildAccount(id);
    const index = queryDatabase.accountSummaryList.findIndex((a) => a.id === id);
    queryDatabase.accountSummaryList[index] = toSummary(account);
    accountCache[id] = toCacheEntry(account);
  },
};