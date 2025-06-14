import { useState } from "react";

function TruncatedText({ text, limit = 20 }) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = text.length > limit;

  const displayText =
    !shouldTruncate || expanded ? text : text.slice(0, limit) + "...";

  return (
    <span
      onClick={() => shouldTruncate && setExpanded((prev) => !prev)}
      title={
        shouldTruncate
          ? expanded
            ? "Click to collapse"
            : "Click to expand"
          : ""
      }
      className={`text-sm text-gray-700 ${
        shouldTruncate ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {displayText}
    </span>
  );
}

export default TruncatedText;
