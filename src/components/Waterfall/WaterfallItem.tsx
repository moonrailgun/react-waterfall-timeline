import React, { useState } from 'react';
import type { WaterfallItem as WaterfallItemType, TimeRange } from './types';
import { calculateBarPosition, formatTime } from './utils';

export interface WaterfallItemProps {
  item: WaterfallItemType;
  timeRange: TimeRange;
  height: number;
  onClick?: (item: WaterfallItemType) => void;
  onHover?: (item: WaterfallItemType | null) => void;
  renderTooltip?: (item: WaterfallItemType, position: { x: number; y: number }) => React.ReactNode;
}

/**
 * Default tooltip renderer
 */
const defaultRenderTooltip = (
  item: WaterfallItemType,
  position: { x: number; y: number },
  timeRange: TimeRange
): React.ReactNode => {
  const duration = item.endTime - item.startTime;
  const startOffset = item.startTime - timeRange.min;

  return (
    <div
      className="waterfall-item-tooltip"
      style={{
        position: 'fixed',
        left: `${position.x + 10}px`,
        top: `${position.y + 10}px`,
      }}
    >
      <div className="waterfall-tooltip-row">
        <span className="waterfall-tooltip-label">Name:</span>
        <span className="waterfall-tooltip-value">{item.name}</span>
      </div>
      <div className="waterfall-tooltip-row">
        <span className="waterfall-tooltip-label">Start:</span>
        <span className="waterfall-tooltip-value">
          {formatTime(startOffset)}
        </span>
      </div>
      <div className="waterfall-tooltip-row">
        <span className="waterfall-tooltip-label">Duration:</span>
        <span className="waterfall-tooltip-value">
          {formatTime(duration)}
        </span>
      </div>
      <div className="waterfall-tooltip-row">
        <span className="waterfall-tooltip-label">End:</span>
        <span className="waterfall-tooltip-value">
          {formatTime(startOffset + duration)}
        </span>
      </div>
    </div>
  );
};

/**
 * Single waterfall timeline item component
 */
export const WaterfallItem: React.FC<WaterfallItemProps> = ({
  item,
  timeRange,
  height,
  onClick,
  onHover,
  renderTooltip,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const { left, width } = calculateBarPosition(
    item.startTime,
    item.endTime,
    timeRange
  );

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    onHover?.(item);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(null);
  };

  const handleClick = () => {
    onClick?.(item);
  };

  const barColor = item.color || '#cccccc';

  return (
    <div className="waterfall-item" style={{ height: `${height}px` }}>
      <div className="waterfall-item-label">{item.name}</div>
      <div className="waterfall-item-timeline">
        <div
          className={`waterfall-item-bar ${isHovered ? 'hovered' : ''}`}
          style={{
            left: `${left}%`,
            width: `${width}%`,
            backgroundColor: barColor,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
        {isHovered && (
          <>
            {renderTooltip
              ? renderTooltip(item, tooltipPosition)
              : defaultRenderTooltip(item, tooltipPosition, timeRange)}
          </>
        )}
      </div>
    </div>
  );
};
