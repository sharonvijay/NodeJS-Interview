import https from "https";

// Example 1. Asychronous Callback
const asychOperation = (callback) => {
	setTimeout(() => {
		console.log("Asychronous Operation completed");
		callback();
	}, 1000);
};

function callbackFunction() {
	console.log("Callback function executed");
}

console.log("Start");
asychOperation(callbackFunction);
console.log("End");

// Example 2

const fetchDataFromAPI = (url, callback) => {
	https
		.get(url, (response) => {
			let data = "";

			// A chunk of data has been received.
			response.on("data", (chunk) => {
				data += chunk;
			});

			// The whole response has been received.
			response.on("end", () => {
				callback(null, JSON.parse(data)); // Call the callback with parsed JSON data
			});
		})
		.on("error", (error) => {
			callback(error); // Call the callback with an error if the request encounters an error
		});
};

// Callback function to handle the API response
function handleAPIResponse(error, responseData) {
	if (error) {
		console.error("Error fetching data:", error);
	} else {
		console.log("Data from API:", responseData);
	}
}

// URL of the API endpoint
const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";

// Making an HTTP request to the API
console.log("Fetching data from API...");
fetchDataFromAPI(apiUrl, handleAPIResponse);
console.log("End of script");

//Example 3  Promise Example

const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		const success = true; // Simulated success/failure
		if (success) {
			resolve("Data fetched successfully"); // Task is fulfilled
		} else {
			reject("Error fetching data"); // Task is rejected
		}
	}, 2000);
});

// Handling promise states
promise.then(
	(data) => {
		console.log("Promise fulfilled:", data); // Fulfilled state
	},
	(error) => {
		console.error("Promise rejected:", error); // Rejected state
	}
);

console.log("Promise pending"); // Pending state

//Example 4 Callback Example

// Simulating an asynchronous task with a callback
function fetchData(callback) {
	setTimeout(() => {
		const success = true; // Simulated success/failure
		if (success) {
			callback(null, "Data fetched successfully"); // Task is fulfilled
		} else {
			callback("Error fetching data", null); // Task is rejected
		}
	}, 2000); // Simulate delay of 2 seconds
}

// Usage of the callback
console.log("Callback pending"); // Pending state
fetchData((error, data) => {
	if (error) {
		console.error("Callback rejected:", error); // Rejected state
	} else {
		console.log("Callback fulfilled:", data); // Fulfilled state
	}
});
