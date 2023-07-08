import { notifyError } from "./notification.helper.";

const firstName = (str) => {
  const isValid = /^[a-zA-Z](\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*$/.test(
    str
  );
  if (!isValid) notifyError("First name contains invalid characters.");
  return isValid;
};

const lastName = (str) => {
  const isValid = /^[a-zA-Z](\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*$/.test(
    str
  );
  if (!isValid) notifyError("Last name contains invalid characters.");
  return isValid;
};

const email = (str) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  if (!isValid) notifyError("Invalid email address format.");
  return isValid;
};

const phone = (str) => {
  const isValid =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      str
    );
  if (!isValid) notifyError("Invalid phone number format.");
  return isValid;
};

const password = (str) => {
  const isValid = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(
    str
  );
  if (!isValid)
    notifyError(
      "Password must at least contain one uppercase letter, one lowercase letter, a digit, and a special character (!@#$&*)."
    );

  return isValid;
};

const exports = {
  firstName,
  lastName,
  email,
  phone,
  password,
};
export default exports;
