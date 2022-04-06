import axios from "axios";

const httpRequest = axios.create();

httpRequest.interceptors.response.use(
  (response) => response,
  (error) => error.response
);

export default httpRequest;
