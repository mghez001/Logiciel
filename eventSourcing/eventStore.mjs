export const eventStore = {
  eventList: [],

  addEvent(event) {
    this.eventList.push(event);
    console.log("Événements :", this.eventList);
  },

  getEvents(accountId) {
    return this.eventList.filter((e) => e.accountId === accountId);
  },
};