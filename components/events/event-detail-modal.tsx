"use client";

import { useEffect, useState } from "react";

import { EventStatusSelect } from "@/components/events/event-status-select";
import { Alert } from "@/components/ui/alert";
import { DetailField } from "@/components/ui/detail-field";
import { Modal } from "@/components/ui/modal";
import { api, type Event, type EventStatus } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { getAuthToken } from "@/lib/auth/token";
import { formatEventDate } from "@/lib/events/display";
import commonStrings from "@/lib/strings/common.json";
import eventsStrings from "@/lib/strings/pages/events.json";

type EventDetailModalProps = {
  eventId: string | null;
  onClose: () => void;
  onUpdated: () => void;
  onDeleted: () => void;
};

type ModalState =
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "ready"; event: Event };

export function EventDetailModal({
  eventId,
  onClose,
  onUpdated,
  onDeleted,
}: EventDetailModalProps) {
  const strings = eventsStrings.components.eventDetailModal;
  const [modalState, setModalState] = useState<ModalState>({ type: "loading" });
  const [selectedStatus, setSelectedStatus] = useState<EventStatus>("draft");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) {
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setModalState({ type: "error", message: strings.errors.loadFailed });
      return;
    }

    setModalState({ type: "loading" });
    setActionError(null);
    setShowDeleteConfirm(false);

    void api
      .getEventById(token, eventId)
      .then((event) => {
        setModalState({ type: "ready", event });
        setSelectedStatus(event.status);
      })
      .catch((error: unknown) => {
        setModalState({
          type: "error",
          message: getErrorMessage(error, strings.errors.loadFailed),
        });
      });
  }, [eventId, strings.errors.loadFailed]);

  async function handleSaveStatus() {
    if (modalState.type !== "ready") {
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setActionError(strings.errors.unauthorized);
      return;
    }

    setIsSaving(true);
    setActionError(null);

    try {
      const updated = await api.updateEventStatus(token, modalState.event._id, {
        status: selectedStatus,
      });
      setModalState({ type: "ready", event: updated });
      onUpdated();
    } catch (error: unknown) {
      setActionError(getErrorMessage(error, strings.errors.updateFailed));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (modalState.type !== "ready") {
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setActionError(strings.errors.unauthorized);
      return;
    }

    setIsDeleting(true);
    setActionError(null);

    try {
      await api.deleteEvent(token, modalState.event._id);
      onDeleted();
      onClose();
    } catch (error: unknown) {
      setActionError(getErrorMessage(error, strings.errors.deleteFailed));
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  return (
    <Modal
      open={Boolean(eventId)}
      title={strings.title}
      titleId="event-detail-title"
      closeLabel={strings.close}
      onClose={onClose}
    >
      {modalState.type === "loading" && (
        <p className="mt-6 text-sm text-relatoo-gray">{commonStrings.loading}</p>
      )}

      {modalState.type === "error" && (
        <div className="mt-6">
          <Alert message={modalState.message} />
        </div>
      )}

      {modalState.type === "ready" && (
        <div className="mt-6 space-y-4">
          <dl className="space-y-3 text-sm">
            <DetailField
              label={eventsStrings.table.title}
              value={modalState.event.title}
              emphasized
            />
            {modalState.event.description ? (
              <DetailField
                label={strings.description}
                value={modalState.event.description}
              />
            ) : null}
            <DetailField
              label={eventsStrings.table.date}
              value={formatEventDate(modalState.event.date)}
            />
            <DetailField
              label={eventsStrings.table.location}
              value={modalState.event.location ?? "—"}
            />
            <DetailField
              label={strings.createdAt}
              value={formatEventDate(modalState.event.createdAt)}
            />
          </dl>

          <EventStatusSelect
            id="event-detail-status"
            label={eventsStrings.table.status}
            value={selectedStatus}
            onChange={(status) => {
              if (status) {
                setSelectedStatus(status);
              }
            }}
          />

          {actionError ? <Alert message={actionError} /> : null}

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={() => void handleSaveStatus()}
              disabled={isSaving || selectedStatus === modalState.event.status}
              className="rounded-[5px] bg-relatoo-green px-4 py-2 text-sm font-semibold text-relatoo-dark transition hover:bg-relatoo-green-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? strings.savingStatus : strings.saveStatus}
            </button>

            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-[5px] border border-relatoo-error/40 px-4 py-2 text-sm font-medium text-relatoo-error transition hover:bg-relatoo-error/10"
              >
                {strings.delete}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => void handleDelete()}
                  disabled={isDeleting}
                  className="rounded-[5px] bg-relatoo-error px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {isDeleting ? strings.deleting : strings.confirmDelete}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="rounded-[5px] border border-relatoo-gray-light px-4 py-2 text-sm font-medium text-relatoo-dark"
                >
                  {strings.cancelDelete}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
