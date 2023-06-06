import PasswordValidator from "password-validator";
// Create a schema
const passwordSchema = new PasswordValidator();

// Add properties to it
passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(128) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digit
    .has()
    .not()
    .spaces(); // Should not have spaces

export default passwordSchema;
