import { formatDate } from "../../utils";

export default function BookingSummary({ expert, date, timeSlot }) {
  return (
    <div className="form-summary">
      <div className="summary-row">
        <span>Expert</span>
        <span style={{ fontWeight: 600 }}>{expert.name}</span>
      </div>
      <div className="summary-row">
        <span>Date</span>
        <span>{date ? formatDate(date) : "—"}</span>
      </div>
      <div className="summary-row">
        <span>Time</span>
        <span>{timeSlot || "—"}</span>
      </div>
      <div className="summary-row">
        <span>Rate</span>
        <span>${expert.hourlyRate}/hr</span>
      </div>
    </div>
  );
}
