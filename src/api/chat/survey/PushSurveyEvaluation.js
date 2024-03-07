import axios from "axios";
import { getCookie } from "../../tokenValidation/ValidateSessionToken";
import { isUatAppend } from "../../constants";

export default function PushSurveyEvaluation(request) {
  request.ObSSOCookie = getCookie("ObSSOCookie");
  request.PFPTKVal = getCookie("PFPTKVal");
  request.contactId = parseInt(window.localStorage.getItem("chatContactId"));
  return axios.post(isUatAppend + "/api/v1/pub/chat/survey/evaluate", request);
}
