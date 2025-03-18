import SHA256 from "crypto-js/sha256";

function hashString(input: string): string {
    return SHA256(input).toString();
}

export { hashString };
