export const regexpValidation =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const emailRules = {
  required: "Email is required",
  pattern: {
    value: /^\S+@\S+$/i,
    message: "Invalid email address",
  },
};

export const passwordRules = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
  pattern: {
    value: regexpValidation,
    message: "Password must include at least one number and one special character",
  },
};