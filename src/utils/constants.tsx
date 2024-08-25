// Define default salts for cryptographic operations.
// These values are used for encryption and should be kept secure.
// They can be overridden by environment variables for added security.

export const PASSWORD_SALT =
  process.env.PASSWORD_SALT ??
  "3UGkcLx7qNSd5KAYFFiQjYwPmvhPgane6UPY3w1fj7dXw9VBh2CQjn1ofW5JsBP1rJ3PjWsaSb1BH8j5Cmgb3sSD";

// Salt for initial vector used in encryption, can be overridden by an environment variable
export const INITIAL_VECTOR_SALT =
  process.env.INITIAL_VECTOR_SALT ??
  "3LoAYHuSd7Gh8d7RTFnhvYtiTiefdZ5ByamU42vkzd76";

// Encryption algorithm used for secure data encryption
export const AES = "aes-256-gcm";

// Array of tips related to password and encryption security
export const tips = [
  { id: 1, text: "Save in a password manager" },
  { id: 2, text: "Store in a safe deposit box" },
  { id: 3, text: "Write down and store in multiple secret places" },
];
