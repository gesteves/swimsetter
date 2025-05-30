import Card from './Card';
import Stat from './Stat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faClipboardCheck, faClock, faRuler, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function WorkoutStats({ stats, onCopy, useYards }) {
  const [copied, setCopied] = useState(false);
  const unit = useYards ? 'yd' : 'm';

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      footer={
        <button
          className="text-sm transition-colors text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          onClick={handleCopy}
        >
          <FontAwesomeIcon icon={copied ? faClipboardCheck : faClipboard} className="mr-1" />
          {copied ? "Copied to clipboard!" : "Copy to clipboard"}
        </button>
      }
    >
      <div className="flex flex-row justify-between items-stretch gap-1 sm:gap-2">
        <Stat
          icon={faClock}
          label="Total Time"
          value={stats.totalTime}
        />
        <Stat
          icon={faRuler}
          label="Distance"
          value={`${stats.totalDistance.toLocaleString()} ${unit}`}
        />
        <Stat
          icon={faStopwatch}
          label="Avg Pace"
          value={stats.totalDistance > 0 ? `${stats.avgPace} ${unit}` : "—"}
        />
      </div>
    </Card>
  );
} 
