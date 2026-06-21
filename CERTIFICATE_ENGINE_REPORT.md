# CERTIFICATE_ENGINE_REPORT.md

## Certificate Generation Engine Implementation

The certificate engine handles the creation, issuance, and verification of professional certifications upon roadmap completion.

### 1. Generation Workflow
Certificates are generated automatically via the `certificateService.ts` when a roadmap's completion percentage hits $100\%$.

- **Eligibility Check**: Verifies that the user has actually completed all topics in the roadmap.
- **Idempotency**: Checks for an existing certificate for the same user and roadmap to prevent duplicate issuance.
- **Unique Identifier**: Generates a 12-character unique `verificationCode` using `nanoid`.

### 2. Data Schema
The `Certification` model stores:
- `userId`: The earner of the certificate.
- `roadmapId`: The course completed.
- `issuedAt`: Timestamp of issuance.
- `score`: The final completion percentage.
- `verificationCode`: The unique public key for validation.

### 3. Verification Mechanism
A public verification function `verifyCertificate(code)` allows anyone with the code to validate the certificate's authenticity by querying the database and returning the earner's name and the roadmap title.

### 4. Integration
- **Trigger**: Integrated into the `topic/complete` API route.
- **Display**: The Dashboard now dynamically lists earned certificates with links to their verification page.

## Conclusion
The certificate engine provides a trustworthy way to validate learning achievements, linking database records to unique, verifiable identifiers.
