import React from "react";

interface CompatibilityAnalysisRendererProps {
  content: string;
}

const CompatibilityAnalysisRenderer: React.FC<
  CompatibilityAnalysisRendererProps
> = ({ content }) => {
  if (!content || content.trim() === "") {
    return (
      // <p className="text-gray-700 mb-2 leading-relaxed text-sm">
      //   Not available
      // </p>
      ""
    );
  }

  const renderContent = (content: string) => {
    // Check if content looks like a table (has | and multiple lines or || separators)
    const isTable =
      content.includes("|") &&
      (content.includes("||") || content.split("\n").length > 1);

    if (!isTable) {
      // Render as plain text with basic formatting
      return (
        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          <span
            dangerouslySetInnerHTML={{
              __html: content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        </div>
      );
    }

    // Table rendering logic

    let lines;
    if (content.includes("||")) {
      // Split by || and clean up
      lines = content
        .split("||")
        .map((line) => line.trim())
        .filter((line) => line);
    } else if (content.includes("\n")) {
      lines = content.split("\n");
    } else {
      lines = [content];
    }

    // Filter out separator lines but keep all content lines
    const filtered = lines.filter(
      (line) =>
        line.trim() !== "" &&
        !line.includes("---") &&
        !line.match(/^\|?\s*-+\s*\|/)
    );

    if (filtered.length < 1) {
      return <p className="text-gray-500">No table data found</p>;
    }

    // Extract headers from first line
    const headerLine = filtered[0];
    const headers = headerLine
      .split("|")
      .map((h) => h.trim())
      .filter((h) => h !== "");

    // Process data rows - combine all remaining content
    const dataRows = [];

    // Join all remaining lines and split by | to get individual cells
    const remainingContent = filtered.slice(1).join(" | ");

    // Split by | and group into pairs (red flag, green flag)
    const cells = remainingContent
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell !== "");

    // Group cells into rows of 2 (red flag, green flag)
    for (let i = 0; i < cells.length; i += 2) {
      if (i + 1 < cells.length) {
        dataRows.push([cells[i], cells[i + 1]]);
      } else if (cells[i]) {
        // Handle odd number of cells
        dataRows.push([cells[i], ""]);
      }
    }

    if (dataRows.length === 0) {
      return <p className="text-gray-500">No data rows found</p>;
    }

    return (
      <div className="overflow-x-auto mb-6 rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {headers.map((header, i) => {
                let customBg = "";
                let textColor = "";

                if (i === 0) {
                  // Subtle red gradient
                  customBg =
                    "bg-[linear-gradient(to_right,rgba(255,244,244,1),rgba(255,250,250,1))]";
                  textColor = "text-red-800";
                } else if (i === 1) {
                  // Soft minty gradient
                  customBg = "bg-[linear-gradient(to_right,#F0FCFA,#ECF8FF)]";
                  textColor = "text-emerald-800";
                }

                return (
                  <th
                    key={i}
                    className={`border border-gray-300 p-3 text-left font-semibold text-xs ${customBg} ${textColor}`}
                  >
                    {header.replace(/\*\*/g, "")}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="border border-gray-300 p-2 text-xs align-top"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: cell.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>"
                        ),
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <>{renderContent(content)}</>;
};

export default CompatibilityAnalysisRenderer;
