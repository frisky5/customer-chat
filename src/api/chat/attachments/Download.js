import { isUatAppend } from "../../constants";
import { getCookie } from "../../tokenValidation/ValidateSessionToken";

export default function Download(attachment) {
  const ObSSOCookie = getCookie("ObSSOCookie");
  const PFPTKVal = getCookie("PFPTKVal");

  fetch(
    isUatAppend +
      `/api/v1/pub/chat/attachments/download/${attachment.fileId}?` +
      new URLSearchParams({ ObSSOCookie: ObSSOCookie, PFPTKVal: PFPTKVal }),
    {
      method: "GET",
    }
  )
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blak";
      link.rel = "noreferrer";
      link.setAttribute("download", attachment.fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
}
