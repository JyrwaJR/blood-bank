import { JWTPayload, SignJWT } from "jose";

export async function generateToken({ claim }: { claim: JWTPayload }) {
  const key = process.env.JWT_SECRET_KEY!;
  const iat = Math.floor(Date.now() / 1000);
  const alg = "HS256" as const;
  const JWTtype = "JWT" as const;
  const exp = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour
  const token = await new SignJWT({
    ...claim,
  })
    .setProtectedHeader({
      alg: alg,
      typ: JWTtype,
    })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setIssuer(process.env.NEXT_PUBLIC_API_BASE_URL!)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(key));
  return token;
}
