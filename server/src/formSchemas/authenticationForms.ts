import { object, string, boolean } from "@hapi/joi/";
import { emailType, passwordType } from "./globalFormElements";

/**
 * @description fields needed on register form
 * @param email
 * @param password
 * @param lastname
 * @param firstname
 * @param username
 */
export const registerForm = object({
  username: string().alphanum().min(3).max(30).required(),
  lastname: string().alphanum().min(3).max(30).required(),
  firstname: string().alphanum().min(3).max(30).required(),
  password: passwordType,
  email: emailType,
});

export const loginForm = object({
  email: emailType,
  password: passwordType,
  rememberMe: boolean(),
});
