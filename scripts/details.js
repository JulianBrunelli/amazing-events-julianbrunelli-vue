let cardsDetails = document.getElementById("cardsDetails")
let events = []
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resulte => resulte.json())
    .then(datos => {
        events = datos.events
        let idDetails = location.search
        let paramsDetails = new URLSearchParams(idDetails)
        let objectEvent = paramsDetails.get('idEvent')
        let eventDetails = events.find(event => event._id == objectEvent)
        crearMaqueta(eventDetails, cardsDetails)
    })
    .catch(error => console.error(error))

function crearMaqueta(event, container) {
    container.innerHTML = `<div
    class="card card-details-js mb-3 mt-3 col-9 d-flex flex-column align-items-center flex-lg-row"
    >
    <img
        src="${event.image}"
        class="card-img-top image-details"
        alt=""
    />
    <section>
        <h5 class="card-title text-center mt-1 text-decoration-underline">
        ${event.name}
        </h5>
        <p>Date: ${event.date}</p>
        <p>
        Description: ${event.description}
        </p>
        <p>Category: ${event.category}</p>
        <p>Place: ${event.place}</p>
        <p>Capacity: ${event.capacity}</p>
        <p>Assistance: ${event.assistance}</p>
        <p>Price: $ ${event.price} USD</p>
    </section>
    </div>`
}



