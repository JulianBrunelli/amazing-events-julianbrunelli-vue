const { createApp } = Vue;

createApp({
    data() {
        return {
            events: [],
            idDetails: "",
            paramsDetails: "",
            idParameters: "",
            eventDetails: null
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((data) => data.json())
            .then((data) => {
                this.events = data.events;
                this.idDetails = location.search
                this.paramsDetails = new URLSearchParams(this.idDetails)
                this.idParameters = this.paramsDetails.get('idEvent')
                this.eventDetails = this.events.find(event => event._id == this.idParameters)
            })
            .catch((error) => console.error(error.message));
    },
    computed: {
    },
}).mount("#app");



