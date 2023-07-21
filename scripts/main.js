const { createApp } = Vue;

createApp({
    data() {
        return {
            events: [],
            arrayCategories: [],
            categoriesChecked: [],
            inputSearch: "",
            filterCrossed: [],
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((data) => data.json())
            .then((data) => {
                this.events = data.events;
                this.arrayCategories = [...new Set(this.events.map((event) => event.category))];
            })
            .catch((error) => console.error(error.message));
    },

    computed: {
        filterValue() {
            this.filterCrossed = this.events.filter(event => {
                return event.name.toLowerCase().includes(this.inputSearch.toLowerCase()) && (this.categoriesChecked.includes(event.category) || this.categoriesChecked.length == 0)
            })
        }
    },
}).mount("#app");
