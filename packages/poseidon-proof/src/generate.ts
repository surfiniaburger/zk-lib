// generate.ts
import { BigNumber } from "@ethersproject/bignumber"
import { packGroth16Proof } from "@zk-kit/utils/proof-packing"
import { NumericString, groth16 } from "snarkjs"
import path from "path"
import fs from "fs"
import { HealthRecordProof } from "./types"
/**
 * Generates a zero-knowledge proof for the health record verification circuit.
 * @param recordHash The hash of the health record.
 * @param criteriaHash The hash of the criteria that the record must meet.
 * @returns A HealthRecordProof containing the packed proof and relevant public signals.
 */
export default async function generate(recordHash: string, criteriaHash: string): Promise<HealthRecordProof> {
    // Load the local .wasm and .zkey files
    const wasmFilePath = path.resolve("packages/poseidon-proof/src", "HealthRecordVerification.wasm")
    const zkeyFilePath = path.resolve("packages/poseidon-proof/src", "HealthRecordVerification.zkey")

    // Read the files (ensures they're loaded correctly before use)
    const wasm = fs.readFileSync(wasmFilePath)
    const zkey = fs.readFileSync(zkeyFilePath)

    // Generate the proof using groth16.fullProve
    const { proof } = await groth16.fullProve(
        {
            recordHash, // input the health record hash
            criteriaHash // input the criteria hash
        },
        wasm,
        zkey
    )

    // Return the proof, including the public signals and packed proof
    return {
        recordHash: BigNumber.from(recordHash).toString() as NumericString,
        criteriaHash: BigNumber.from(criteriaHash).toString() as NumericString,
        proof: packGroth16Proof(proof)
    }
}
