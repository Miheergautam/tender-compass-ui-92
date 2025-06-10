import React, { useRef, useState, useCallback } from "react";

const DualRangeSlider = ({
  value,
  onValueChange,
  min,
  max,
  step,
  className,
}) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(null);

  const handleMouseDown = (thumb) => (e) => {
    e.preventDefault();
    setIsDragging(thumb);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width)
      );
      const rawValue = percentage * (max - min) + min;
      const snappedValue = Math.round(rawValue / step) * step;

      if (isDragging === "lower") {
        const newLowerLimit = Math.min(snappedValue, value[1] - step);
        onValueChange([Math.max(min, newLowerLimit), value[1]]);
      } else if (isDragging === "upper") {
        const newUpperLimit = Math.max(snappedValue, value[0] + step);
        onValueChange([value[0], Math.min(max, newUpperLimit)]);
      }
    },
    [isDragging, value, min, max, step, onValueChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const lowerPercentage = ((value[0] - min) / (max - min)) * 100;
  const upperPercentage = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className={`relative ${className}`}>
      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
      >
        {/* Active Range */}
        <div
          className="absolute h-2 bg-black rounded-full"
          style={{
            left: `${lowerPercentage}%`,
            width: `${upperPercentage - lowerPercentage}%`,
          }}
        />

        {/* Lower Limit Thumb */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-black rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:scale-110 transition-transform z-10"
          style={{ left: `${lowerPercentage}%` }}
          onMouseDown={handleMouseDown("lower")}
        >
          <div className="absolute inset-1 bg-black rounded-full"></div>
        </div>

        {/* Upper Limit Thumb */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-black rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:scale-110 transition-transform z-10"
          style={{ left: `${upperPercentage}%` }}
          onMouseDown={handleMouseDown("upper")}
        >
          <div className="absolute inset-1 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export default DualRangeSlider;
