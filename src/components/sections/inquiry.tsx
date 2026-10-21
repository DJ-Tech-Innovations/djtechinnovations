"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Loader2, RotateCcw, ShieldCheck } from "lucide-react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Icon } from "../icon";
import { Confetti } from "../confetti";
import { budgets, contactMethods, goals, needs } from "@/lib/content";
import type { Prefill } from "@/lib/events";

const schema = z.object({
  need: z.string().min(1, "Please choose the kind of solution you need."),
  goal: z.string().min(1, "Please choose your main goal."),
  budget: z.string().optional(),
  name: z.string().trim().min(2, "Please enter your full name."),
  company: z.string().trim().min(2, "Please enter your business or company name."),
  email: z.string().trim().min(1, "Please enter your email address.").email("That doesn't look like a valid email address."),
  phone: z.string().trim().optional().refine((v) => !v || /^[+\d\s()-]{7,20}$/.test(v), "Use digits, spaces, + or - only (7–20 characters)."),
  description: z.string().trim().min(15, "Please share a little more detail (at least 15 characters).").max(1000, "Please keep this under 1,000 characters."),
  method: z.string().min(1, "Please choose how you'd like us to reach you."),
  consent: z.boolean().refine((v) => v, "Please agree so we can contact you about your inquiry."),
});
type Values = z.infer<typeof schema>;

const labels = ["Need", "Goal", "Budget", "Details", "Review"];
const stepFields: (keyof Values)[][] = [["need"], ["goal"], [], ["name", "company", "email", "phone", "description", "method"], ["consent"]];

const empty: Values = { need: "", goal: "", budget: "", name: "", company: "", email: "", phone: "", description: "", method: "Email", consent: false };

function Err({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {msg}
    </p>
  );
}

