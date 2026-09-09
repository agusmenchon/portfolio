import nodemailer from "nodemailer";

function tagRecipient(email: string) {
  const [local, domain] = email.split("@");
  return `${local}+portfolio@${domain}`;
}

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return Response.json({ error: "Faltan campos requeridos." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    return Response.json({ error: "El servidor no tiene configurado el envío de correo." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: `Portfolio <${gmailUser}>`,
      to: tagRecipient(gmailUser),
      replyTo: email,
      subject: `[Portfolio] Nuevo mensaje de ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    });
  } catch {
    return Response.json({ error: "No se pudo enviar el mensaje." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
