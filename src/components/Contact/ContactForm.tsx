"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { submitContact, type ContactPayload } from "@/lib/submitContact";
import styles from "./Contact.module.scss";

type Field = keyof ContactPayload;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMPTY: ContactPayload = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: ContactPayload): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

export default function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field;
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const handleBlur = (field: Field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
      window.setTimeout(() => successRef.current?.focus(), 50);
    } catch {
      setStatus("error");
    }
  };

  const fieldError = (field: Field) => (touched[field] ? errors[field] : undefined);

  const renderError = (field: Field) => {
    const message = fieldError(field);
    return message ? (
      <p id={`${field}-error`} className={styles.error}>
        {message}
      </p>
    ) : null;
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          ref={successRef}
          className={styles.success}
          tabIndex={-1}
          role="status"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.check} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className={styles.successTitle}>Thank you. Your message is on its way.</h3>
          <p className={styles.successText}>I&apos;ll get back to you as soon as I can.</p>
          <button type="button" className="button button-secondary" onClick={() => setStatus("idle")}>
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
        >
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className={styles.input}
                value={values.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                aria-invalid={Boolean(fieldError("name"))}
                aria-describedby={fieldError("name") ? "name-error" : undefined}
                required
              />
              {renderError("name")}
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={styles.input}
                value={values.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                aria-invalid={Boolean(fieldError("email"))}
                aria-describedby={fieldError("email") ? "email-error" : undefined}
                required
              />
              {renderError("email")}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={styles.input}
              value={values.message}
              onChange={handleChange}
              onBlur={() => handleBlur("message")}
              aria-invalid={Boolean(fieldError("message"))}
              aria-describedby={fieldError("message") ? "message-error" : undefined}
              required
            />
            {renderError("message")}
          </div>

          {status === "error" && (
            <p className={styles.error} role="alert">
              Something went wrong. Please try again.
            </p>
          )}

          <button type="submit" className={`button button-primary ${styles.submit}`} disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
