// Generates a big random number as a string
export function generateBigRandomNumber(): string {
    const randomNumber = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)) * BigInt(Date.now());
    return randomNumber.toString();
}