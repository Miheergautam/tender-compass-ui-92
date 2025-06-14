import React from "react";

type Props = {
  content: string;
};

const BOQRenderer: React.FC<Props> = ({ content }) => {
  const lines = content.trim().split("\n");

  let title = "";
  let totalCost = "";
  let headers: string[] = [];
  const rows: string[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("###") && title === "") {
      title = line.replace(/^#+\s*/, "");
    } else if (line.startsWith("|") && line.includes("|---")) {
      continue; // Skip divider
    } else if (line.startsWith("|")) {
      const cells = line
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean);

      if (headers.length === 0) headers = cells;
      else rows.push(cells);
    } else if (line.startsWith("### Total Project Cost")) {
      totalCost = line.replace(/^#+\s*Total Project Cost:\s*/, "");
    }
  }

  return (
    <div className="p-4 border rounded bg-white shadow-sm space-y-4">
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">
          {title}
        </h2>
      )}

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((head, i) => (
                <th
                  key={i}
                  className="px-3 py-2 border border-gray-300 font-medium"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-gray-50">
                {headers.map((_, cIdx) => (
                  <td key={cIdx} className="px-3 py-2 border border-gray-200">
                    {row[cIdx] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalCost && (
        <div className="text-right text-sm text-gray-600 italic pt-2 border-t">
          Total Project Cost: <span className="font-semibold">{totalCost}</span>
        </div>
      )}
    </div>
  );
};

export default BOQRenderer;
