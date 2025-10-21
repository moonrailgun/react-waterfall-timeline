import React from 'react';
import type { TimeRange } from './types';
import { generateRulerTicks } from './utils';

export interface WaterfallRulerProps {
  timeRange: TimeRange;
  height: number;
}

/**
 * Ruler component that displays time scale with tick marks
 */
export const WaterfallRuler: React.FC<WaterfallRulerProps> = ({
  timeRange,
  height,
}) => {
  const ticks = generateRulerTicks(timeRange);

  return (
    <div className="waterfall-ruler" style={{ height: `${height}px` }}>
      <div className="waterfall-ruler-ticks">
        {ticks.map((tick, index) => (
          <div
            key={index}
            className="waterfall-ruler-tick"
            style={{ left: `${tick.position}%` }}
          >
            <div className="waterfall-ruler-tick-line" />
            <div className="waterfall-ruler-tick-label">{tick.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
