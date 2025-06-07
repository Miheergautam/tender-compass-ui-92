import React from "react";

interface TwoColumnFlagTableProps {
  content: string;
}

const TwoColumnFlagTable: React.FC<TwoColumnFlagTableProps> = ({ content }) => {
  if (!content || content.trim() === "") {
    return (
      <p className="text-gray-700 mb-2 leading-relaxed text-sm">
        Not available
      </p>
    );
  }

  const renderTable = (markdown: string) => {
    const lines = markdown.split("\n");
    const tableLines = lines.filter((line) => line.trim().startsWith("|"));

    const filtered = tableLines.filter(
      (row) => row.trim() !== "" && !row.includes("---")
    );

    if (filtered.length < 2) return null;

    const headers = filtered[0]
      .split("|")
      .map((h) => h.trim())
      .filter((h) => h !== "");

    const rows = filtered.slice(1).map((row) =>
      row
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell !== "")
    );

    const maxCols = Math.max(...rows.map((r) => r.length));
    const normalizedRows = rows.map((row) => {
      const copy = [...row];
      while (copy.length < maxCols) copy.push("");
      return copy;
    });

    return (
      <div className="overflow-x-auto mb-6 rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {headers.map((header, i) => {
                let customBg = "";
                let textColor = "";

                if (i === 0) {
                  // Subtle red gradient (like your green one but red tinted)
                  customBg =
                    "bg-[linear-gradient(to_right,rgba(255,244,244,1),rgba(255,250,250,1))]";
                  textColor = "text-red-800";
                } else if (i === 1) {
                  // Soft minty gradient like your screenshot
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
            {normalizedRows.map((row, i) => (
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

  return <>{renderTable(content)}</>;
};

export default TwoColumnFlagTable;
