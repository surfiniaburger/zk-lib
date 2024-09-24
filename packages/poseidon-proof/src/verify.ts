import { groth16 } from "snarkjs";
import { unpackGroth16Proof } from "@zk-kit/utils/proof-packing";
import verificationKeys from "./verification-keys.json";

/**
 * Verifies that a HealthRecordVerification proof is valid.
 * @param proof Proof object generated by generateProof
 * @param recordHash The hash of the health record
 * @param criteriaHash The hash of the criteria
 * @returns True if the proof is valid, false otherwise.
 */
export default function verify(recordHash: string, criteriaHash: string, proof: any): Promise<boolean> {
    // Get the verification key from the JSON file
    const verificationKey = verificationKeys;

    // Public signals in your circuit are [recordHash, criteriaHash]
    const publicSignals = [recordHash, criteriaHash];

    // Unpack the proof and pass it to groth16.verify
    return groth16.verify(verificationKey, publicSignals, unpackGroth16Proof(proof));
}
