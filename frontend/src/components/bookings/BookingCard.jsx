import { StatusBadge } from "../common";
import { formatDate } from "../../utils";

export default function BookingCard({ booking }) {
  return (
    <div className="booking-card">
      <div className="booking-info">
        <h3>{booking.expertName}</h3>
        <div className="booking-meta">
          <span>📅 {formatDate(booking.date)} at {booking.timeSlot}</span>
          {booking.notes && <span>📝 {booking.notes}</span>}
          <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>
            Booked {new Date(booking.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <StatusBadge status={booking.status} />
    </div>
  );
}
