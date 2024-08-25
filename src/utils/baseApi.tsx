import axios from "axios";

// Create an instance of Axios with default configuration
const baseApi = axios.create({
  // Set default headers for the instance
  headers: {
    "Content-Type": "application/json", // Specify the content type as JSON
  },
});

export default baseApi;
