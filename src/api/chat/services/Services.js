import axios from "axios";
import { isUatAppend } from "../../constants";

export function getServices(languageId) {
  return axios.get(isUatAppend + "/api/v1/pub/chat/services", {
    params: { languageId: languageId.toString() },
  });
}
