const windowApiDomain = window?.["env"]?.["API_DOMAIN"];
const apiDomain = windowApiDomain ? windowApiDomain : "api.maawf.tech";

export const environment = {
  production: true,
  title: "Maawf",
  apiURL: `https://${apiDomain}`,
  wsUrl: `wss://${apiDomain}`,
};
