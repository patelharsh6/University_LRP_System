// src/components/course/ContentItem.jsx
// Renders a single piece of course content (video, pdf, quiz, assignment, lab)

import Icon from "./Icon";

const TYPE_CONFIG = {
  video:      { icon: "video",      iconClass: "type-icon--video",      labelClass: "type-label--video" },
  pdf:        { icon: "pdf",        iconClass: "type-icon--pdf",        labelClass: "type-label--pdf" },
  assignment: { icon: "assignment", iconClass: "type-icon--assignment", labelClass: "type-label--assignment" },
  quiz:       { icon: "quiz",       iconClass: "type-icon--quiz",       labelClass: "type-label--quiz" },
  lab:        { icon: "lab",        iconClass: "type-icon--lab",        labelClass: "type-label--lab" },
};

function StatusDot({ status }) {
  if (status === "completed" || status === "submitted") {
    return (
      <div className="status-dot status-dot--done">
        <Icon name="check" size={12} color="#fff" />
      </div>
    );
  }
  if (status === "viewed") {
    return (
      <div className="status-dot status-dot--viewed">
        <Icon name="eye" size={12} color="#ff9800" />
      </div>
    );
  }
  if (status === "locked") {
    return (
      <div className="status-dot status-dot--pending">
        <Icon name="lock" size={12} color="#9aa0a6" />
      </div>
    );
  }
  return (
    <div className="status-dot status-dot--pending">
      <Icon name="play" size={12} color="#9aa0a6" />
    </div>
  );
}

export default function ContentItem({ item, onOpen }) {
  const isLocked = item.status === "locked";
  const isDone = item.status === "completed" || item.status === "submitted";
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.video;

  const handleClick = () => {
    if (!isLocked) onOpen(item);
  };

  return (
    <div
      className={`content-item ${isLocked ? "content-item--locked" : ""} ${isDone ? "content-item--done" : ""}`}
      onClick={handleClick}
    >
      {/* Type Icon */}
      <div className={`content-type-icon ${cfg.iconClass}`}>
        <Icon name={isLocked ? "lock" : cfg.icon} size={16} />
      </div>

      {/* Info */}
      <div className="content-item__info">
        <p className="content-item__title">{item.title}</p>
        <div className="content-item__sub">
          <span className={`type-label ${cfg.labelClass}`}>{item.type}</span>
          {item.duration && <span>· {item.duration}</span>}
          {item.questions && <span>· {item.questions} questions</span>}
          {item.size && <span>· {item.size}</span>}
          {item.due && <span className="due-label">· Due {item.due}</span>}
        </div>
      </div>

      {/* Right: grade / score / status */}
      <div className="content-item__right">
        {item.grade && (
          <span className="score-chip score-chip--grade">Grade: {item.grade}</span>
        )}
        {item.score && (
          <span className="score-chip score-chip--score">{item.score}%</span>
        )}
        <StatusDot status={item.status} />
      </div>
    </div>
  );
}
