import { BigNumber } from "@ethersproject/bignumber";
import generate from "../src/generate"; // Adjust the path based on your setup
import { HealthRecordProof } from "../src/types";
// import verify from "../src/verify";

// Example test data
const recordHash = BigNumber.from("123456789").toString(); // Replace with actual input for health record
const criteriaHash = BigNumber.from("987654321").toString(); // Replace with actual input for criteria


describe("HealthRecordProof generation", () => {
    it("should generate a valid zero-knowledge proof for health record", async () => {
        const proof: HealthRecordProof = await generate(recordHash, criteriaHash);

        // Assertions to check if the proof is correctly generated
        expect(proof).toHaveProperty("recordHash", recordHash);
        expect(proof).toHaveProperty("criteriaHash", criteriaHash);
        expect(proof).toHaveProperty("proof");

        // Additional checks can be added depending on how the proof is structured
        // For example, you can check if the proof has valid structure:
        expect(proof.proof).toBeInstanceOf(Array); // Depending on your proof structure

        // You can also log the proof to inspect it if necessary
        
    });

    it("should throw an error with invalid input", async () => {
        const invalidRecordHash = "invalidHash"; // Invalid test data

        await expect(generate(invalidRecordHash, criteriaHash)).rejects.toThrow();
    });
    
});
