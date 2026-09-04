import assert from 'node:assert/strict';
import { tools, callTool } from './mcp.mjs';

assert.equal(tools.length, 1);
assert.equal(tools[0].name, 'vcc_mail_list_recent');
assert.ok(!tools.some(t => /send|reply|forward/i.test(t.name)), 'Outbound mail tool exposed while HOLD active');

await assert.rejects(() => callTool('vcc_mail_send', {}), /Unknown or unauthorized/);

console.log(JSON.stringify({
  service: 'vcc-mail-mcp',
  controlTest: 'PASS',
  outboundExposed: false,
  note: 'Live IMAP test requires VCC_MAIL_PASSWORD in runtime secret environment.'
}));
