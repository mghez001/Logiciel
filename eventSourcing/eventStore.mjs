export const eventStore = {
  eventList: [],

  addEvent(event) {
    this.eventList.push(event);
    console.log("Événements :", this.eventList);
  },
};