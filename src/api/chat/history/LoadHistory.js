import axios from "axios";
import { getCookie } from "../../tokenValidation/ValidateSessionToken";
import { isUatAppend } from "../../constants";

export default function LoadHistory() {
  const ObSSOCookie = getCookie("ObSSOCookie");
  const PFPTKVal = getCookie("PFPTKVal");
  return axios.get(isUatAppend + "/api/v1/pub/chat/history", {
    params: { ObSSOCookie: ObSSOCookie, PFPTKVal: PFPTKVal },
  });
}

export function LoadChatScript(contactId) {
  const ObSSOCookie = getCookie("ObSSOCookie");
  const PFPTKVal = getCookie("PFPTKVal");
  return axios.get(isUatAppend + `/api/v1/pub/chat/script/${contactId}`, {
    params: { ObSSOCookie: ObSSOCookie, PFPTKVal: PFPTKVal },
  });
}
