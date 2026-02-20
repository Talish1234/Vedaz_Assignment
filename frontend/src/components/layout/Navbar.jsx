export default function Navbar({ activeTab, onNavigate }) {
  return (
    <nav className="nav">
      <div className="nav-logo">ExpertConnect</div>
      <div className="nav-tabs">
        <button
          className={`nav-tab${activeTab === "experts" ? " active" : ""}`}
          onClick={() => onNavigate("experts")}
        >
          Experts
        </button>
        <button
          className={`nav-tab${activeTab === "myBookings" ? " active" : ""}`}
          onClick={() => onNavigate("myBookings")}
        >
          My Bookings
        </button>
      </div>
    </nav>
  );
}
