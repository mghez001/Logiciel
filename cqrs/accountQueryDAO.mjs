import { ACCOUNT_LIST } from "./database.mjs";

export const accountQueryDAO = {
  retrieveAccountList() {
    return ACCOUNT_LIST.map(({ creationDate, ...account }) => account);
  },

  retrieveAccount(id) {
    const account = ACCOUNT_LIST.find((a) => a.id === id);
    if (!account) return undefined;
    const { lastName, firstName, ...rest } = account;
    return { ...rest, name: `${firstName} ${lastName}` };
  },
};