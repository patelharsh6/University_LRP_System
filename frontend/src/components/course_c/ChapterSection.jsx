// src/components/course/ChapterSection.jsx
// Collapsible chapter with content items inside

import { useState } from "react";
import Icon from "./Icon";
import ContentItem from "./ContentItem";

export default function ChapterSection({ chapter, defaultOpen = false, onItemOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  const done = chapter.items.filter(
    (i) => i.status === "completed" || i.status === "submitted"
  ).length;
  const total = chapter.items.length;
  const pct = Math.round((done / total) * 100);

  const isFullyDone = pct === 100;
  const isLocked = !chapter.unlocked;

  const numberClass = isLocked
    ? "chapter-number--locked"
    : isFullyDone
    ? "chapter-number--done"
    : "chapter-number--active";

  const handleToggle = () => {
    if (!isLocked) setOpen((o) => !o);
  };

  return (
    <div className="chapter-section">
      {/* Header */}
      <div
        className={`chapter-header ${isLocked ? "chapter-header--locked" : ""}`}
        onClick={handleToggle}
      >
        {/* Number / icon */}
        <div className={`chapter-number ${numberClass}`}>
          {isLocked ? (
            <Icon name="lock" size={14} color="#9aa0a6" />
          ) : isFullyDone ? (
            <Icon name="check" size={16} color="#2196f3" />
          ) : (
            chapter.order
          )}
        </div>

        {/* Info */}
        <div className="chapter-info">
          <h3>
            Chapter {chapter.order}: {chapter.title}
          </h3>
          <p>
            {done}/{total} items completed · {pct}%
          </p>
        </div>

        {/* Mini progress bar */}
        <div className="chapter-mini-progress">
          <div className="progress-bar-track">
            <div
              className={`progress-bar-fill ${
                isFullyDone ? "progress-bar-fill--completed" : "progress-bar-fill--in_progress"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Chevron */}
        {!isLocked && (
          <div className={`chapter-chevron ${open ? "open" : ""}`}>
            <Icon name="chevron" size={18} color="#9aa0a6" />
          </div>
        )}
      </div>

      {/* Items */}
      {open && !isLocked && (
        <div className="chapter-items">
          {chapter.items.map((item) => (
            <ContentItem key={item.id} item={item} onOpen={onItemOpen} />
          ))}
        </div>
      )}
    </div>
  );
}
