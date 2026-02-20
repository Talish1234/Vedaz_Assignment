import { useState, useEffect } from "react";
import { API_BASE } from "../config";
import { Avatar, Spinner, ErrorBox } from "../components/common";
import TimeSlots from "../components/experts/TimeSlots";
import socket from "../socket";
import { getCategoryColor, formatDate } from "../utils";

export default function ExpertDetailPage({ expertId, onBook, onBack }) {
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({});

  // Fetch expert data
  useEffect(() => {
    const fetchExpert = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/experts/${expertId}`);
        if (!res.ok) throw new Error("Expert not found");
        const data = await res.json();
        setExpert(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExpert();
  }, [expertId]);

  // Real-time slot updates via Socket.io
  useEffect(() => {
    const onBooked = ({ expertId: eid, date, timeSlot }) => {
      if (eid !== expertId) return;
      setBookedSlots((prev) => ({ ...prev, [`${date}_${timeSlot}`]: true }));
      // Deselect if the slot the user picked was just taken
      if (selectedDate === date && selectedSlot === timeSlot) {
        setSelectedDate(null);
        setSelectedSlot(null);
      }
    };

    const onRestored = ({ expertId: eid, date, timeSlot }) => {
      if (eid !== expertId) return;
      setBookedSlots((prev) => ({ ...prev, [`${date}_${timeSlot}`]: false }));
    };

    socket.on("slotBooked", onBooked);
    socket.on("slotRestored", onRestored);
    return () => {
      socket.off("slotBooked", onBooked);
      socket.off("slotRestored", onRestored);
    };
  }, [expertId, selectedDate, selectedSlot]);

  if (loading) return <Spinner label="Loading expert..." />;
  if (error) return (
    <>
      <button className="back-btn" onClick={onBack}>← Back</button>
      <ErrorBox message={error} />
    </>
  );

  const color = getCategoryColor(expert.category);

  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Back to experts</button>

      <div className="detail-header">
        <Avatar id={expert._id} name={expert.name} large />
        <div style={{ flex: 1 }}>
          <span
            className="card-cat"
            style={{ background: `${color}22`, color, marginBottom: 8, display: "inline-block" }}
          >
            {expert.category}
          </span>
          <div className="detail-name">{expert.name}</div>
          <div className="detail-bio">{expert.bio}</div>
          <div className="detail-meta">
            <div className="meta-chip">⭐ {expert.rating?.toFixed(1)} ({expert.reviewCount} reviews)</div>
            <div className="meta-chip">💼 {expert.experience} years</div>
            <div className="meta-chip">💰 ${expert.hourlyRate}/hr</div>
          </div>
        </div>
      </div>

      <TimeSlots
        availableSlots={expert.availableSlots}
        bookedSlots={bookedSlots}
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
        onSelect={(date, slot) => { setSelectedDate(date); setSelectedSlot(slot); }}
      />

      <button
        className="book-cta"
        disabled={!selectedSlot}
        onClick={() => onBook(expert, selectedDate, selectedSlot)}
      >
        {selectedSlot
          ? `Book ${selectedSlot} on ${formatDate(selectedDate)} →`
          : "Select a time slot to continue"}
      </button>
    </div>
  );
}
