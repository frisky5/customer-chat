import axios from "axios";
import { isUatAppend } from "../../constants";

export function getServiceDisplayMessage(data) {
  return axios.get(isUatAppend + "/api/v1/pub/chat/service/display-message", {
    params: { serviceId: data.serviceId, languageId: data.languageId },
  });
}
