const prod = {
  data: {
    BASE_PATH: "https://localhost:8080",
    ROUTER_BASE_PATH: "/aacc",
    SKILLSET: "WC_Default_Skillset",
  },
};
const dev = {
  data: {
    BASE_PATH: "https://localhost:8080/uat",
    ROUTER_BASE_PATH: "/uat/aacc",
    SKILLSET: "WC_Default_Skillset",
  },
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
export const isUatAppend = process.env.NODE_ENV === "development" ? "/uat" : "";
