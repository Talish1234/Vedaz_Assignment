import { formatDate } from "../../utils";

export default function TimeSlots({ availableSlots = [], bookedSlots, selectedDate, selectedSlot, onSelect }) {
  const isBooked = (date, slot) => !!bookedSlots[`${date}_${slot}`];

  if (availableSlots.length === 0) {
    return <div className="empty-state">No available slots at this time.</div>;
  }

  return (
    <div className="slots-section">
      <div className="slots-title">
        Available Time Slots
        <span className="realtime-badge">
          <span className="pulse-dot" />
          Live updates
        </span>
      </div>

      {availableSlots.map((day) => (
        <div key={day.date} className="date-group">
          <div className="date-label">{formatDate(day.date)}</div>
          <div className="slots-row">
            {day.slots.map((slot) => {
              const booked   = isBooked(day.date, slot);
              const selected = selectedDate === day.date && selectedSlot === slot;
              return (
                <button
                  key={slot}
                  className={`slot-btn${booked ? " booked" : selected ? " selected" : ""}`}
                  disabled={booked}
                  onClick={() => onSelect(day.date, slot)}
                >
                  {slot}{booked ? " ✕" : ""}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
