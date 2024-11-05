import { body, ValidationChain } from "express-validator";

export const userValidationRules: ValidationChain[] = [
  body("firstName")
    .isString()
    .withMessage("First name must be a string.")
    .isLength({ min: 1, max: 50 })
    .withMessage("First name must be between 1 and 50 characters long."),

  body("lastName")
    .isString()
    .withMessage("Last name must be a string.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name must be between 1 and 50 characters long."),

  body("displayName")
    .isString()
    .withMessage("Display name must be a string.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Display name must be between 1 and 50 characters long."),

  body("phoneNumber")
    .isString()
    .withMessage("Phone number must be a string.")
    .isLength({ min: 11, max: 16 })
    .withMessage("Phone number must be between 11 and 16 characters long.")
    .matches(/^\+?\d+$/)
    .withMessage(
      "Phone number must contain only numbers and may start with a '+' sign."
    ),

  body("email").isEmail().withMessage("Must be a valid email address."),

  body("dateOfBirth")
    .isISO8601()
    .withMessage("Date of birth must be in a valid date format (YYYY-MM-DD)."),
];

export const updateUserValidationRules: ValidationChain[] = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string.")
    .isLength({ min: 1, max: 50 })
    .withMessage("First name must be between 1 and 50 characters long."),

  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name must be between 1 and 50 characters long."),

  body("displayName")
    .optional()
    .isString()
    .withMessage("Display name must be a string.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Display name must be between 1 and 50 characters long."),

  body("phoneNumber")
    .optional()
    .isString()
    .withMessage("Phone number must be a string.")
    .isLength({ min: 7, max: 16 })
    .withMessage("Phone number must be between 7 and 16 characters long.")
    .matches(/^\+?\d+$/)
    .withMessage(
      "Phone number must contain only numbers and may start with a '+' sign."
    ),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address."),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be in a valid date format (YYYY-MM-DD)."),
];
