import { useState, useRef, useEffect } from "react";

const RangeSlider = ({
  min = 0,
  max = 1000,
  step = 10,
  initialMin = 0,
  initialMax = 10000,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);
  const rangeRef = useRef(null);

  // Convert to percentage
  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, maxValue]);

  // Handle min value change
  const handleMinChange = (e) => {
    const value = Math.min(parseFloat(e.target.value), maxValue - step);
    setMinValue(value);
    onChange?.({ min: value, max: maxValue });
  };

  // Handle max value change
  const handleMaxChange = (e) => {
    const value = Math.max(parseFloat(e.target.value), minValue + step);
    setMaxValue(value);
    onChange?.({ min: minValue, max: value });
  };

  return (
    <div className="w-full">
      <div className="relative h-1 rounded-full bg-gray-300">
        <div ref={rangeRef} className="absolute h-1 rounded-full bg-blue-500" />
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:shadow-md"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:shadow-md"
        />
      </div>
    </div>
  );
};

export default RangeSlider;
