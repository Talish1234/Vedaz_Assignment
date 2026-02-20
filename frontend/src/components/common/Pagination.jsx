export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button className="page-btn" onClick={() => onChange(page - 1)} disabled={page === 1}>‹</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`page-btn${page === i + 1 ? " active" : ""}`}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button className="page-btn" onClick={() => onChange(page + 1)} disabled={page === totalPages}>›</button>
    </div>
  );
}
