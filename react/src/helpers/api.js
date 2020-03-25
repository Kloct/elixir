import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({ ca: fetch('src/server.cert').then(res=>res.text()) });

// the baseURL should to point to localhost in development
// and your domain in production
export default axios.create({
  // baseURL: process.env.NODE_ENV === inDevelopment
  //   ? `http://localhost:5000/api/`
  //   : "http://example.com",
  baseURL: "https://35.231.164.212",
  httpsAgent
});