import { ImapFlow } from 'imapflow';
import nodemailer from 'nodemailer';

const cfg = {
  imapHost: process.env.VCC_IMAP_HOST || 'mailserver.businessidentity.llc',
  imapPort: Number(process.env.VCC_IMAP_PORT || 993),
  smtpHost: process.env.VCC_SMTP_HOST || 'mailserver.businessidentity.llc',
  smtpPort: Number(process.env.VCC_SMTP_PORT || 465),
  user: process.env.VCC_MAIL_USER,
  pass: process.env.VCC_MAIL_PASSWORD,
  sendEnabled: process.env.VCC_MAIL_SEND_ENABLED === 'true',
};

function requireCredentials() {
  if (!cfg.user || !cfg.pass) throw new Error('VCC mail credentials are not configured');
}

export async function listRecent(limit = 20) {
  requireCredentials();
  const client = new ImapFlow({ host: cfg.imapHost, port: cfg.imapPort, secure: true, auth: { user: cfg.user, pass: cfg.pass } });
  await client.connect();
  try {
    const lock = await client.getMailboxLock('INBOX');
    try {
      const messages = [];
      const start = Math.max(1, client.mailbox.exists - limit + 1);
      for await (const msg of client.fetch(`${start}:*`, { envelope: true, flags: true, uid: true })) {
        messages.push({ uid: msg.uid, subject: msg.envelope?.subject, from: msg.envelope?.from, date: msg.envelope?.date, flags: [...msg.flags] });
      }
      return messages;
    } finally { lock.release(); }
  } finally { await client.logout(); }
}

export async function sendMail({ to, subject, text, authorization }) {
  requireCredentials();
  if (!cfg.sendEnabled) throw new Error('SEND_HOLD: VCC_MAIL_SEND_ENABLED is false');
  if (authorization !== 'APPROVED') throw new Error('SEND_HOLD: explicit APPROVED authorization required');
  const transport = nodemailer.createTransport({ host: cfg.smtpHost, port: cfg.smtpPort, secure: true, auth: { user: cfg.user, pass: cfg.pass } });
  const result = await transport.sendMail({ from: cfg.user, to, subject, text });
  console.log(JSON.stringify({ event: 'mail.sent', at: new Date().toISOString(), from: cfg.user, to, subject, messageId: result.messageId }));
  return { messageId: result.messageId };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify({ service: 'vcc-mail-mcp', status: 'ready', imap: `${cfg.imapHost}:${cfg.imapPort}`, smtp: `${cfg.smtpHost}:${cfg.smtpPort}`, sendEnabled: cfg.sendEnabled }));
}
