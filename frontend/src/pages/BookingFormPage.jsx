import { useState } from "react";
import { API_BASE } from "../config";
import { ErrorBox } from "../components/common";
import BookingSummary from "../components/bookings/BookingSummary";
import { validateBookingForm } from "../utils";

export default function BookingFormPage({ expert, date, timeSlot, onSuccess, onBack }) {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    date: date || "",
    timeSlot: timeSlot || "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const change = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "", submit: "" }));
  };

  const submit = async () => {
    const validationErrors = validateBookingForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, expertId: expert._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");
      onSuccess(data.data);
    } catch (err) {
      setErrors((e) => ({ ...e, submit: err.message }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Back to {expert.name}</button>

      <div className="booking-form">
        <div className="form-title">Complete Your Booking</div>
        <div className="form-subtitle">Fill in your details to confirm the session</div>

        <BookingSummary expert={expert} date={date} timeSlot={timeSlot} />

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              className={`form-input${errors.clientName ? " error" : ""}`}
              placeholder="Jane Doe"
              value={form.clientName}
              onChange={(e) => change("clientName", e.target.value)}
            />
            {errors.clientName && <span className="form-error">{errors.clientName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input
              className={`form-input${errors.clientPhone ? " error" : ""}`}
              placeholder="+1 234 567 8900"
              value={form.clientPhone}
              onChange={(e) => change("clientPhone", e.target.value)}
            />
            {errors.clientPhone && <span className="form-error">{errors.clientPhone}</span>}
          </div>

          <div className="form-group full">
            <label className="form-label">Email *</label>
            <input
              className={`form-input${errors.clientEmail ? " error" : ""}`}
              placeholder="you@example.com"
              value={form.clientEmail}
              onChange={(e) => change("clientEmail", e.target.value)}
            />
            {errors.clientEmail && <span className="form-error">{errors.clientEmail}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              className={`form-input${errors.date ? " error" : ""}`}
              value={form.date}
              onChange={(e) => change("date", e.target.value)}
              style={{ colorScheme: "dark" }}
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Time Slot *</label>
            <input className="form-input" value={form.timeSlot} readOnly style={{ opacity: 0.8 }} />
          </div>

          <div className="form-group full">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="What would you like to discuss?"
              value={form.notes}
              onChange={(e) => change("notes", e.target.value)}
              style={{ resize: "vertical" }}
            />
          </div>
        </div>

        {errors.submit && <ErrorBox message={errors.submit} />}

        <button className="submit-btn" disabled={submitting} onClick={submit}>
          {submitting ? "Confirming booking..." : "Confirm Booking →"}
        </button>
      </div>
    </div>
  );
}
