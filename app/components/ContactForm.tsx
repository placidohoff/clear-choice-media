"use client";

import { useActionState, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";

import { submitContactForm } from "@/app/actions/contact";
import { SERVICE_OPTIONS } from "@/lib/contact";

type FormState = {
  success: boolean;
  error?: string;
};

const initialState: FormState = { success: false };

const dayPickerClassNames = {
  root: "text-sm text-white",
  months: "flex flex-col",
  month: "space-y-3",
  month_caption: "flex items-center justify-center px-2",
  caption_label: "text-xs font-bold uppercase tracking-[0.2em] text-slate-200",
  nav: "flex items-center justify-between",
  button_previous:
    "flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10 disabled:opacity-30",
  button_next:
    "flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10 disabled:opacity-30",
  month_grid: "w-full border-collapse",
  weekdays: "flex",
  weekday: "flex-1 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400",
  weeks: "space-y-1",
  week: "flex",
  day: "flex-1 p-0.5",
  day_button:
    "flex h-9 w-9 items-center justify-center rounded-full text-sm text-slate-200 transition hover:bg-white/10",
  selected: "[&>button]:bg-[#7cd3ff] [&>button]:text-[#091923] [&>button]:font-bold hover:[&>button]:bg-[#7cd3ff]",
  today: "[&>button]:border [&>button]:border-[#7cd3ff]/60",
  outside: "opacity-30",
  disabled: "opacity-20",
};

export default function ContactForm({ eventTypes }: { eventTypes: { name: string }[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function runSubmit(_prevState: FormState, formData: FormData): Promise<FormState> {
    const result = await submitContactForm(formData);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    setShowSuccess(true);
    setSelectedDate(undefined);
    formRef.current?.reset();

    return { success: true };
  }

  const [state, formAction, isPending] = useActionState(runSubmit, initialState);

  return (
    <>
      <form ref={formRef} action={formAction} className="grid gap-4 rounded-[1.5rem] bg-[#0b1821] p-6 ring-1 ring-white/10">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
            Name
            <input
              name="name"
              required
              className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
            Email
            <input
              name="email"
              type="email"
              required
              className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none"
              placeholder="Your email"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
            Phone
            <input
              name="phone"
              required
              className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none"
              placeholder="Your phone"
            />
          </label>
          <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
            Event Type
            <select
              name="eventType"
              required
              defaultValue=""
              className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none"
            >
              <option value="" disabled>
                Select event type
              </option>
              {eventTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
            Event Date
            <div className="rounded-xl border border-white/10 bg-[#0f212d] p-3">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: new Date() }}
                classNames={dayPickerClassNames}
              />
            </div>
            <input type="hidden" name="eventDate" value={selectedDate ? selectedDate.toISOString() : ""} />
          </div>

          <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
            Event Time
            <input
              name="eventTime"
              type="time"
              required
              className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none"
            />

            <span className="mt-4">Event Location</span>
            <input
              name="eventLocation"
              required
              className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none"
              placeholder="Venue or city"
            />

            <span className="mt-4">Estimated Guest Count</span>
            <input
              name="estimatedGuestCount"
              type="number"
              min={1}
              className="rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none"
              placeholder="Optional"
            />
          </label>
        </div>

        <fieldset className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
          <legend className="mb-1">Services Interested In</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((service) => (
              <label key={service} className="flex items-center gap-2 text-xs font-normal uppercase tracking-[0.1em] text-slate-300">
                <input type="checkbox" name="servicesInterested" value={service} className="h-4 w-4 accent-[#7cd3ff]" />
                {service}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-2 text-sm uppercase tracking-[0.18em] text-slate-300">
          Additional Details
          <textarea
            name="details"
            className="min-h-[140px] rounded-xl border border-white/10 bg-[#0f212d] px-4 py-3 text-base text-white outline-none"
            placeholder="Tell us about your event"
          />
        </label>

        {state.error ? (
          <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{state.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 rounded-full bg-[#7cd3ff] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8ad8ff] hover:shadow-[0_14px_32px_rgba(124,211,255,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Sending..." : "Send Inquiry"}
        </button>
      </form>

      {showSuccess && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowSuccess(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-[1.5rem] border border-white/10 bg-[#0d1a22] p-8 text-center"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#7cd3ff]">Request Received</p>
            <h3 className="mt-4 text-3xl font-black uppercase tracking-[-0.05em] text-white">Thank You!</h3>
            <p className="mt-4 text-base text-slate-300">
              We&apos;ve received your event details and will be in touch shortly to help plan your event.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mt-6 rounded-full bg-[#7cd3ff] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#091923] transition hover:bg-[#8ad8ff]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
