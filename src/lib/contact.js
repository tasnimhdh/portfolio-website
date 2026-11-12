import { profile } from "@/data/profile";

export function mailtoHref({ name, email, message }) {
  const subject = encodeURIComponent(`Shopify project inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}
