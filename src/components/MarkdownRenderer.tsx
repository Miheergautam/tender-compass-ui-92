
import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  const renderMarkdownContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentTable: string[] = [];
    let inTable = false;
    let listItems: JSX.Element[] = [];
    let inList = false;

    const processLine = (line: string, index: number) => {
      const trimmedLine = line.trim();

      // Handle tables
      if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
        if (!inTable) {
          if (inList) {
            elements.push(<ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4">{listItems}</ul>);
            listItems = [];
            inList = false;
          }
          inTable = true;
          currentTable = [];
        }
        currentTable.push(line);
        return;
      }

      // Process accumulated table
      if (inTable && currentTable.length > 0) {
        const tableRows = currentTable.filter(row => row.trim() !== '' && !row.includes('---'));
        if (tableRows.length > 1) {
          const headers = tableRows[0].split('|').map(h => h.trim()).filter(h => h !== '');
          const rows = tableRows.slice(1).map(row => 
            row.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
          );

          elements.push(
            <div key={`table-${index}`} className="overflow-x-auto mb-6 rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-50 to-blue-50">
                    {headers.map((header, i) => (
                      <th key={i} className="border border-gray-300 p-3 text-left font-semibold text-gray-700 text-xs">
                        {header.replace(/\*\*/g, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      {row.map((cell, j) => (
                        <td key={j} className="border border-gray-300 p-2 text-xs">
                          <span dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        currentTable = [];
        inTable = false;
      }

      // Handle list items
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        if (!inList) {
          inList = true;
        }
        const content = trimmedLine.replace(/^[-*]\s/, '');
        listItems.push(
          <li key={`li-${index}`} className="text-gray-700 text-sm">
            <span dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        );
        return;
      }

      // Process accumulated list
      if (inList && listItems.length > 0) {
        elements.push(<ul key={`list-${index}`} className="list-disc list-inside space-y-1 mb-4 ml-4">{listItems}</ul>);
        listItems = [];
        inList = false;
      }

      // Handle other content
      if (trimmedLine) {
        if (trimmedLine.startsWith('### ')) {
          elements.push(
            <h3 key={index} className="text-lg font-bold text-teal-700 mb-3 mt-6 border-b border-teal-200 pb-2">
              {trimmedLine.replace('### ', '')}
            </h3>
          );
        } else if (trimmedLine.startsWith('#### ')) {
          elements.push(
            <h4 key={index} className="text-md font-semibold text-gray-800 mb-2 mt-4">
              {trimmedLine.replace('#### ', '')}
            </h4>
          );
        } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
          elements.push(
            <p key={index} className="font-semibold text-gray-800 mb-2 text-sm">
              {trimmedLine.replace(/\*\*/g, '')}
            </p>
          );
        } else if (trimmedLine.startsWith('*Note:') || trimmedLine.startsWith('*Sources:')) {
          elements.push(
            <p key={index} className="text-xs text-gray-600 italic mb-2 bg-gray-50 p-2 rounded">
              {trimmedLine.replace(/^\*/, '')}
            </p>
          );
        } else if (trimmedLine !== '') {
          elements.push(
            <p key={index} className="text-gray-700 mb-2 leading-relaxed text-sm">
              <span dangerouslySetInnerHTML={{ 
                __html: trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
              }} />
            </p>
          );
        }
      }
    };

    lines.forEach(processLine);

    // Handle any remaining lists or tables
    if (inList && listItems.length > 0) {
      elements.push(<ul key="final-list" className="list-disc list-inside space-y-1 mb-4 ml-4">{listItems}</ul>);
    }

    if (inTable && currentTable.length > 0) {
      const tableRows = currentTable.filter(row => row.trim() !== '' && !row.includes('---'));
      if (tableRows.length > 1) {
        const headers = tableRows[0].split('|').map(h => h.trim()).filter(h => h !== '');
        const rows = tableRows.slice(1).map(row => 
          row.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
        );

        elements.push(
          <div key="final-table" className="overflow-x-auto mb-6 rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-teal-50 to-blue-50">
                  {headers.map((header, i) => (
                    <th key={i} className="border border-gray-300 p-3 text-left font-semibold text-gray-700 text-xs">
                      {header.replace(/\*\*/g, '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className="border border-gray-300 p-2 text-xs">
                        <span dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    return elements;
  };

  return (
    <div className={`prose-sm max-w-none ${className}`}>
      {renderMarkdownContent(content)}
    </div>
  );
};

export default MarkdownRenderer;
