import React, { useMemo, useState, useRef } from 'react';
import type { WaterfallProps } from './types';
import { calculateTimeRange, formatTime } from './utils';
import { WaterfallRuler } from './WaterfallRuler';
import { WaterfallItem } from './WaterfallItem';
import './Waterfall.css';

/**
 * Waterfall timeline component for visualizing time-based data
 * Similar to Chrome DevTools Network panel
 */
export const Waterfall: React.FC<WaterfallProps> = ({
  items,
  labelWidth = 200,
  rowHeight = 32,
  rulerHeight = 40,
  onItemClick,
  onLabelClick,
  onItemHover,
  renderTooltip,
  className = '',
}) => {
  const timeRange = useMemo(() => calculateTimeRange(items), [items]);

  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    time: number;
  } | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleHeaderTimelineMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!timelineRef.current || timeRange.duration === 0) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < 0 || x > rect.width) {
      setCursorPosition(null);
      return;
    }

    const percentage = x / rect.width;
    const time = timeRange.min + percentage * timeRange.duration;

    setCursorPosition({ x, time });
  };

  const handleBodyMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bodyRef.current || timeRange.duration === 0) return;

    const bodyRect = bodyRef.current.getBoundingClientRect();

    const mouseX = e.clientX;

    const timelineStartX = bodyRect.left + labelWidth;
    const timelineEndX = bodyRect.right;

    if (mouseX < timelineStartX || mouseX > timelineEndX) {
      setCursorPosition(null);
      return;
    }

    const x = mouseX - timelineStartX;
    const timelineWidth = timelineEndX - timelineStartX;
    const percentage = x / timelineWidth;
    const time = timeRange.min + percentage * timeRange.duration;

    setCursorPosition({ x, time });
  };

  const handleTimelineMouseLeave = () => {
    setCursorPosition(null);
  };

  return (
    <div className={`waterfall-container ${className}`}>
      <div className="waterfall-header">
        <div
          className="waterfall-header-label"
          style={
            {
              '--label-width': `${labelWidth}px`,
            } as React.CSSProperties
          }
        >
          <span className="waterfall-header-label-text">Name</span>
        </div>
        <div
          className="waterfall-header-timeline"
          ref={timelineRef}
          onMouseMove={handleHeaderTimelineMouseMove}
          onMouseLeave={handleTimelineMouseLeave}
        >
          <WaterfallRuler timeRange={timeRange} height={rulerHeight} />

          {cursorPosition && (
            <>
              <div
                className="waterfall-cursor-line"
                style={{ left: `${cursorPosition.x}px` }}
              />
              <div
                className="waterfall-cursor-time"
                style={{ left: `${cursorPosition.x}px` }}
              >
                {formatTime(cursorPosition.time - timeRange.min)}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="waterfall-body-wrapper">
        <div
          className="waterfall-body"
          ref={bodyRef}
          onMouseMove={handleBodyMouseMove}
          onMouseLeave={handleTimelineMouseLeave}
        >
          {items.length === 0 ? (
            <div className="waterfall-empty">No items to display</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="waterfall-row"
                style={
                  {
                    '--label-width': `${labelWidth}px`,
                  } as React.CSSProperties
                }
              >
                <WaterfallItem
                  item={item}
                  timeRange={timeRange}
                  height={rowHeight}
                  onItemClick={onItemClick}
                  onLabelClick={onLabelClick}
                  onHover={onItemHover}
                  renderTooltip={renderTooltip}
                />
              </div>
            ))
          )}
        </div>

        {cursorPosition && (
          <div
            className="waterfall-cursor-line-body"
            style={{ left: `${labelWidth + cursorPosition.x}px` }}
          />
        )}
      </div>
    </div>
  );
};
