import { useState } from "react";
import globalStyles from "./styles/global";
import Navbar from "./components/layout/Navbar";
import ExpertListPage    from "./pages/ExpertListPage";
import ExpertDetailPage  from "./pages/ExpertDetailPage";
import BookingFormPage   from "./pages/BookingFormPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import MyBookingsPage    from "./pages/MyBookingsPage";

export default function App() {
  const [screen, setScreen]               = useState("list");
  const [activeTab, setActiveTab]         = useState("experts");
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate]   = useState(null);
  const [selectedSlot, setSelectedSlot]   = useState(null);
  const [lastBooking, setLastBooking]     = useState(null);

  const navigate = (tab) => {
    setActiveTab(tab);
    setScreen(tab === "myBookings" ? "myBookings" : "list");
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="app">
        <Navbar activeTab={activeTab} onNavigate={navigate} />

        {screen === "list" && (
          <ExpertListPage
            onSelect={(expert) => {
              setSelectedExpert(expert);
              setScreen("detail");
              setActiveTab("experts");
            }}
          />
        )}

        {screen === "detail" && selectedExpert && (
          <ExpertDetailPage
            expertId={selectedExpert._id}
            onBook={(expert, date, slot) => {
              setSelectedExpert(expert);
              setSelectedDate(date);
              setSelectedSlot(slot);
              setScreen("book");
            }}
            onBack={() => setScreen("list")}
          />
        )}

        {screen === "book" && selectedExpert && (
          <BookingFormPage
            expert={selectedExpert}
            date={selectedDate}
            timeSlot={selectedSlot}
            onSuccess={(booking) => {
              setLastBooking(booking);
              setScreen("success");
            }}
            onBack={() => setScreen("detail")}
          />
        )}

        {screen === "success" && lastBooking && (
          <BookingSuccessPage
            booking={lastBooking}
            onHome={() => { setScreen("list"); setActiveTab("experts"); }}
            onMyBookings={() => navigate("myBookings")}
          />
        )}

        {screen === "myBookings" && <MyBookingsPage />}
      </div>
    </>
  );
}
