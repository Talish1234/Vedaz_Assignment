import { getInitials, getCategoryColor } from "../../utils";
import { CATEGORY_COLORS } from "../../config";

export default function Avatar({ id = "0", name = "?", large = false }) {
  const colors = Object.values(CATEGORY_COLORS);
  const color = colors[parseInt(id.slice(-4), 16) % colors.length] || "#6366f1";

  return (
    <div
      className={large ? "avatar-large" : "avatar"}
      style={{
        background: `${color}22`,
        color,
        border: `1px solid ${color}44`,
      }}
    >
      {getInitials(name)}
    </div>
  );
}
