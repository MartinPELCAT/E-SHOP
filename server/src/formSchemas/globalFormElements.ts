import { string } from "@hapi/joi";

export const emailType = string().email().required();

export const passwordType = string()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required();
