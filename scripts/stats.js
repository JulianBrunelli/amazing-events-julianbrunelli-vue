
// id: "",
// this.id = this.events.filter(event => event._id)
const { createApp } = Vue;

createApp({
    data() {
        return {
            events: [],
            current: "",
            arrayCategories: [],
            categoriesChecked: [],
            inputSearch: "",
            filterCrossed: [],
            upComingEvents: [],
            pastEvents: [],
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((data) => data.json())
            .then((data) => {
                this.events = data.events;
                this.arrayCategories = [...new Set(this.events.map((event) => event.category))];
                this.current = data.currentDate
                this.upComingEvents = this.events.filter(event => event.date >= this.current)
                this.pastEvents = this.events.filter(event => event.date < this.current)
            })
            .catch((error) => console.error(error.message));
    },
    computed: {
        filterValue() {
            this.filterCrossed = this.pastEvents.filter(event => {
                return event.name.toLowerCase().includes(this.inputSearch.toLowerCase()) && (this.categoriesChecked.includes(event.category) || this.categoriesChecked.length == 0)
            })
        }
    },
}).mount("#app");