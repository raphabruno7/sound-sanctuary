import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function expectIncludes(file, haystack, needle) {
  if (!haystack.includes(needle)) {
    throw new Error(`${file}: expected to include ${JSON.stringify(needle)}`);
  }
}

function expectNotIncludes(file, haystack, needle) {
  if (haystack.includes(needle)) {
    throw new Error(`${file}: expected NOT to include ${JSON.stringify(needle)}`);
  }
}

function checkNewsletter() {
  const file = "src/app/[locale]/newsletter/page.tsx";
  const src = read(file);

  expectIncludes(file, src, 'namespace: "newsletterPage"');
  expectIncludes(file, src, "t(");

  // Guard against hardcoded EN copy creeping back in.
  [
    "Quiet updates",
    "What You Will Receive",
    "Delivery Rhythm",
    "Sent occasionally—no spam.",
  ].forEach((needle) => expectNotIncludes(file, src, needle));
}

function checkPrivacy() {
  const file = "src/app/[locale]/privacy/page.tsx";
  const src = read(file);

  expectIncludes(file, src, 'namespace: "privacyPage"');
  expectIncludes(file, src, "t(");

  // Guard against hardcoded EN copy creeping back in.
  [
    "What we collect",
    "What we use it for",
    "How to remove your data",
    "We do not use advertising or tracking cookies.",
  ].forEach((needle) => expectNotIncludes(file, src, needle));
}

try {
  checkNewsletter();
  checkPrivacy();
  console.log("i18n page checks: OK");
} catch (err) {
  console.error(String(err instanceof Error ? err.message : err));
  process.exit(1);
}

