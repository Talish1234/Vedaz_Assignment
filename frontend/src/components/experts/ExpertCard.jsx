import { Avatar } from "../common";
import { getCategoryColor } from "../../utils";

export default function ExpertCard({ expert, onClick }) {
  const color = getCategoryColor(expert.category);

  return (
    <div className="expert-card" onClick={() => onClick(expert)}>
      <div className="card-top">
        <Avatar id={expert._id} name={expert.name} />
        <div>
          <div className="card-name">{expert.name}</div>
          <span
            className="card-cat"
            style={{ background: `${color}22`, color }}
          >
            {expert.category}
          </span>
        </div>
      </div>

      <div className="card-bio">{expert.bio}</div>

      <div className="card-stats">
        <div className="stat">
          <div className="stat-val">
            <span className="rating">★ {expert.rating?.toFixed(1)}</span>
          </div>
          <div className="stat-label">{expert.reviewCount} reviews</div>
        </div>
        <div className="stat">
          <div className="stat-val">{expert.experience}y</div>
          <div className="stat-label">experience</div>
        </div>
        <div className="stat">
          <div className="stat-val">${expert.hourlyRate}</div>
          <div className="stat-label">per hour</div>
        </div>
      </div>
    </div>
  );
}
