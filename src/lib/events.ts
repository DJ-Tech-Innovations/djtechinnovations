export type Prefill = { need?: string; goal?: string; note?: string };

/** Ask the inquiry wizard to preselect options, then scroll to it. */
export function startInquiry(prefill: Prefill = {}) {
  window.dispatchEvent(new CustomEvent("djt:prefill", { detail: prefill }));
  document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
