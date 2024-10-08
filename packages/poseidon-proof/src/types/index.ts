// types/index.ts
import { NumericString } from "snarkjs"
import { PackedGroth16Proof } from "@zk-kit/utils"

export type HealthRecordProof = {
    recordHash: NumericString // Hash of the health record
    criteriaHash: NumericString // Hash of the criteria for verification
    proof: PackedGroth16Proof // Packed proof generated by the circuit
}
