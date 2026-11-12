// Replace the body of this function to send the form somewhere real,
// for example a Next.js route handler, Formspree or Resend.
export type ContactPayload = { name: string; email: string; message: string };

export async function submitContact(payload: ContactPayload): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (process.env.NODE_ENV !== "production") {
    console.info("Contact form submitted (not sent anywhere yet):", payload);
  }
}
