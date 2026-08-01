import { describe, it, expect } from "vitest";
import { auditLinkDestination } from "../../scripts/find-dead-links";

describe("auditLinkDestination", () => {
  it("flags empty, hash, and javascript:void(0) hrefs", () => {
    expect(auditLinkDestination("").isValid).toBe(false);
    expect(auditLinkDestination("#").isValid).toBe(false);
    expect(auditLinkDestination("javascript:void(0)").isValid).toBe(false);
  });

  it("validates registered app routes", () => {
    expect(auditLinkDestination("/courses/react").isValid).toBe(true);
    expect(auditLinkDestination("/dashboard").isValid).toBe(true);
  });
});
