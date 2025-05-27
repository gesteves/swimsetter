import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Card from './Card';

export default function WorkoutSummary({ summary, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!summary) return null;

  return (
    <Card>
      <p className="px-3 py-3.5 text-sm font-semibold text-gray-900">Workout Summary</p>
      <pre className="px-3 py-3.5 text-sm text-gray-600 font-mono whitespace-pre border-t border-b border-gray-300">
        {summary}
      </pre>
      <div className="text-center">
        <button
          className="px-3 py-4 text-sm transition-colors text-blue-600 hover:text-blue-500"
          onClick={handleCopy}
        >
          <FontAwesomeIcon icon={copied ? faClipboardCheck : faClipboard} className="mr-1" />
          {copied ? "Copied to clipboard!" : "Copy to clipboard"}
        </button>
      </div>
    </Card>
  );
} 
