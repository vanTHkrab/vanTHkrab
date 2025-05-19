import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password to hash
 * @returns Hashed password
 */
export async function saltAndHashPassword(password: string): Promise<string> {
    try {

        console.log("📌 Password received:", password); // Debugging
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // ✅ Correct order
        console.log("✅ Hashed password:", hashedPassword); // Debugging
        return hashedPassword;
    } catch (error) {
        console.error("❌ Error in hashPassword:", error); // Debugging
        throw new Error("Password hashing failed");
    }
}

/**
 * Verifies a password against a hashed password
 * @param password - Plain text password
 * @param hashedPassword - Hashed password from database
 * @returns Boolean indicating whether the password matches
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}