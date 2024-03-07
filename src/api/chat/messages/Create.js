import axios from "axios";
import { getCookie } from "../../tokenValidation/ValidateSessionToken";
import { isUatAppend } from "../../constants";

export default function Create(message) {
  const ObSSOCookie = getCookie("ObSSOCookie");
  const PFPTKVal = getCookie("PFPTKVal");
  const request = { text: message };
  return axios.post(isUatAppend + "/api/v1/pub/chat/messages/create", request, {
    params: { ObSSOCookie: ObSSOCookie, PFPTKVal: PFPTKVal },
  });
}
