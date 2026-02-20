import { useState } from "react";
import { API_BASE } from "../config";
import { Spinner } from "../components/common";
import BookingCard from "../components/bookings/BookingCard";

export default function MyBookingsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const search = async () => {
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setError("");
    setSearched(false);
    try {
      const res = await fetch(`${API_BASE}/bookings?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data.data);
      setSearched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-title">My Bookings</div>
      <div className="page-sub">Track all your expert sessions</div>

      <div className="email-lookup">
        <h2>Look up your bookings</h2>
        <div className="email-row">
          <input
            className={`form-input${error ? " error" : ""}`}
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && search()}
            style={{ flex: 1 }}
          />
          <button className="btn-primary" onClick={search} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <div className="form-error" style={{ marginTop: 8 }}>{error}</div>}
      </div>

      {loading ? (
        <Spinner label="Loading bookings..." />
      ) : searched ? (
        bookings.length === 0 ? (
          <div className="empty-state">
            No bookings found for <strong>{email}</strong>.
          </div>
        ) : (
          <div>
            <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: 16 }}>
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} for{" "}
              <strong style={{ color: "var(--text)" }}>{email}</strong>
            </div>
            {bookings.map((b) => (
              <BookingCard key={b._id} booking={b} />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}
