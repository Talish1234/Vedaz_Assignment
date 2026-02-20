import { CATEGORIES } from "../../config";

export default function ExpertFilters({ search, onSearchChange, category, onCategoryChange }) {
  return (
    <div className="controls">
      <div className="search-box">
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-scroll">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`filter-btn${category === c ? " active" : ""}`}
            onClick={() => onCategoryChange(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
