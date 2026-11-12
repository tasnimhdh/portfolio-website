"use client";

import { useEffect, useId, useRef, useState } from "react";
import { snippets } from "@/data/snippets";
import { caretPosition, tokenize } from "@/lib/highlight";
import Icon from "@/components/svg/Icon";

export default function CodeEditor({ label = "Theme files" }) {
  const baseId = useId();
  const [fileIndex, setFileIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
  const pausedRef = useRef(false);
  const manualRef = useRef(false);
  const visibleRef = useRef(true);
  const rootRef = useRef(null);
  const tabRefs = useRef([]);
  const file = snippets[fileIndex];
  const typed = file.code.slice(0, cursor);
  const tokens = tokenize(typed, file.token);
  const caret = caretPosition(typed);
  const lineCount = Math.max(1, typed.split("\n").length);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.15 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const code = snippets[fileIndex].code;
    if (reduce || manualRef.current) {
      setCursor(code.length);
      return undefined;
    }

    let position = 0;
    let timer = 0;
    setCursor(0);

    const tick = () => {
      if (manualRef.current) return;
      if (pausedRef.current || !visibleRef.current) {
        timer = window.setTimeout(tick, 160);
        return;
      }
      if (position >= code.length) {
        timer = window.setTimeout(() => {
          if (pausedRef.current || manualRef.current) {
            tick();
            return;
          }
          setFileIndex((index) => (index + 1) % snippets.length);
        }, 1100);
        return;
      }
      position += 1;
      setCursor(position);
      const character = code[position - 1];
      const pause = /[\n;{}]/.test(character) ? 80 : 0;
      timer = window.setTimeout(tick, 12 + Math.random() * 28 + pause);
    };

    timer = window.setTimeout(tick, 280);
    return () => window.clearTimeout(timer);
  }, [fileIndex]);

  const showFile = (index, { focus = false } = {}) => {
    manualRef.current = true;
    setFileIndex(index);
    setCursor(snippets[index].code.length);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onTabKey = (event) => {
    const last = snippets.length - 1;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const next =
        event.key === "ArrowRight" ? (fileIndex === last ? 0 : fileIndex + 1) : fileIndex === 0 ? last : fileIndex - 1;
      showFile(next, { focus: true });
    } else if (event.key === "Home") {
      event.preventDefault();
      showFile(0, { focus: true });
    } else if (event.key === "End") {
      event.preventDefault();
      showFile(last, { focus: true });
    }
  };

  return (
    <div
      ref={rootRef}
      className="editor"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        const wasManual = manualRef.current;
        pausedRef.current = false;
        manualRef.current = false;
        if (wasManual && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setFileIndex((index) => (index + 1) % snippets.length);
        }
      }}
    >
      <div className="editor-titlebar">
        <svg viewBox="0 0 52 12" className="editor-lights" aria-hidden="true">
          <circle cx="6" cy="6" r="5" fill="#f07178" />
          <circle cx="24" cy="6" r="5" fill="#e6c07b" />
          <circle cx="42" cy="6" r="5" fill="#7fd99a" />
        </svg>
        <span>product-hero — theme</span>
      </div>

      <div className="editor-tabs" role="tablist" aria-label={label} onKeyDown={onTabKey}>
        {snippets.map((item, index) => {
          const selected = index === fileIndex;
          return (
            <button
              key={item.name}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={selected ? "is-active" : ""}
              onClick={() => showFile(index)}
            >
              <Icon name={item.icon} className="h-3.5 w-3.5" />
              {item.name}
            </button>
          );
        })}
      </div>

      <div className="editor-scroll" role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${fileIndex}`} aria-hidden="true">
        <div className="editor-gutter">
          {Array.from({ length: lineCount }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <pre className="editor-pre">
          <code>
            {tokens.map((token, index) => (
              <span key={`${token.kind}-${index}`} className={token.kind === "plain" ? undefined : `tok-${token.kind}`}>
                {token.text}
              </span>
            ))}
            <span className="editor-caret" />
          </code>
        </pre>
      </div>

      <div className="editor-status">
        <span>{file.language}</span>
        <span>
          Ln {caret.line}, Col {caret.column}
        </span>
      </div>

      <div className="sr-only">
        {snippets.map((item) => (
          <pre key={item.name}>
            {item.name}
            {"\n"}
            {item.code}
          </pre>
        ))}
      </div>
    </div>
  );
}
