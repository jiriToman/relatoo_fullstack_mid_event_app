"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { EventStatusSelect } from "@/components/events/event-status-select";
import { Alert } from "@/components/ui/alert";
import { api, type CreateEventRequest, type EventStatus } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { getAuthToken } from "@/lib/auth/token";
import createEventStrings from "@/lib/strings/pages/create-event.json";

const strings = createEventStrings.components.createEventForm;

const inputClassName =
  "w-full rounded-[5px] border border-relatoo-gray-light bg-white px-3 py-2 text-sm text-relatoo-dark outline-none transition focus:border-relatoo-green focus:ring-2 focus:ring-relatoo-green/30";

export function CreateEventForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<EventStatus>("draft");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const token = getAuthToken();
    if (!token) {
      setError(strings.genericError);
      setIsSubmitting(false);
      return;
    }

    const body: CreateEventRequest = {
      title: title.trim(),
      date: new Date(date).toISOString(),
      status,
    };

    const trimmedDescription = description.trim();
    const trimmedLocation = location.trim();

    if (trimmedDescription) {
      body.description = trimmedDescription;
    }
    if (trimmedLocation) {
      body.location = trimmedLocation;
    }

    try {
      await api.createEvent(token, body);
      router.push("/events");
      router.refresh();
    } catch (submitError) {
      setError(getErrorMessage(submitError, strings.genericError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="event-title" className="mb-1.5 block text-sm font-medium text-relatoo-dark">
          {strings.titleLabel}
        </label>
        <input
          id="event-title"
          type="text"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={strings.titlePlaceholder}
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="event-description"
          className="mb-1.5 block text-sm font-medium text-relatoo-dark"
        >
          {strings.descriptionLabel}
        </label>
        <textarea
          id="event-description"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={strings.descriptionPlaceholder}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="event-date" className="mb-1.5 block text-sm font-medium text-relatoo-dark">
          {strings.dateLabel}
        </label>
        <input
          id="event-date"
          type="datetime-local"
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="event-location"
          className="mb-1.5 block text-sm font-medium text-relatoo-dark"
        >
          {strings.locationLabel}
        </label>
        <input
          id="event-location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder={strings.locationPlaceholder}
          className={inputClassName}
        />
      </div>

      <EventStatusSelect
        id="event-create-status"
        label={strings.statusLabel}
        value={status}
        onChange={(value) => {
          if (value) {
            setStatus(value);
          }
        }}
      />

      {error ? <Alert message={error} /> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-[5px] bg-relatoo-green px-4 py-2 text-sm font-semibold text-relatoo-dark transition hover:bg-relatoo-green-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? strings.submitting : strings.submit}
      </button>
    </form>
  );
}
