export type ActionClass =
  | "READ"
  | "DRAFT"
  | "LOW_RISK_INTERNAL"
  | "EXTERNAL_NONBINDING"
  | "FINANCIAL_COMMITMENT"
  | "CONTRACT"
  | "PASSENGER_OPERATION"
  | "PUBLIC_OPERATIONAL_CLAIM";

export interface AuthorizationRequest {
  action: ActionClass;
  authenticated: boolean;
  approval?: {
    sealVerified: boolean;
    exactAction: string;
    scope: string;
    directive: "APPROVED" | "PROCEED";
  };
}

const HOLD_CLASSES = new Set<ActionClass>([
  "FINANCIAL_COMMITMENT",
  "CONTRACT",
  "PASSENGER_OPERATION",
  "PUBLIC_OPERATIONAL_CLAIM",
]);

export function authorize(request: AuthorizationRequest) {
  if (!request.authenticated) {
    return { allowed: false, reason: "AUTHENTICATION_REQUIRED" } as const;
  }

  // Authentication proves identity/access only. It never grants VCC authority.
  if (HOLD_CLASSES.has(request.action)) {
    return { allowed: false, reason: "VCC_HOLD_CLASS" } as const;
  }

  if (request.action === "EXTERNAL_NONBINDING") {
    const a = request.approval;
    if (!a?.sealVerified || !a.exactAction || !a.scope || !a.directive) {
      return { allowed: false, reason: "CEO_AUTHORIZATION_REQUIRED" } as const;
    }
  }

  return { allowed: true, reason: "AUTHORIZED_WITHIN_ENVELOPE" } as const;
}
