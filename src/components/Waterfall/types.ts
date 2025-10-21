import React from 'react';

// Core data type for waterfall timeline item
export interface WaterfallItem {
  /** Unique identifier for the item */
  id: string;
  /** Display name shown on the left side */
  name: string;
  /** Start time in milliseconds (optional - if not provided, item won't show on timeline) */
  startTime?: number;
  /** End time in milliseconds (optional - if not provided, will show as dashed line) */
  endTime?: number;
  /** Optional color for the timeline bar */
  color?: string;
}

// Callback function types
export type OnItemClickCallback = (item: WaterfallItem) => void;
export type OnItemHoverCallback = (item: WaterfallItem | null) => void;

// Tooltip render function type
export type RenderTooltipCallback = (item: WaterfallItem, position: { x: number; y: number }) => React.ReactNode;

// Main component props
export interface WaterfallProps {
  /** Array of waterfall items to display */
  items: WaterfallItem[];
  /** Width of the left label column in pixels */
  labelWidth?: number;
  /** Height of each row in pixels */
  rowHeight?: number;
  /** Height of the ruler in pixels */
  rulerHeight?: number;
  /** Called when an item is clicked */
  onItemClick?: OnItemClickCallback;
  /** Called when an item is hovered (null when hover ends) */
  onItemHover?: OnItemHoverCallback;
  /** Custom tooltip render function */
  renderTooltip?: RenderTooltipCallback;
  /** Optional CSS class name */
  className?: string;
}

// Time range calculation result
export interface TimeRange {
  min: number;
  max: number;
  duration: number;
}

// Ruler tick mark
export interface RulerTick {
  time: number;
  position: number; // percentage (0-100)
  label: string;
}
