/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FORM HANDLING
 * ─────────────────────────────────────────────────────────────────────────────
 *  Shared by the school application, contact and partnership forms.
 *
 *  Design notes, because the failure modes here matter more than the happy path:
 *
 *  · Progressive enhancement. Every form is a real <form> with a real action
 *    and method. If this script never loads, the browser submits it natively
 *    and the form service returns its own confirmation. Nothing depends on
 *    JavaScript to work — it only gets nicer with it.
 *
 *  · Nothing is silently lost. If a form has no endpoint configured yet, we do
 *    not pretend to submit. We show the applicant the email address and offer
 *    to open a pre-filled message, so a head teacher who took ten minutes to
 *    fill this in is never told "thanks" when nothing was sent.
 *
 *  · Errors are announced, not just coloured. Validation messages live in
 *    aria-live regions and focus moves to the first problem field, because a
 *    red border communicates nothing to a screen-reader user.
 *
 *  · Files are checked before upload. Many applicants are on mobile data; a
 *    12MB phone photo that fails after a two-minute upload is a lost
 *    application. We check type and size locally and say so immediately.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB per image
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

function bytes(n: number): string {
  return `${(n / (1024 * 1024)).toFixed(1)}MB`;
}

/**
 * A human label for a field, for use in error summaries.
 *
 * Labels here contain a `.field-hint` explaining the question, which would make
 * the summary a paragraph long, so we read a clone with the hint removed.
 */
function labelFor(field: HTMLElement): string {
  const id = field.getAttribute("id");
  const label = id ? document.querySelector(`label[for="${id}"]`) : null;
  if (label) {
    const clone = label.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(".field-hint").forEach((hint) => hint.remove());
    const text = (clone.textContent ?? "")
      .replace(/\s*\((required|optional)\)/gi, "")
      .replace(/\s+/g, " ")
      .trim();
    if (text) return text.length > 60 ? text.slice(0, 57) + "…" : text;
  }
  return field.getAttribute("name") ?? "a field";
}

function setStatus(
  form: HTMLFormElement,
  kind: "error" | "pending" | "none",
  message: string,
): void {
  const box = form.querySelector<HTMLElement>("[data-form-status]");
  if (!box) return;

  if (kind === "none") {
    box.hidden = true;
    box.textContent = "";
    return;
  }

  box.hidden = false;
  box.className =
    kind === "error"
      ? "mt-6 rounded border-l-4 border-[#8f2018] bg-[#fdf3f2] p-4 text-small font-medium text-[#6d1810]"
      : "mt-6 rounded border-l-4 border-ochre-500 bg-cream p-4 text-small font-medium";
  box.textContent = message;
}

/** Validate the image picker. Returns an error string, or null when fine. */
function validateFiles(input: HTMLInputElement): string | null {
  const files = Array.from(input.files ?? []);
  if (files.length === 0) return null;

  if (files.length > MAX_FILES) {
    return `Please choose no more than ${MAX_FILES} photos. You selected ${files.length}.`;
  }
  for (const file of files) {
    if (file.type && !ACCEPTED.includes(file.type)) {
      return `"${file.name}" is not an image we can accept. Please use a JPG, PNG or WebP photo.`;
    }
    if (file.size > MAX_FILE_BYTES) {
      return `"${file.name}" is ${bytes(file.size)}, which is larger than the ${bytes(MAX_FILE_BYTES)} limit. Most phones can send a smaller copy.`;
    }
  }
  return null;
}

function initForm(form: HTMLFormElement): void {
  const fallbackEmail = form.dataset.fallbackEmail ?? "";
  const successPanel = document.querySelector<HTMLElement>(
    `#${form.dataset.successPanel ?? ""}`,
  );
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const fileInput = form.querySelector<HTMLInputElement>('input[type="file"]');

  /* Show the chosen filenames, and check them, as soon as they are picked. */
  if (fileInput) {
    const list = form.querySelector<HTMLElement>("[data-file-list]");
    fileInput.addEventListener("change", () => {
      const problem = validateFiles(fileInput);
      const files = Array.from(fileInput.files ?? []);
      if (list) {
        list.textContent = files.length
          ? files.map((f) => `${f.name} (${bytes(f.size)})`).join(" · ")
          : "";
      }
      if (problem) {
        setStatus(form, "error", problem);
        fileInput.value = "";
        if (list) list.textContent = "";
      } else {
        setStatus(form, "none", "");
      }
    });
  }

  form.addEventListener("submit", async (event) => {
    /* Read the endpoint at submit time rather than caching it at startup: the
       value lives in the DOM, so this is the single source of truth. */
    const endpoint = form.dataset.endpoint ?? "";

    /* Turn on the styling that flags invalid fields. Before this point the form
       stays quiet, so someone still typing isn't shouted at. */
    form.classList.add("form-submitted");

    if (!form.checkValidity()) {
      event.preventDefault();
      /* Scoped to real controls on purpose: `:invalid` also matches <form> and
         <fieldset> when they *contain* an invalid control, so a bare
         querySelector(":invalid") returns a fieldset — which has no label and
         cannot take focus. That produced a generic "check a field" message and
         left focus where it was. */
      const firstInvalid = form.querySelector<HTMLElement>(
        "input:invalid, select:invalid, textarea:invalid",
      );
      if (firstInvalid) {
        setStatus(
          form,
          "error",
          `Please check ${labelFor(firstInvalid)} — that answer is missing or not in the right format.`,
        );
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      return;
    }

    if (fileInput) {
      const problem = validateFiles(fileInput);
      if (problem) {
        event.preventDefault();
        setStatus(form, "error", problem);
        fileInput.focus();
        return;
      }
    }

    /* No endpoint configured yet. Do not pretend. */
    if (!endpoint) {
      event.preventDefault();
      setStatus(
        form,
        "error",
        `This form is not connected to our inbox yet, so we have not sent anything — we would rather tell you than lose your answers. Please email ${fallbackEmail} and we will reply. Your answers are still on screen; nothing has been cleared.`,
      );
      form.querySelector<HTMLElement>("[data-form-status]")?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      return;
    }

    /* Enhanced path: submit in the background so the reader stays on the page. */
    event.preventDefault();
    const originalLabel = submit?.textContent ?? "Send";
    if (submit) {
      submit.disabled = true;
      submit.textContent = "Sending…";
    }
    setStatus(form, "pending", "Sending your answers…");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Form service returned ${response.status}`);

      setStatus(form, "none", "");
      if (successPanel) {
        form.hidden = true;
        successPanel.hidden = false;
        successPanel.setAttribute("tabindex", "-1");
        successPanel.focus();
        successPanel.scrollIntoView({ block: "center", behavior: "smooth" });
      } else {
        form.reset();
        setStatus(form, "pending", "Thank you — we have your message and will reply by email.");
      }
    } catch {
      if (submit) {
        submit.disabled = false;
        submit.textContent = originalLabel;
      }
      setStatus(
        form,
        "error",
        `We could not send that — the connection may have dropped. Please try once more. If it still fails, email ${fallbackEmail} and we will pick it up from there. Your answers are still on screen.`,
      );
    }
  });
}

document.querySelectorAll<HTMLFormElement>("form[data-form]").forEach(initForm);
