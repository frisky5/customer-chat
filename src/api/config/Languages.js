import axios from "axios";

export function getLanauges() {
  return axios.get("/api/v1/pub/config/languages");
}
