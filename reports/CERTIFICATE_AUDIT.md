# Certificate Audit

**Page**: `src/app/certificate/[id]/page.tsx`

## Verification Checklist

| Check | Result | Notes |
| :--- | :---: | :--- |
| Public route works | ✅ | Accessible via `/certificate/[id]`. |
| Real certificate lookup | ✅ | Queries `Certification` table in Prisma. |
| Ownership validation | ❌ | Only checks if certificate exists, not who owns it (it's public). |
| Verification status | ✅ | Displays the certificate ID as verification. |
| QR support | ❌ | Not implemented. |
| Certificate generation | ❌ | **CRITICAL**: There is no logic to *create* certificates when a roadmap is completed. |

## Conclusion
The verification page exists, but the **generation system is missing**. Certificates can be viewed if they exist in the DB, but they are never created.