function Choice({ name, value, checked, onChange, children, desc, icon }: { name: string; value: string; checked: boolean; onChange: () => void; children: React.ReactNode; desc?: string; icon?: string }) {
  return (
    <label className="relative block cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex h-full items-start gap-3 rounded-2xl border-2 border-line bg-white p-4 transition hover:border-brand-soft hover:shadow-md peer-checked:border-brand peer-checked:bg-brand/5 peer-checked:shadow-md peer-checked:shadow-brand/10 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-soft">
        {icon && <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon name={icon} className="h-5 w-5" /></span>}
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-ink">{children}</span>
          {desc && <span className="mt-0.5 block text-sm text-muted">{desc}</span>}
        </span>
        <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${checked ? "border-brand bg-brand text-white" : "border-slate-300"}`}>
          {checked && <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />}
        </span>
      </span>
    </label>
  );
}

const input = "w-full rounded-xl border-2 border-line bg-white px-4 py-3 text-base text-ink placeholder:text-slate-400 transition hover:border-slate-300 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-red-500";

export function Inquiry() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const head = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  const { register, watch, setValue, trigger, handleSubmit, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: empty,
    shouldUnregister: false,
    mode: "onTouched",
  });
  const v = watch();

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    head.current?.focus({ preventScroll: true });
  }, [step, status]);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const p = (e as CustomEvent<Prefill>).detail ?? {};
      setStatus("idle");
      if (p.need) setValue("need", p.need, { shouldValidate: true });
      if (p.goal) setValue("goal", p.goal, { shouldValidate: true });
      if (p.note && !watch("description")) setValue("description", p.note);
      setStep(p.need ? (p.goal ? 2 : 1) : 0);
    };
    window.addEventListener("djt:prefill", onPrefill);
    return () => window.removeEventListener("djt:prefill", onPrefill);
  }, [setValue, watch]);

  const next = useCallback(async () => {
    if (await trigger(stepFields[step])) setStep((s) => Math.min(s + 1, 4));
  }, [step, trigger]);

  const submit = handleSubmit(async () => {
    setStatus("sending");
    // Demo only: there is no backend yet. Replace with a real API call (e.g. a Route Handler) when ready.
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("done");
  });

  const restart = () => { reset(empty); setStep(0); setStatus("idle"); };

  const pick = (k: "need" | "goal" | "budget", val: string) => setValue(k, val, { shouldValidate: true });

  return (
    <section id="inquiry" className="relative bg-soft py-20 lg:py-28" aria-labelledby="inq-h">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Project inquiry" title="Tell Us What You Want to Build." body="Have an idea, an inefficient process, or a business challenge? Tell us a little about it. We'll use your answers to understand the kind of solution you need." />
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-2xl shadow-brand/10">
            <div className="border-b border-line bg-navy-950 px-6 py-3 text-center text-xs font-medium text-slate-300">
              <b className="text-brand-soft">Prototype demo:</b> this form does not send anything yet. No data leaves your browser.
            </div>

            {status !== "done" && (
              <div className="px-6 pt-7 sm:px-10">
                <ol className="flex items-center" aria-label="Progress">
                  {labels.map((l, i) => (
                    <li key={l} className={`flex items-center ${i < 4 ? "flex-1" : ""}`} aria-current={i === step ? "step" : undefined}>
                      <span className="flex flex-col items-center gap-1.5">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${i < step ? "bg-brand text-white" : i === step ? "bg-gradient-to-br from-brand to-[#8b5cf6] text-white ring-4 ring-brand/20" : "bg-slate-100 text-slate-500"}`}>
                          {i < step ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
                        </span>
                        <span className={`hidden text-xs font-semibold sm:block ${i === step ? "text-ink" : "text-muted"}`}>{l}</span>
                      </span>
                      {i < 4 && <span className={`mx-2 mb-5 h-0.5 flex-1 rounded transition sm:mb-6 ${i < step ? "bg-brand" : "bg-slate-200"}`} />}
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-center text-sm font-medium text-muted sm:hidden">Step {step + 1} of 5 · {labels[step]}</p>
              </div>
            )}

            <form onSubmit={submit} noValidate className="px-6 pb-8 pt-8 sm:px-10 sm:pb-10">
              {status === "done" ? (
                <div className="relative py-6 text-center" aria-live="polite">
                  <Confetti />
                  <span className="pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Check className="h-8 w-8" strokeWidth={3} aria-hidden="true" /></span>
                  <h3 ref={head} tabIndex={-1} className="mt-6 text-2xl font-extrabold outline-none">Thanks, {v.name.split(" ")[0]}. Your inquiry is ready.</h3>
                  <p className="mx-auto mt-3 max-w-md text-muted">
                    This is a demo confirmation. In the live site, your inquiry would reach the DJ Tech Innovations team and we would reply by {v.method.toLowerCase()}.
                  </p>
                  <p className="mx-auto mt-5 inline-block rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-800">
                    Demo mode: nothing was actually sent.
                  </p>
                  <div><button type="button" onClick={restart} className="mt-8 inline-flex items-center gap-2 rounded-xl border-2 border-line px-5 py-3 font-semibold transition hover:border-brand hover:text-brand"><RotateCcw className="h-4 w-4" aria-hidden="true" /> Start another inquiry</button></div>
                </div>
              ) : (
                <>
                  {step === 0 && (
                    <fieldset aria-describedby={errors.need ? "e-need" : undefined}>
                      <legend className="text-xl font-bold"><h3 ref={head} tabIndex={-1} className="outline-none">What do you need?</h3></legend>
                      <p className="mt-1 text-sm text-muted">Pick the closest match. You can refine it later.</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {needs.map((n) => <Choice key={n.v} name="need" value={n.v} icon={n.icon} desc={n.d} checked={v.need === n.v} onChange={() => pick("need", n.v)}>{n.v}</Choice>)}
                      </div>
                      <Err id="e-need" msg={errors.need?.message} />
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset aria-describedby={errors.goal ? "e-goal" : undefined}>
                      <legend className="text-xl font-bold"><h3 ref={head} tabIndex={-1} className="outline-none">What is your main goal?</h3></legend>
                      <p className="mt-1 text-sm text-muted">What would you most like this project to achieve?</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {goals.map((g) => <Choice key={g} name="goal" value={g} checked={v.goal === g} onChange={() => pick("goal", g)}>{g}</Choice>)}
                      </div>
                      <Err id="e-goal" msg={errors.goal?.message} />
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset>
                      <legend className="text-xl font-bold"><h3 ref={head} tabIndex={-1} className="outline-none">Project budget <span className="text-sm font-medium text-muted">(optional)</span></h3></legend>
                      <p className="mt-1 text-sm text-muted">These are indicative planning ranges to help us scope, not fixed quotations. Feel free to skip this step.</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {budgets.map((b) => <Choice key={b} name="budget" value={b} checked={v.budget === b} onChange={() => pick("budget", b)}>{b}</Choice>)}
                      </div>
                      {v.budget && <button type="button" onClick={() => setValue("budget", "")} className="mt-4 text-sm font-semibold text-brand hover:underline">Clear selection</button>}
                    </fieldset>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 ref={head} tabIndex={-1} className="text-xl font-bold outline-none">Project details</h3>
                      <p className="mt-1 text-sm text-muted">So we know who we&apos;re talking to and what you have in mind.</p>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        {([
                          ["name", "Full name", "text", "name", "e.g. Maria Santos", true],
                          ["company", "Business or company name", "text", "organization", "Your business name", true],
                          ["email", "Email address", "email", "email", "you@yourbusiness.com", true],
                          ["phone", "Contact number (optional)", "tel", "tel", "+63 …", false],
                        ] as const).map(([k, label, type, ac, ph, req]) => (
                          <div key={k}>
                            <label htmlFor={`f-${k}`} className="mb-1.5 block text-sm font-semibold">{label}{req && <span className="text-red-600" aria-hidden="true"> *</span>}</label>
                            <input id={`f-${k}`} type={type} autoComplete={ac} placeholder={ph} aria-required={req} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} className={input} {...register(k)} />
                            <Err id={`e-${k}`} msg={errors[k]?.message} />
                          </div>
                        ))}
                        <div className="sm:col-span-2">
                          <label htmlFor="f-description" className="mb-1.5 block text-sm font-semibold">Short project description <span className="text-red-600" aria-hidden="true">*</span></label>
                          <textarea id="f-description" rows={4} placeholder="What process or problem would you like to improve? Who will use the software?" aria-required aria-invalid={!!errors.description} aria-describedby={errors.description ? "e-description" : undefined} className={input} {...register("description")} />
                          <div className="flex justify-between"><Err id="e-description" msg={errors.description?.message} /><span className="ml-auto mt-1.5 text-xs text-muted">{v.description.length}/1000</span></div>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="f-method" className="mb-1.5 block text-sm font-semibold">Preferred contact method</label>
                          <select id="f-method" className={input} {...register("method")}>{contactMethods.map((m) => <option key={m}>{m}</option>)}</select>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <h3 ref={head} tabIndex={-1} className="text-xl font-bold outline-none">Review and submit</h3>
                      <p className="mt-1 text-sm text-muted">Please check your answers. Use Back to change anything.</p>
                      <dl className="mt-5 divide-y divide-line rounded-2xl border border-line bg-soft text-sm">
                        {([
                          ["I need", v.need, 0], ["Main goal", v.goal, 1], ["Budget range", v.budget || "Not specified", 2],
                          ["Name", v.name, 3], ["Company", v.company, 3], ["Email", v.email, 3], ["Contact number", v.phone || "Not provided", 3],
                          ["Preferred contact", v.method, 3], ["Description", v.description, 3],
                        ] as const).map(([k, val, s]) => (
                          <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[150px_1fr_auto] sm:gap-4">
                            <dt className="font-semibold text-muted">{k}</dt>
                            <dd className="break-words font-medium text-ink">{val}</dd>
                            <button type="button" onClick={() => setStep(s)} className="justify-self-start text-sm font-semibold text-brand hover:underline sm:justify-self-end">Edit<span className="sr-only"> {k}</span></button>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-5 flex gap-3 rounded-2xl bg-brand/5 p-4 text-sm leading-relaxed text-slate-700">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                        <p>Privacy notice: we will only use the details you share to respond to this inquiry. We won&apos;t sell your information. A full Privacy Policy will be linked here before launch.</p>
                      </div>
                      <label className="mt-4 flex cursor-pointer items-start gap-3">
                        <input type="checkbox" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "e-consent" : undefined} className="mt-1 h-5 w-5 shrink-0 rounded accent-brand" {...register("consent")} />
                        <span className="text-sm font-medium">I agree that DJ Tech Innovations may contact me about this inquiry using the details above.</span>
                      </label>
                      <Err id="e-consent" msg={errors.consent?.message} />
                      {status === "error" && <Err id="e-submit" msg="Something went wrong. Please try again." />}
                    </div>
                  )}

                  <div className="mt-9 flex items-center justify-between gap-3">
                    <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0 || status === "sending"} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:invisible">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                    </button>
                    <div className="flex items-center gap-3">
                      {step === 2 && !v.budget && <button type="button" onClick={next} className="rounded-xl px-4 py-3 text-sm font-semibold text-muted hover:text-ink">Skip this step</button>}
                      {step < 4 ? (
                        <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-[#8b5cf6] px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
                          Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      ) : (
                        <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-[#8b5cf6] px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70">
                          {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</> : "Send Project Inquiry"}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
