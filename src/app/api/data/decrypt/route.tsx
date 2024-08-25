import decryptData from "@/utils/crypto/decryptData";
import deriveKeyAndIv from "@/utils/crypto/deriveKeyAndIv";
import { NextResponse } from "next/server";

interface Body {
  cipherText: string;
  password: string;
}

/**
 * Handles POST requests to decrypt data using the provided password and encrypted data.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<Response>} - A response object containing the decrypted data or an error message.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    // Parse the incoming JSON request body
    const body: Body = await request.json();
    const { cipherText, password } = body;

    // Validate that the necessary data is provided
    if (!cipherText || !password) {
      throw new Error("Missing data: cipherText and password are required.");
    }

    // Derive the encryption key and initialization vector (IV) from the provided (hashed) password
    const { iv, key } = await deriveKeyAndIv(password);

    // Decrypt the data using the derived key and IV
    const decryptedData = await decryptData(cipherText, iv, key);
    const decryptObject = JSON.parse(decryptedData);

    return NextResponse.json({
      message: "Data Decrypted Successfully",
      data: decryptObject,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "User password is incorrect.",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
}
