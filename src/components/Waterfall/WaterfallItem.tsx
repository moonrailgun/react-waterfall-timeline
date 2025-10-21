import React, { useState, useRef, useEffect } from 'react';
import type { WaterfallItem as WaterfallItemType, TimeRange } from './types';
import { calculateBarPosition, formatTime } from './utils';

export interface WaterfallItemProps {
  item: WaterfallItemType;
  timeRange: TimeRange;
  height: number;
  onClick?: (item: WaterfallItemType) => void;
  onHover?: (item: WaterfallItemType | null) => void;
  renderTooltip?: (
    item: WaterfallItemType,
    position: { x: number; y: number }
  ) => React.ReactNode;
}

/**
 * Calculate smart tooltip position based on actual DOM size to avoid overflow
 */
const calculateTooltipPosition = (
  mouseX: number,
  mouseY: number,
  tooltipWidth: number,
  tooltipHeight: number
): React.CSSProperties => {
  const offset = 10;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Default position: right of cursor
  let left = mouseX + offset;
  let top = mouseY + offset;

  // Check if tooltip would overflow right side
  if (left + tooltipWidth > viewportWidth) {
    // Show on left side of cursor
    left = mouseX - tooltipWidth - offset;
  }

  // Check if tooltip would overflow bottom
  if (top + tooltipHeight > viewportHeight) {
    top = mouseY - tooltipHeight - offset;
  }

  // Ensure tooltip doesn't go off the left edge
  if (left < 0) {
    left = offset;
  }

  // Ensure tooltip doesn't go off the top edge
  if (top < 0) {
    top = offset;
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
  };
};

/**
 * Smart Tooltip component that measures itself and adjusts position
 */
const SmartTooltip: React.FC<{
  children: React.ReactNode;
  position: { x: number; y: number };
}> = ({ children, position }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [computedStyle, setComputedStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    left: `${position.x + 10}px`,
    top: `${position.y + 10}px`,
    opacity: 0, // Hide initially until we calculate position
    pointerEvents: 'none',
  });

  useEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const smartPosition = calculateTooltipPosition(
        position.x,
        position.y,
        rect.width,
        rect.height
      );

      setComputedStyle({
        position: 'fixed',
        ...smartPosition,
        opacity: 1, // Show after calculating position
        pointerEvents: 'none',
      });
    }
  }, [position.x, position.y, children]);

  return (
    <div
      ref={tooltipRef}
      className="waterfall-item-tooltip"
      style={computedStyle}
    >
      {children}
    </div>
  );
};

/**
 * Default tooltip renderer with smart positioning based on actual size
 */
const defaultRenderTooltip = (
  item: WaterfallItemType,
  timeRange: TimeRange
): React.ReactNode => {
  // If no startTime, only show name
  if (item.startTime === undefined) {
    return (
      <div className="waterfall-tooltip-row">
        <span className="waterfall-tooltip-label">Name:</span>
        <span className="waterfall-tooltip-value">{item.name}</span>
      </div>
    );
  }

  const startOffset = item.startTime - timeRange.min;
  const hasEndTime = item.endTime !== undefined;
  const duration = hasEndTime ? item.endTime! - item.startTime : undefined;

  return (
    <>
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
      {hasEndTime && duration !== undefined && (
        <>
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
        </>
      )}
      {!hasEndTime && (
        <div className="waterfall-tooltip-row">
          <span className="waterfall-tooltip-label">Status:</span>
          <span className="waterfall-tooltip-value">In Progress</span>
        </div>
      )}
    </>
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

  // If no startTime, don't show timeline bar
  const hasStartTime = item.startTime !== undefined;
  const hasEndTime = item.endTime !== undefined;

  const { left, width } = hasStartTime
    ? calculateBarPosition(item.startTime!, item.endTime, timeRange)
    : { left: 0, width: 0 };

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
      <div
        className="waterfall-item-label"
        onMouseEnter={hasStartTime ? undefined : handleMouseEnter}
        onMouseMove={hasStartTime ? undefined : handleMouseMove}
        onMouseLeave={hasStartTime ? undefined : handleMouseLeave}
      >
        {item.name}
      </div>
      <div className="waterfall-item-timeline">
        {hasStartTime && (
          <div
            className={`waterfall-item-bar ${isHovered ? 'hovered' : ''} ${!hasEndTime ? 'dashed' : ''}`}
            style={{
              left: `${left}%`,
              width: `${width}%`,
              backgroundColor: hasEndTime ? barColor : undefined,
              color: barColor, // For gradient
            }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          />
        )}
        {isHovered && (
          <SmartTooltip position={tooltipPosition}>
            {renderTooltip
              ? renderTooltip(item, tooltipPosition)
              : defaultRenderTooltip(item, timeRange)}
          </SmartTooltip>
        )}
      </div>
    </div>
  );
};
