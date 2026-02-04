import React from 'react';
import { Slider } from '@/components/ui/slider';
import { useTimeFilter } from '@/contexts/TimeFilterContext';
import { Calendar, RotateCcw } from 'lucide-react';

export const TimeSlider: React.FC = () => {
  const { yearRange, setYearRange, minYear, maxYear, resetYearRange } = useTimeFilter();

  const handleSliderChange = (values: number[]) => {
    if (values.length === 2) {
      setYearRange([values[0], values[1]]);
    }
  };

  const isFiltered = yearRange[0] !== minYear || yearRange[1] !== maxYear;

  return (
    <div className="w-full bg-card rounded-xl border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Time Period Filter
            </h3>
            <p className="text-sm text-muted-foreground">
              Adjust the year range to filter historical data
            </p>
          </div>
        </div>
        {isFiltered && (
          <button
            onClick={resetYearRange}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-semibold min-w-[60px] text-center">
            {yearRange[0]}
          </span>
          <div className="flex-1 mx-4 h-px bg-border" />
          <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-semibold min-w-[60px] text-center">
            {yearRange[1]}
          </span>
        </div>

        <Slider
          value={yearRange}
          onValueChange={handleSliderChange}
          min={minYear}
          max={maxYear}
          step={1}
          minStepsBetweenThumbs={1}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{minYear}</span>
          <span className="text-center">
            {yearRange[1] - yearRange[0] + 1} years selected
          </span>
          <span>{maxYear}</span>
        </div>
      </div>
    </div>
  );
};
