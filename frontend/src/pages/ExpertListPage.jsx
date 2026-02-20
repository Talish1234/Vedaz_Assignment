import { useState, useEffect } from "react";
import { API_BASE } from "../config";
import ExpertCard from "../components/experts/ExpertCard";
import ExpertFilters from "../components/experts/ExpertFilters";
import { Spinner, ErrorBox, Pagination } from "../components/common";

export default function ExpertListPage({ onSelect }) {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchExperts = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ page, limit: 6 });
        if (category !== "All") params.set("category", category);
        if (search.trim()) params.set("search", search.trim());

        const res = await fetch(`${API_BASE}/experts?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch experts");

        const data = await res.json();
        setExperts(data.data);
        setTotalPages(data.pagination.pages);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
    return () => controller.abort();
  }, [page, category, search]);

  useEffect(() => setPage(1), [search, category]);

  return (
    <div>
      <div className="page-title">Find Your Expert</div>
      <div className="page-sub">Book a session with world-class professionals</div>

      <ExpertFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      {loading ? (
        <Spinner label="Loading experts..." />
      ) : error ? (
        <ErrorBox message={error} />
      ) : experts.length === 0 ? (
        <div className="empty-state">No experts found matching your criteria.</div>
      ) : (
        <div className="experts-grid">
          {experts.map((expert) => (
            <ExpertCard key={expert._id} expert={expert} onClick={onSelect} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
