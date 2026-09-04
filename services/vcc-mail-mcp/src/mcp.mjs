import { listRecent } from './server.mjs';

/**
 * Read-only VCC mail tool surface.
 * Outbound mail is intentionally NOT exposed here while CEO HOLD remains active.
 */
export const tools = [
  {
    name: 'vcc_mail_list_recent',
    description: 'List recent VCC INBOX message metadata without modifying Roundcube or sending mail.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
      },
      additionalProperties: false
    }
  }
];

export async function callTool(name, args = {}) {
  if (name !== 'vcc_mail_list_recent') throw new Error(`Unknown or unauthorized mail tool: ${name}`);
  const limit = Math.min(100, Math.max(1, Number(args.limit ?? 20)));
  const messages = await listRecent(limit);
  return {
    content: [{ type: 'text', text: JSON.stringify({ mailbox: 'INBOX', count: messages.length, messages }) }]
  };
}
