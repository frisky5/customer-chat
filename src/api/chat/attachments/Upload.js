import axios from "axios";
import { getCookie } from "../../tokenValidation/ValidateSessionToken";
import { isUatAppend } from "../../constants";

const HEADERS = { "Content-Type": "multipart/form-data" };

export default function Upload(files) {
  const ObSSOCookie = getCookie("ObSSOCookie");
  const PFPTKVal = getCookie("PFPTKVal");

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) formData.append(`files`, files[i]);

  return axios.post(
    isUatAppend + "/api/v1/pub/chat/attachments/upload",
    formData,
    {
      headers: HEADERS,
      timeout: 10000,
      params: { ObSSOCookie: ObSSOCookie, PFPTKVal: PFPTKVal },
    }
  );
}
