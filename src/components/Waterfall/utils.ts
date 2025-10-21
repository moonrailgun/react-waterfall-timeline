import type { TimeRange, RulerTick, WaterfallItem } from './types';

/**
 * Calculate the time range from waterfall items
 */
export function calculateTimeRange(items: WaterfallItem[]): TimeRange {
  if (items.length === 0) {
    return { min: 0, max: 0, duration: 0 };
  }

  const min = Math.min(...items.map((item) => item.startTime));
  const max = Math.max(...items.map((item) => item.endTime));
  const duration = max - min;

  return { min, max, duration };
}

/**
 * Format time value to human-readable string
 */
export function formatTime(ms: number): string {
  if (ms < 1) {
    return `${(ms * 1000).toFixed(0)}μs`;
  }
  if (ms < 1000) {
    return `${ms.toFixed(0)}ms`;
  }
  if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)}s`;
  }
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Calculate appropriate tick interval based on time range
 */
function getTickInterval(duration: number): number {
  // Define possible intervals in milliseconds
  const intervals = [
    1, 2, 5, 10, 20, 50, 100, 200, 500, // milliseconds
    1000, 2000, 5000, 10000, 20000, 50000, // seconds
    60000, 120000, 300000, 600000, // minutes
  ];

  // Target around 5-10 ticks
  const targetTicks = 8;
  const idealInterval = duration / targetTicks;

  // Find the closest interval
  let bestInterval = intervals[0];
  for (const interval of intervals) {
    if (interval >= idealInterval) {
      bestInterval = interval;
      break;
    }
    bestInterval = interval;
  }

  return bestInterval;
}

/**
 * Generate ruler tick marks
 */
export function generateRulerTicks(timeRange: TimeRange): RulerTick[] {
  const { min, max, duration } = timeRange;

  if (duration === 0) {
    return [{ time: min, position: 0, label: formatTime(0) }];
  }

  const interval = getTickInterval(duration);
  const ticks: RulerTick[] = [];

  // Start from the first tick that's >= min
  const firstTick = Math.ceil(min / interval) * interval;

  for (let time = firstTick; time <= max; time += interval) {
    const position = ((time - min) / duration) * 100;
    ticks.push({
      time,
      position,
      label: formatTime(time - min),
    });
  }

  // Always add the start position if not already included
  if (ticks.length === 0 || ticks[0].position > 0.1) {
    ticks.unshift({
      time: min,
      position: 0,
      label: formatTime(0),
    });
  }

  return ticks;
}

/**
 * Calculate the position and width of a timeline bar
 */
export function calculateBarPosition(
  startTime: number,
  endTime: number,
  timeRange: TimeRange
): { left: number; width: number } {
  const { min, duration } = timeRange;

  if (duration === 0) {
    return { left: 0, width: 100 };
  }

  const left = ((startTime - min) / duration) * 100;
  const right = ((endTime - min) / duration) * 100;
  const width = right - left;

  return { left, width };
}
