export interface AuditEvent {
  timestamp: string;
  requestId: string;
  actor: string;
  action: string;
  target?: string;
  decision: "ALLOW" | "DENY";
  reason: string;
}

export function makeAuditEvent(input: Omit<AuditEvent, "timestamp">): AuditEvent {
  return { timestamp: new Date().toISOString(), ...input };
}

export async function writeAuditEvent(env: { VCC_AUDIT?: KVNamespace }, event: AuditEvent) {
  if (!env.VCC_AUDIT) return;
  const key = `${event.timestamp}:${event.requestId}`;
  await env.VCC_AUDIT.put(key, JSON.stringify(event));
}
