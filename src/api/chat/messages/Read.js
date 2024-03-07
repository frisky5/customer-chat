import axios from "axios";
import { getCookie } from "../../tokenValidation/ValidateSessionToken";
import { isUatAppend } from "../../constants";

export default function Read(textId) {
  const ObSSOCookie = getCookie("ObSSOCookie");
  const PFPTKVal = getCookie("PFPTKVal");
  return axios.get(isUatAppend + "/api/v1/pub/chat/messages/read/" + textId, {
    params: { ObSSOCookie: ObSSOCookie, PFPTKVal: PFPTKVal },
  });
}
