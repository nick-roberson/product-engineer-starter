import { Configuration, DefaultApi } from "@/api";

// Base Path of the API
const basePath = "http://127.0.0.1:8000";

// Function to get the API client
const getAPIClient = () => {
    const configuration = new Configuration({
        basePath: basePath
    });
    const api = new DefaultApi(configuration);
    return api;
};

export default getAPIClient;
