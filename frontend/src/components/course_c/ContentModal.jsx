// src/components/course/ContentModal.jsx
// Popup that appears when a student clicks a content item

import Icon from "./Icon";

const TYPE_CONFIG = {
  video:      { icon: "video",      iconClass: "type-icon--video",      label: "Video Lecture",  emoji: "🎬" },
  pdf:        { icon: "pdf",        iconClass: "type-icon--pdf",        label: "PDF Document",   emoji: "📄" },
  assignment: { icon: "assignment", iconClass: "type-icon--assignment", label: "Assignment",     emoji: "✍️" },
  quiz:       { icon: "quiz",       iconClass: "type-icon--quiz",       label: "Quiz",           emoji: "🧠" },
  lab:        { icon: "lab",        iconClass: "type-icon--lab",        label: "Lab Session",    emoji: "🔬" },
};

export default function ContentModal({ item, onClose }) {
  if (!item) return null;

  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.video;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <div className={`modal-type-icon content-type-icon ${cfg.iconClass}`} style={{ width: 48, height: 48 }}>
            <Icon name={cfg.icon} size={22} />
          </div>
          <div className="modal-header__text">
            <small style={{ color: "var(--text-muted)" }}>{cfg.label}</small>
            <h3>{item.title}</h3>
          </div>
        </div>

        {/* Preview area */}
        <div className="modal-preview">
          <span>{cfg.emoji}</span>
          {item.type === "video" && (
            <>Video player would render here.<br />Supports HLS streaming & playback tracking.</>
          )}
          {item.type === "pdf" && (
            <>PDF viewer would render here.<br />Supports annotations & download tracking.</>
          )}
          {item.type === "quiz" && (
            <>Quiz engine would load here.<br />{item.questions} questions · Timed assessment.</>
          )}
          {item.type === "assignment" && (
            <>Assignment submission form.<br />Due: {item.due || "TBD"} · Upload files or enter code.</>
          )}
          {item.type === "lab" && (
            <>Interactive lab environment.<br />Duration: {item.duration || "N/A"}</>
          )}
        </div>

        {/* Actions */}
        <div className="modal-actions">
          {item.type === "assignment" && item.status === "not_started" && (
            <button className="btn-primary">Start Assignment</button>
          )}
          {item.type === "quiz" && item.status !== "completed" && (
            <button className="btn-primary">Start Quiz</button>
          )}
          {item.type === "video" && (
            <button className="btn-primary">▶ Watch Video</button>
          )}
          {item.type === "pdf" && (
            <button className="btn-primary">Open PDF</button>
          )}
          {item.type === "lab" && (
            <button className="btn-primary">Launch Lab</button>
          )}
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
