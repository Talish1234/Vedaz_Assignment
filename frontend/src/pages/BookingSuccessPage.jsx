import { formatDate } from "../utils";

export default function BookingSuccessPage({ booking, onHome, onMyBookings }) {
  return (
    <div className="success-card">
      <div className="success-icon">🎉</div>
      <div className="success-title">Booking Confirmed!</div>
      <div className="success-msg">
        Your session with <strong>{booking.expertName}</strong> on{" "}
        <strong>{formatDate(booking.date)}</strong> at{" "}
        <strong>{booking.timeSlot}</strong> is confirmed. Confirmation sent to{" "}
        <strong>{booking.clientEmail}</strong>.
      </div>
      <div className="success-actions">
        <button className="btn-outline" onClick={onHome}>Browse more experts</button>
        <button className="btn-primary" onClick={onMyBookings}>View my bookings</button>
      </div>
    </div>
  );
}
