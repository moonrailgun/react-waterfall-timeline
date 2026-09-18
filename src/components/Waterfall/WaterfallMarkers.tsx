import { Fragment } from 'react';
import type { TimeRange, WaterfallMarker } from './types';
import { timeToPercent } from './utils';

export const MARKER_LABEL_ROW_HEIGHT = 20;
// ponytail: labels past this many rows reuse rows and may overlap; pack by measured width if dense marker sets need it.
export const MAX_MARKER_LABEL_ROWS = 4;

export function WaterfallMarkers({
  markers,
  timeRange,
  showLabels = false,
}: {
  markers: WaterfallMarker[];
  timeRange: TimeRange;
  showLabels?: boolean;
}) {
  let labelRow = 0;

  return (
    <div
      className="waterfall-markers"
      aria-hidden={showLabels ? undefined : true}
    >
      {markers.map((marker) => {
        const left = timeToPercent(marker.time, timeRange);

        return (
          <Fragment key={marker.id}>
            <div
              className="waterfall-marker"
              style={{ left: `${left}%`, color: marker.color ?? '#e11d48' }}
            />
            {showLabels && marker.label && (
              <span
                className="waterfall-marker-label"
                title={marker.label}
                style={{
                  color: marker.color ?? '#e11d48',
                  top:
                    (labelRow++ % MAX_MARKER_LABEL_ROWS) *
                      MARKER_LABEL_ROW_HEIGHT +
                    2,
                  ...(left > 50
                    ? {
                        right: `calc(${100 - left}% + 4px)`,
                        maxWidth: `calc(${left}% - 8px)`,
                      }
                    : {
                        left: `calc(${left}% + 4px)`,
                        maxWidth: `calc(${100 - left}% - 8px)`,
                      }),
                }}
              >
                {marker.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
