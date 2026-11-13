"use client";

import { useRef, useState } from "react";
import { isPlaceholderText, profile } from "@/data/profile";
import { mailtoHref } from "@/lib/contact";
import Placeholder from "@/components/Placeholder";
import SectionHeading from "@/components/SectionHeading";
import { CheckMark } from "@/components/svg/Marks";
import Icon from "@/components/svg/Icon";

type FormValues = { name: string; email: string; message: string };

const EMPTY: FormValues = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState("idle");
  const formRef = useRef<any>(null);

  const fieldError = (field: keyof FormValues) => (touched[field] ? errors[field] : undefined);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    window.location.href = mailtoHref({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
    setStatus("success");
  };

  return (
    <section id="contact" className="holo scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 lg:flex-row lg:items-start">
        <div className="lg:w-2/5">
          <SectionHeading eyebrow="Contact" title="Have a Shopify project in mind?" id="contact-title">
            Tell me about the store and what you need.
          </SectionHeading>
          <p className="text-sm text-muted">
            {profile.availability} {isPlaceholderText(profile.availability) ? <Placeholder /> : null}
          </p>
          <p className="mt-4 text-lg font-medium text-ink">
            <a className="text-accent" href={`mailto:${profile.email}`}>{profile.email}</a>
            {profile.emailPlaceholder ? (
              <>
                {" "}
                <Placeholder />
              </>
            ) : null}
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-sm">
            {profile.socials.map((social) => (
              <li key={social.label}>
                {social.placeholder ? (
                  <span className="text-muted">
                    {social.label} · {social.href.replace("https://", "")} <Placeholder />
                  </span>
                ) : (
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-accent no-underline">
                    <Icon name="github" className="h-4 w-4" />
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="spotlight rounded-lg border border-line bg-surface p-5 sm:p-6 lg:w-3/5">
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4" role="status" tabIndex={-1}>
              <CheckMark />
              <h3 className="text-2xl font-semibold text-ink">Message ready in your email app.</h3>
              <p className="text-muted">If it did not open, write to {profile.email}.</p>
              <button type="button" className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm font-semibold" onClick={() => setStatus("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form ref={formRef} className="flex flex-col gap-5" noValidate onSubmit={onSubmit}>
              <div className="flex flex-col gap-5 sm:flex-row">
                <Field
                  id="name"
                  label="Name"
                  value={values.name}
                  error={fieldError("name")}
                  autoComplete="name"
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, name: true }));
                    setErrors(validate(values));
                  }}
                  onChange={(value) => {
                    const next = { ...values, name: value };
                    setValues(next);
                    if (touched.name) setErrors(validate(next));
                  }}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  error={fieldError("email")}
                  autoComplete="email"
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, email: true }));
                    setErrors(validate(values));
                  }}
                  onChange={(value) => {
                    const next = { ...values, email: value };
                    setValues(next);
                    if (touched.email) setErrors(validate(next));
                  }}
                />
              </div>
              <Field
                id="message"
                label="Project details"
                value={values.message}
                error={fieldError("message")}
                multiline
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, message: true }));
                  setErrors(validate(values));
                }}
                onChange={(value) => {
                  const next = { ...values, message: value };
                  setValues(next);
                  if (touched.message) setErrors(validate(next));
                }}
              />
              <button type="submit" className="btn-primary group inline-flex h-11 items-center gap-2 self-start rounded-md px-4 text-sm font-semibold">
                Send message
                <Icon name="send" className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const shared = {
    id,
    name: id,
    value,
    onBlur,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    className: "field-input",
    required: true,
  };
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {multiline ? <textarea {...shared} rows={5} /> : <input {...shared} type={type} autoComplete={autoComplete} />}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
