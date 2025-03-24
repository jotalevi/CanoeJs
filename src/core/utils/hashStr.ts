import SHA256 from "crypto-js/sha256";

export default function hashString(input: string): string {
    return SHA256(input).toString();
}
