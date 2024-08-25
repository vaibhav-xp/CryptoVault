import deriveKeyAndIv from "@/utils/crypto/deriveKeyAndIv";
import encryptData from "@/utils/crypto/encryptData";
import { NextResponse } from "next/server";

interface Body {
  password: string;
  seed: string;
  accounts: string[];
}

/**
 * Handles POST requests to encrypt data using a provided password, seed, and list of accounts.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {NextResponse} - A response object containing the result of the encryption or an error message.
 */
export async function POST(request: Request) {
  try {
    // Parse the incoming JSON request body
    const body: Body = await request.json();
    const { password, seed, accounts } = body;

    // Validate that the password, seed, and accounts are provided
    if (!password || !seed || !accounts) {
      throw new Error("Password, Seed, and Accounts are required");
    }

    // Convert the data object (with hashed password, seed, and accounts) to a JSON string format for encryption
    const dataString = JSON.stringify({ seed, accounts });

    // Derive the encryption key and initialization vector (IV) from the provided (hashed) password
    const { iv, key } = await deriveKeyAndIv(password);

    // Encrypt the JSON string using the derived key and IV
    const cipherText = encryptData(dataString, key, iv);

    return NextResponse.json({
      message: "Encrypted Successfully",
      data: {
        encryptedData: cipherText,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 400 }
    );
  }
}
