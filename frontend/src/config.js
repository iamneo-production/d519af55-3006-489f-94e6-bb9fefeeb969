import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:  "https://8080-dbabbcdacecabafacbddedbeebddecafda.examlyiopb.examly.io/api/"
})