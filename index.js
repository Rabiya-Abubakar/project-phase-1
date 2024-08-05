document.addEventListener('DOMContentLoaded', () => {
    const flightTypeSelect = document.getElementById('flight-type');
    const returnDateContainer = document.getElementById('return-date-container');
    const searchFlightsButton = document.getElementById('search-flights');
    const flightResults = document.getElementById('flight-results');
    const bookingDetails = document.getElementById('booking-details');
    const passengerDetailsContainer = document.getElementById('passenger-details');
    const confirmBookingButton = document.getElementById('confirm-booking');
    const confirmationMessage = document.getElementById('confirmation-message');
    let flightData = []; // Variable to hold fetched flight data

    // Show/Hide return date input based on flight type selection
    flightTypeSelect.addEventListener('change', () => {
        returnDateContainer.style.display = flightTypeSelect.value === 'return' ? 'block' : 'none';
    });

    // Fetch and display flights based on search criteria
    searchFlightsButton.addEventListener('click', () => {
        const departureStation = document.getElementById('departure-station').value;
        const arrivalStation = document.getElementById('arrival-station').value;
        const departureDate = document.getElementById('departure-date').value;
        const returnDate = document.getElementById('return-date').value;
        const adults = parseInt(document.getElementById('adults').value);
        const children = parseInt(document.getElementById('children').value);
        const totalPassengers = adults + children;

        fetch('flights.json')
            .then(response => response.json())
            .then(flights => {
                flightData = flights;
                flightResults.innerHTML = '';

                const filteredFlights = flights.filter(flight =>
                    flight.departure === departureStation &&
                    flight.arrival === arrivalStation &&
                    flight.departureTime.startsWith(departureDate)
                );

                const filteredReturnFlights = flightTypeSelect.value === 'return' ? 
                    flights.filter(flight =>
                        flight.departure === arrivalStation &&
                        flight.arrival === departureStation &&
                        flight.departureTime.startsWith(returnDate)
                    ) : [];

                const displayFlights = (flightsToDisplay, flightType) => {
                    if (flightsToDisplay.length === 0) {
                        flightResults.innerHTML += `<p>No ${flightType} flights found.</p>`;
                    } else {
                        flightsToDisplay.forEach(flight => {
                            const flightCard = document.createElement('div');
                            flightCard.className = 'flight-card';

                            flightCard.innerHTML = `
                                <div>
                                    <input type="radio" name="${flightType}-flight" class="select-flight" data-id="${flight.id}" data-seats="${flight.seatsAvailable}" data-price="${flight.price}">
                                    <span><strong>Flight Number:</strong> ${flight.flightNumber}</span>
                                </div>
                                <div>
                                    <span><strong>Origin:</strong> ${flight.departure}</span>
                                    <span><strong>Destination:</strong> ${flight.arrival}</span>
                                </div>
                                <div>
                                    <span><strong>Departure Time:</strong> ${new Date(flight.departureTime).toLocaleString()}</span>
                                    <span><strong>Arrival Time:</strong> ${new Date(flight.arrivalTime).toLocaleString()}</span>
                                </div>
                                <div>
                                    <span><strong>Price:</strong> KES ${flight.price.toFixed(2)}</span>
                                </div>
                                <div>
                                    <span><strong>Seats Available:</strong> ${flight.seatsAvailable}</span>
                                </div>
                            `;

                            flightResults.appendChild(flightCard);
                        });
                    }
                };

                displayFlights(filteredFlights, 'outbound');
                if (flightTypeSelect.value === 'return') {
                    const returnFlightsHeader = document.createElement('h2');
                    returnFlightsHeader.textContent = 'Return Flights';
                    flightResults.appendChild(returnFlightsHeader);
                    displayFlights(filteredReturnFlights, 'return');
                }

                const submitButton = document.createElement('button');
                submitButton.textContent = 'Submit';
                submitButton.id = 'submit-flights';
                flightResults.appendChild(submitButton);

                submitButton.addEventListener('click', () => {
                    const selectedDepartureFlight = document.querySelector('input[name="outbound-flight"]:checked');
                    const selectedReturnFlight = document.querySelector('input[name="return-flight"]:checked');

                    if (!selectedDepartureFlight || (flightTypeSelect.value === 'return' && !selectedReturnFlight)) {
                        alert('Please select both departure and return flights.');
                        return;
                    }

                    const departureFlightId = parseInt(selectedDepartureFlight.dataset.id);
                    const returnFlightId = flightTypeSelect.value === 'return' ? parseInt(selectedReturnFlight.dataset.id) : null;
                    const totalPassengers = adults + children;

                    const updatedFlights = flightData.map(flight => {
                        if (flight.id === departureFlightId || flight.id === returnFlightId) {
                            flight.seatsAvailable -= totalPassengers;
                        }
                        return flight;
                    });

                    const departureFlight = updatedFlights.find(flight => flight.id === departureFlightId);
                    const returnFlight = returnFlightId ? updatedFlights.find(flight => flight.id === returnFlightId) : null;
                    const totalCost = (departureFlight.price * totalPassengers) + (returnFlight ? returnFlight.price * totalPassengers : 0);

                    const selectedFlightsContainer = document.createElement('div');
                    selectedFlightsContainer.className = 'selected-flights-container';

                    const selectedDepartureFlightCard = createFlightCard(departureFlight);
                    selectedFlightsContainer.appendChild(selectedDepartureFlightCard);

                    if (returnFlight) {
                        const selectedReturnFlightCard = createFlightCard(returnFlight);
                        selectedFlightsContainer.appendChild(selectedReturnFlightCard);
                    }

                    const totalCostDiv = document.createElement('div');
                    totalCostDiv.className = 'total-cost';
                    totalCostDiv.innerHTML = `<span><strong>Total Cost:</strong> KES ${totalCost.toFixed(2)}</span>`;
                    selectedFlightsContainer.appendChild(totalCostDiv);

                    flightResults.innerHTML = '';
                    flightResults.appendChild(selectedFlightsContainer);

                    bookingDetails.style.display = 'block';

                    const numPassengers = adults + children;
                    passengerDetailsContainer.innerHTML = '<h2>Passenger Details</h2>';

                    for (let i = 0; i < numPassengers; i++) {
                        const passengerInputDiv = document.createElement('div');
                        passengerInputDiv.className = 'section';
                        passengerInputDiv.innerHTML = `
                            <label for="passenger-name-${i}">Passenger ${i + 1} Name:</label>
                            <input type="text" id="passenger-name-${i}" required>
                        `;
                        passengerDetailsContainer.appendChild(passengerInputDiv);
                    }

                    confirmBookingButton.style.display = 'block';

                    confirmBookingButton.addEventListener('click', () => {
                        const email = document.getElementById('email').value;
                        const creditCardNumber = document.getElementById('credit-card-number').value;
                        const cvv = document.getElementById('cvv').value;
                        const expirationDate = document.getElementById('expiration-date').value;

                        if (!email || !creditCardNumber || !cvv || !expirationDate) {
                            alert('Please fill out all the booking details.');
                            return;
                        }

                        // Normally, here you would send booking data to the server
                        // For demo purposes, just show a confirmation message

                        bookingDetails.style.display = 'none';
                        confirmationMessage.style.display = 'block';

                        // Reset the flight results and booking details
                        flightResults.innerHTML = '';
                        bookingDetails.innerHTML = '';
                    });
                });
            });
    });

    function createFlightCard(flight) {
        const flightCard = document.createElement('div');
        flightCard.className = 'flight-card';

        flightCard.innerHTML = `
            <div>
                <span><strong>Flight Number:</strong> ${flight.flightNumber}</span>
            </div>
            <div>
                <span><strong>Origin:</strong> ${flight.departure}</span>
                <span><strong>Destination:</strong> ${flight.arrival}</span>
            </div>
            <div>
                <span><strong>Departure Time:</strong> ${new Date(flight.departureTime).toLocaleString()}</span>
                <span><strong>Arrival Time:</strong> ${new Date(flight.arrivalTime).toLocaleString()}</span>
            </div>
            <div>
                <span><strong>Price:</strong> KES ${flight.price.toFixed(2)}</span>
            </div>
            <div>
                <span><strong>Seats Available:</strong> ${flight.seatsAvailable}</span>
            </div>
        `;
        return flightCard;
    }
});
// How to ignore and cancel the booking function didnt work accordingly so I didnt implement it :https://stackoverflow.com/questions/26708969/cancel-reset-the-html-button-is-not-working