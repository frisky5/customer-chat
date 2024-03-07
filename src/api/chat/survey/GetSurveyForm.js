import axios from "axios";
import { isUatAppend } from "../../constants";

export default function GetActiveSurveyForm() {
  return axios.get(isUatAppend + "/api/v1/pub/chat/survey/form");
}
