import { hash, compare } from "bcrypt";
import { Promise } from "bluebird";

export const hashPassword = (password: string): Promise<string> => {
  return hash(password, 4);
};

export const comparePassword = (
  plainPassword: string,
  encryptedPassword: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    compare(plainPassword, encryptedPassword)
      .then((valid) => {
        if (valid) {
          resolve();
        } else {
          reject(new Error("Password incorrect"));
        }
      })
      .catch((err) => reject(err));
  });
};
