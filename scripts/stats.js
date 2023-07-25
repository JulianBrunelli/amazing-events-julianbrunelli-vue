const { createApp } = Vue;

createApp({
    data() {
        return {
            events: [],
            current: "",
            arrayCategoriesPast: [],
            arrayCategoriesUpComing: [],
            upComingEvents: [],
            pastEvents: [],
            percentage: [],
            revenues: "",
            percentageMinorAssist: "",
            percentageMinorAssistName: "",
            percentageMajorAssist: "",
            percentageMajorAssistName: "",
            arrayOrder: [],
            nameMajorCapacity: "",
            majorCapacity: Number,
            forCategoryPast: [],
            forCategoryUpComing: [],
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((data) => data.json())
            .then((data) => {
                this.events = data.events;
                this.current = data.currentDate
                this.upComingEvents = this.events.filter(event => event.date >= this.current)
                this.pastEvents = this.events.filter(event => event.date < this.current)
                this.arrayCategoriesPast = [...new Set(this.pastEvents.map((event) => event.category))];
                this.arrayCategoriesUpComing = [...new Set(this.upComingEvents.map((event) => event.category))];
                this.arrayOrder = this.events.sort((a, b) => a.capacity - b.capacity)
                this.nameMajorCapacity = this.arrayOrder[this.arrayOrder.length - 1].name
                this.majorCapacity = this.arrayOrder[this.arrayOrder.length - 1].capacity
                this.percentage = this.pastEvents.sort((a, b) => this.calculatePercentage(a.assistance, a.capacity) - this.calculatePercentage(b.assistance, b.capacity))
                this.percentageMinorAssist = this.calculatePercentage(this.percentage[0].assistance, this.percentage[0].capacity)
                this.percentageMinorAssistName = this.percentage[0].name
                this.percentageMajorAssist = this.calculatePercentage(this.percentage[this.percentage.length - 1].assistance, this.percentage[this.percentage.length - 1].capacity).toFixed(2)
                this.percentageMajorAssistName = this.percentage[this.percentage.length - 1].name
                this.forCategoryPast = this.arrayCategoriesPast.map(category => {
                    let eventFilter = this.pastEvents.filter(event => event.category == category)
                    assistance = 0;
                    capacity = 0;
                    let revenuesPastEvents = 0;
                    let percentageOfAssistancePastEvents = 0;
                    for (const event of eventFilter) {
                        revenuesPastEvents += event.price * event.assistance
                        assistance += event.assistance
                        capacity += event.capacity
                    }
                    percentageOfAssistancePastEvents = this.calculatePercentage(assistance, capacity).toFixed()
                    return { name: category, revenues: revenuesPastEvents.toLocaleString(), assistance: percentageOfAssistancePastEvents };
                })
                this.forCategoryUpComing = this.arrayCategoriesUpComing.map(category => {
                    let eventFilter = this.upComingEvents.filter(event => event.category == category)
                    estimate = 0;
                    capacity = 0;
                    let revenuesUpcoming = 0;
                    let percentageOfAssistanceUpcoming = 0;
                    for (const event of eventFilter) {
                        revenuesUpcoming += event.price * event.estimate
                        estimate += event.estimate
                        capacity += event.capacity
                    }
                    percentageOfAssistanceUpcoming = this.calculatePercentage(estimate, capacity).toFixed()
                    return { name: category, revenues: revenuesUpcoming.toLocaleString(), estimate: percentageOfAssistanceUpcoming };
                })
            })
            .catch((error) => console.error(error.message));
    },
    methods: {
        calculatePercentage(assistance, capacity) {
            let porcentaje = (assistance / capacity) * 100
            return porcentaje
        }
    },
}).mount("#app");