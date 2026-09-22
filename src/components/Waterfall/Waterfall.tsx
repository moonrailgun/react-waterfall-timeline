import React, { useMemo, useState, useRef, useEffect } from 'react';
import type {
  WaterfallProps,
  WaterfallGroup,
  WaterfallItem as WaterfallItemType,
} from './types';
import { calculateTimeRange, formatTime } from './utils';
import { WaterfallRuler } from './WaterfallRuler';
import { WaterfallItem } from './WaterfallItem';
import {
  WaterfallMarkers,
  MARKER_LABEL_ROW_HEIGHT,
  MAX_MARKER_LABEL_ROWS,
} from './WaterfallMarkers';
import './Waterfall.css';

/**
 * Waterfall timeline component for visualizing time-based data
 * Similar to Chrome DevTools Network panel
 */
export const Waterfall: React.FC<WaterfallProps> = ({
  items,
  mini = false,
  interactive = true,
  markers,
  groups,
  labelWidth = 200,
  rowHeight = 32,
  rulerHeight = 40,
  onItemClick,
  onLabelClick,
  onItemHover,
  renderTooltip,
  className = '',
}) => {
  const validMarkers = useMemo(
    () => markers?.filter((marker) => Number.isFinite(marker.time)) ?? [],
    [markers]
  );
  const timeRange = useMemo(
    () => calculateTimeRange(items, validMarkers),
    [items, validMarkers]
  );
  const markerLabelHeight =
    Math.min(
      validMarkers.filter((marker) => marker.label).length,
      MAX_MARKER_LABEL_ROWS
    ) * MARKER_LABEL_ROW_HEIGHT;
  const sections = useMemo(() => {
    const grouped = new Map<
      string | undefined,
      { group?: WaterfallGroup; items: WaterfallItemType[] }
    >();
    for (const group of groups ?? []) {
      grouped.set(group.id, { group, items: [] });
    }
    for (const item of items) {
      // null/'' from loosely typed data count as ungrouped.
      const groupId = item.groupId || undefined;
      let section = grouped.get(groupId);
      if (!section) {
        section = {
          group:
            groupId === undefined ? undefined : { id: groupId, name: groupId },
          items: [],
        };
        grouped.set(groupId, section);
      }
      if (mini && item.startTime === undefined) continue;
      section.items.push(item);
    }
    // Ungrouped items follow the named groups, preserving their input order.
    const ungrouped = grouped.get(undefined);
    grouped.delete(undefined);
    if (ungrouped) grouped.set(undefined, ungrouped);
    return [...grouped.values()].filter((section) => section.items.length > 0);
  }, [items, groups, mini]);

  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    time: number;
  } | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const showCursor = !mini && interactive;
  useEffect(() => {
    if (!showCursor) setCursorPosition(null);
  }, [showCursor]);

  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleTimelineMouseLeave = () => {
    setCursorPosition(null);
  };

  return (
    <div
      className={`waterfall-container ${mini ? 'waterfall-mini' : ''} ${interactive ? '' : 'waterfall-static'} ${className}`}
      style={{ '--label-width': `${labelWidth}px` } as React.CSSProperties}
    >
      {!mini && (
        <div className="waterfall-header">
          <div className="waterfall-header-label">
            <span className="waterfall-header-label-text">Name</span>
          </div>
          <div
            className="waterfall-header-timeline"
            style={{ paddingTop: markerLabelHeight }}
            ref={timelineRef}
            onMouseMove={showCursor ? handleTimelineMouseMove : undefined}
            onMouseLeave={showCursor ? handleTimelineMouseLeave : undefined}
          >
            <WaterfallRuler timeRange={timeRange} height={rulerHeight} />
            <WaterfallMarkers
              markers={validMarkers}
              timeRange={timeRange}
              showLabels
            />

            {cursorPosition && (
              <>
                <div
                  className="waterfall-cursor-line"
                  style={{ left: `${cursorPosition.x}px` }}
                />
                <div
                  className="waterfall-cursor-time"
                  style={{
                    left: `${cursorPosition.x}px`,
                    top: markerLabelHeight + 2,
                  }}
                >
                  {formatTime(cursorPosition.time - timeRange.min)}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="waterfall-body-wrapper">
        <div
          className="waterfall-body"
          onMouseMove={showCursor ? handleTimelineMouseMove : undefined}
          onMouseLeave={showCursor ? handleTimelineMouseLeave : undefined}
        >
          <div className="waterfall-rows">
            {items.length === 0
              ? !mini && (
                  <div className="waterfall-empty">No items to display</div>
                )
              : sections.map((section) => (
                  <div
                    key={
                      section.group ? `group:${section.group.id}` : 'ungrouped'
                    }
                    role={section.group ? 'group' : undefined}
                    aria-label={section.group?.name}
                  >
                    {!mini && section.group && (
                      <div
                        className="waterfall-group-header"
                        style={{ color: section.group.color }}
                      >
                        {section.group.name}
                      </div>
                    )}
                    {section.items.map((item) => (
                      <div key={item.id} className="waterfall-row">
                        <WaterfallItem
                          item={item}
                          mini={mini}
                          timeRange={timeRange}
                          height={mini ? 6 : rowHeight}
                          onItemClick={onItemClick}
                          onLabelClick={onLabelClick}
                          onHover={onItemHover}
                          renderTooltip={renderTooltip}
                        />
                      </div>
                    ))}
                  </div>
                ))}
            {!mini && (
              <div className="waterfall-body-markers">
                <WaterfallMarkers
                  markers={validMarkers}
                  timeRange={timeRange}
                />
              </div>
            )}
          </div>
        </div>

        {showCursor && cursorPosition && (
          <div
            className="waterfall-cursor-line-body"
            style={{ left: `${labelWidth + cursorPosition.x}px` }}
          />
        )}
      </div>
    </div>
  );
};
