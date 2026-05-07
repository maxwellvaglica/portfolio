"use client";

import { useMemo, useState } from "react";

// Small (textbook) RSA primes for an interactive demo. Real RSA uses 2048+ bit
// primes; these are sized so individual ASCII bytes fit cleanly and the math
// stays readable in the UI.
const P = 1019n;
const Q = 1031n;
const N = P * Q; // 1_050_589
const PHI = (P - 1n) * (Q - 1n); // 1_048_540
const E = 65537n;

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  let b = base % mod;
  let e = exp;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % mod;
    e >>= 1n;
    b = (b * b) % mod;
  }
  return result;
}

function modInverse(a: bigint, m: bigint): bigint {
  let [oldR, r] = [a, m];
  let [oldS, s] = [1n, 0n];
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  return ((oldS % m) + m) % m;
}

const D = modInverse(E, PHI);

export function RsaDemo() {
  const [message, setMessage] = useState("Hello World!");

  const result = useMemo(() => {
    const bytes = Array.from(new TextEncoder().encode(message));
    const ciphertext = bytes.map((b) => modPow(BigInt(b), E, N));
    const decryptedBytes = ciphertext.map((c) => Number(modPow(c, D, N)));
    const decoded = new TextDecoder().decode(new Uint8Array(decryptedBytes));
    return { bytes, ciphertext, decryptedBytes, decoded };
  }, [message]);

  const matches = result.decoded === message;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs sm:grid-cols-3">
        <div>
          <div className="text-[10px] tracking-wide text-zinc-500 uppercase">
            Public key (anyone can encrypt)
          </div>
          <div className="mt-1 font-mono text-zinc-200">n = {N.toString()}</div>
          <div className="font-mono text-zinc-200">e = {E.toString()}</div>
        </div>
        <div>
          <div className="text-[10px] tracking-wide text-zinc-500 uppercase">
            Private key (only Max knows)
          </div>
          <div className="mt-1 font-mono text-zinc-200">d = {D.toString()}</div>
          <div className="font-mono text-zinc-500">p = {P.toString()}</div>
          <div className="font-mono text-zinc-500">q = {Q.toString()}</div>
        </div>
        <div>
          <div className="text-[10px] tracking-wide text-zinc-500 uppercase">
            Math
          </div>
          <div className="mt-1 font-mono text-[11px] text-zinc-400">
            c = m<sup>e</sup> mod n
          </div>
          <div className="font-mono text-[11px] text-zinc-400">
            m = c<sup>d</sup> mod n
          </div>
          <div className="mt-1 text-[10px] text-zinc-500">
            Demo-sized primes — real RSA uses 2048+ bits.
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs text-zinc-400">
          Message to encrypt (max 128 bytes)
          <input
            value={message}
            maxLength={128}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-700 focus:outline-none"
            placeholder="Type any message…"
          />
        </label>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
          <div className="text-[10px] tracking-wide text-zinc-500 uppercase">
            1. Plaintext bytes
          </div>
          <div className="mt-1 font-mono text-xs break-all text-zinc-200">
            {result.bytes.length === 0 ? (
              <span className="text-zinc-500">(empty)</span>
            ) : (
              result.bytes.join(" ")
            )}
          </div>
        </div>
        <div className="rounded-lg border border-emerald-900/40 bg-emerald-950/10 p-3">
          <div className="text-[10px] tracking-wide text-emerald-400 uppercase">
            2. Encrypted ciphertext
          </div>
          <div className="mt-1 font-mono text-xs break-all text-emerald-200">
            {result.ciphertext.length === 0 ? (
              <span className="text-zinc-500">(empty)</span>
            ) : (
              result.ciphertext.map((c) => c.toString()).join(" ")
            )}
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
          <div className="text-[10px] tracking-wide text-zinc-500 uppercase">
            3. Decrypted plaintext
          </div>
          <div className="mt-1 font-mono text-xs break-all text-zinc-200">
            {result.decoded || <span className="text-zinc-500">(empty)</span>}
          </div>
          <div
            className={`mt-2 text-[10px] tracking-wide uppercase ${
              matches ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {matches
              ? "✓ matches the original"
              : "decoding mismatch (try shorter input)"}
          </div>
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        Each byte of your message is treated as an integer{" "}
        <span className="font-mono text-zinc-400">m</span>, encrypted with the
        public key as{" "}
        <span className="font-mono text-zinc-400">c = m^e mod n</span>, then
        decrypted with the private key as{" "}
        <span className="font-mono text-zinc-400">m = c^d mod n</span>. All
        computation runs as JavaScript BigInt math in your browser — no server
        round-trip.
      </p>
    </div>
  );
}
