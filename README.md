Flight Booking Single Page Application (SPA)
Introduction
This project is a Single Page Application (SPA) for booking flights. It allows users to search for flights, view results, and complete bookings all within a single page. The application integrates with a public API or db.json file to fetch flight data and handle booking interactions.

Objectives
Search for flights based on departure and arrival stations, dates, and passenger counts.
Display search results with detailed flight information.
Allow users to select flights, confirm bookings, and enter payment details.
Handle all interactions asynchronously within a single page.
Guide on How to Run the Application
Prerequisites
Node.js: Ensure you have Node.js installed on your computer. Follow these instructions to install Node.js.
JSON-Server: This project uses JSON-Server to simulate a backend. Follow these instructions to install JSON-Server.
Code Editor: Use any code editor. VS Code is recommended with the Live Server extension for ease of use.
Running the Project
Clone the Repository:
Fork and clone this repository to your local machine.

bash
Copy code
git clone <repository-url>
Navigate to the Project Folder:
Open the project folder in VS Code.

bash
Copy code
cd <project-folder>
Start JSON-Server:
Make sure the flights.json file is in your project directory. Run JSON-Server to serve the file.

bash
Copy code
json-server --watch flights.json
Start the Live Server:
Click on "Go Live" at the bottom right of the VS Code window to open the index.html in your default browser.

View the Application:
The application should display flight search options and results. If you encounter "Waiting for the server...", ensure JSON-Server is running and the file path is correct.

Navigating Through the Project
Search Flights: Enter departure and arrival stations, dates, and passenger counts, then click "Search Flights."
View Results: Browse through flight results and select flights.
Confirm Booking: Enter passenger and payment details, then click "Confirm Booking."
Booking Status: View confirmation or cancellation messages.
Criteria Met
Single HTML File: The project contains a single HTML file (index.html).
Event Listeners: Implements at least three distinct event listeners:
DOMContentLoaded for initial script loading.
Click for buttons (search, confirm booking).
Change for input fields (flight search, date selection).
Data Handling: Uses array iteration methods (.filter(), .map()) to process flight data.
DRY Principle: Code is abstracted into reusable functions to avoid repetition.
User Interface: Includes a well-designed landing page with search functionality and booking features.
API
The project uses a flights.json file served by JSON-Server to provide flight data. This file includes a collection of flight objects with attributes such as flight number, departure and arrival stations, times, prices, and available seats.

Thought Process and Execution
Flight Search: Users can search flights based on criteria such as departure and arrival stations and dates.
Displaying Results: Flight results are filtered and displayed dynamically based on search criteria.
Booking Interaction: Users can select flights and enter booking details, which are processed asynchronously.
Confirmation: Displays a confirmation message upon successful booking.
Challenges Faced
API Integration: Ensuring smooth integration with the JSON-Server for flight data.
Data Handling: Efficiently filtering and displaying flight data while maintaining performance.
User Experience: Creating an intuitive and seamless user interface within a single page.
Acknowledgments
Moringa School: For providing a solid curriculum and resources for building the project.
Technical Mentor: For guidance and support throughout the project development.
Appendix


Future Enhancements
In the future, I plan to integrate with an online API that includes authentication and authorization. With guidance from my Technical Mentor: Kelvin Muirithi, I will repeat this project using a live API to enhance its functionality and security.