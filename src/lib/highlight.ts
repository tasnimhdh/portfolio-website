const JS_KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "async",
  "await",
  "new",
  "document",
  "true",
  "false",
  "null",
  "typeof",
  "of",
  "in",
  "this",
  "export",
  "import",
  "from",
  "type",
  "interface",
  "default",
]);

const PY_KEYWORDS = new Set([
  "def",
  "return",
  "class",
  "import",
  "from",
  "async",
  "await",
  "if",
  "else",
  "None",
  "True",
  "False",
  "for",
  "in",
]);

export function tokenize(input: string, language: string) {
  const normalized = language === "ts" || language === "tsx" ? "js" : language === "py" ? "python" : language;
  language = normalized;
  const tokens: { kind: string; text: string }[] = [];
  let i = 0;
  let mode = language === "liquid" ? "liquid" : language;

  const push = (kind: string, text: string) => {
    if (text) tokens.push({ kind, text });
  };

  while (i < input.length) {
    const rest = input.slice(i);

    if (mode === "json" && rest.startsWith("{%")) {
      mode = "liquid";
    }

    if (mode === "liquid" && (rest.startsWith("{%") || rest.startsWith("{{"))) {
      const closer = rest.startsWith("{%") ? "%}" : "}}";
      const end = input.indexOf(closer, i + 2);
      const next = end === -1 ? input.length : end + closer.length;
      const text = input.slice(i, next);
      push("liquid", text);
      i = next;
      if (text.includes("schema") && !text.includes("endschema")) mode = "json";
      else mode = "liquid";
      continue;
    }

    if (mode === "python" && input[i] === "#") {
      const end = input.indexOf("\n", i);
      const next = end === -1 ? input.length : end;
      push("comment", input.slice(i, next));
      i = next;
      continue;
    }

    if ((mode === "js" || mode === "css") && rest.startsWith("//")) {
      const end = input.indexOf("\n", i);
      const next = end === -1 ? input.length : end;
      push("comment", input.slice(i, next));
      i = next;
      continue;
    }

    if ((mode === "js" || mode === "css" || mode === "liquid") && rest.startsWith("/*")) {
      const end = input.indexOf("*/", i + 2);
      const next = end === -1 ? input.length : end + 2;
      push("comment", input.slice(i, next));
      i = next;
      continue;
    }

    if ((mode === "html" || mode === "liquid") && rest.startsWith("<!--")) {
      const end = input.indexOf("-->", i + 4);
      const next = end === -1 ? input.length : end + 3;
      push("comment", input.slice(i, next));
      i = next;
      continue;
    }

    const quote = input[i];
    if (quote === '"' || quote === "'") {
      const start = i;
      i += 1;
      while (i < input.length && input[i] !== quote) {
        if (input[i] === "\\") i += 2;
        else i += 1;
      }
      if (i < input.length) i += 1;
      const text = input.slice(start, i);
      const isKey = mode === "json" && /^\s*:/.test(input.slice(i));
      push(isKey ? "key" : "string", text);
      continue;
    }

    if ((mode === "html" || mode === "liquid") && input[i] === "<") {
      push("punct", "<");
      i += 1;
      if (input[i] === "/") {
        push("punct", "/");
        i += 1;
      }
      const nameStart = i;
      while (i < input.length && /[A-Za-z0-9-]/.test(input[i])) i += 1;
      push("tag", input.slice(nameStart, i));
      while (i < input.length && input[i] !== ">") {
        if (input[i] === '"' || input[i] === "'") {
          const q = input[i];
          const start = i;
          i += 1;
          while (i < input.length && input[i] !== q) {
            if (input[i] === "\\") i += 2;
            else i += 1;
          }
          if (i < input.length) i += 1;
          push("string", input.slice(start, i));
          continue;
        }
        if (/[A-Za-z_:-]/.test(input[i])) {
          const start = i;
          while (i < input.length && /[A-Za-z0-9_:-]/.test(input[i])) i += 1;
          push("attr", input.slice(start, i));
          continue;
        }
        push("punct", input[i]);
        i += 1;
      }
      if (input[i] === ">") {
        push("punct", ">");
        i += 1;
      }
      continue;
    }

    if (mode === "css" && input[i] === "#") {
      const start = i;
      i += 1;
      while (i < input.length && /[0-9A-Fa-f]/.test(input[i])) i += 1;
      if (i > start + 1) {
        push("number", input.slice(start, i));
        continue;
      }
      i = start;
    }

    if (/[A-Za-z_]/.test(input[i]) || (mode === "css" && (input[i] === "." || input[i] === "#"))) {
      const start = i;
      if (mode === "css" && (input[i] === "." || input[i] === "#")) i += 1;
      while (i < input.length && /[A-Za-z0-9_-]/.test(input[i])) i += 1;
      const word = input.slice(start, i);
      let kind = "plain";
      if ((mode === "js" || mode === "python") && (mode === "python" ? PY_KEYWORDS : JS_KEYWORDS).has(word)) kind = "keyword";
      else if (mode === "json" && (word === "true" || word === "false" || word === "null")) kind = "keyword";
      else if (mode === "css") {
        const next = input.slice(i).match(/^\s*(.)/);
        kind = next && next[1] === ":" ? "property" : "selector";
      }
      push(kind, word);
      continue;
    }

    if (/[0-9]/.test(input[i])) {
      const start = i;
      while (i < input.length && /[0-9.]/.test(input[i])) i += 1;
      push("number", input.slice(start, i));
      continue;
    }

    if (/\s/.test(input[i])) {
      const start = i;
      while (i < input.length && /\s/.test(input[i])) i += 1;
      push("plain", input.slice(start, i));
      continue;
    }

    const start = i;
    i += 1;
    while (i < input.length && !/[\sA-Za-z0-9_"'<.{#]/.test(input[i])) i += 1;
    push("punct", input.slice(start, i));
  }

  return tokens;
}

export function caretPosition(source: string) {
  const lines = source.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}
