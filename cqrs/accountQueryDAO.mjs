import { ACCOUNT_LIST } from "./database.mjs";
import { queryDatabase } from "./queryDatabase.mjs";

export const accountQueryDAO = {
  retrieveAccountList() {
    return queryDatabase.accountSummaryList;
  },

  retrieveAccount(id) {
    const account = ACCOUNT_LIST.find((a) => a.id === id);
    if (!account) return undefined;
    const { lastName, firstName, ...rest } = account;
    return { ...rest, name: `${firstName} ${lastName}` };
  },
};