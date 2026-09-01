import { describe, expect, it } from "vitest";
import { authorize } from "../src/authorization";

const auth = { sealVerified: true, exactAction: "Send approved planning inquiry", scope: "named recipient only", directive: "PROCEED" as const };

describe("VCC authorization gate", () => {
  it("rejects unauthenticated access", () => {
    expect(authorize({ action: "READ", authenticated: false }).allowed).toBe(false);
  });

  it("allows authenticated internal reads", () => {
    expect(authorize({ action: "READ", authenticated: true }).allowed).toBe(true);
  });

  it("requires CEO authorization for nonbinding external communication", () => {
    expect(authorize({ action: "EXTERNAL_NONBINDING", authenticated: true }).allowed).toBe(false);
    expect(authorize({ action: "EXTERNAL_NONBINDING", authenticated: true, approval: auth }).allowed).toBe(true);
  });

  for (const action of ["FINANCIAL_COMMITMENT", "CONTRACT", "PASSENGER_OPERATION", "PUBLIC_OPERATIONAL_CLAIM"] as const) {
    it(`keeps ${action} on HOLD even with authentication and approval`, () => {
      expect(authorize({ action, authenticated: true, approval: auth }).allowed).toBe(false);
    });
  }
});
