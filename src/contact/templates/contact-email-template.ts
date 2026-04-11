export function buildContactEmailHtml(
  name: string,
  email: string,
  message: string,
): string {
  const now = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#a0aec0;">You have a new message</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;">Contact Form Submission</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Sender info row -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <!-- Avatar -->
                  <td width="56" valign="top">
                    <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;text-align:center;line-height:48px;font-size:20px;font-weight:700;color:#fff;">
                      ${name.charAt(0).toUpperCase()}
                    </div>
                  </td>
                  <!-- Name & email -->
                  <td valign="top" style="padding-left:12px;">
                    <p style="margin:0 0 2px 0;font-size:17px;font-weight:600;color:#1a202c;">${name}</p>
                    <a href="mailto:${email}" style="font-size:14px;color:#667eea;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 28px 0;" />

              <!-- Message -->
              <p style="margin:0 0 10px 0;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#a0aec0;">Message</p>
              <div style="background-color:#f7f8fa;border-left:4px solid #667eea;border-radius:6px;padding:20px 24px;">
                <p style="margin:0;font-size:15px;line-height:1.75;color:#2d3748;white-space:pre-wrap;">${message}</p>
              </div>

            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 40px 36px 40px;text-align:center;">
              <a href="mailto:${email}?subject=Re: Your message"
                style="display:inline-block;background:linear-gradient(135deg,#667eea,#764ba2);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:8px;letter-spacing:0.3px;">
                ✉ Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7f8fa;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#a0aec0;">Received on ${now} · Sent via your contact form</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
