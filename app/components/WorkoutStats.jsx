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
      footerButton={{
        label: copied ? "Copied to clipboard!" : "Copy to clipboard",
        onClick: handleCopy,
        icon: copied ? faClipboardCheck : faClipboard,
      }}
    >
      <div className="flex flex-row justify-between items-stretch gap-1 sm:gap-2">
        <Stat
          icon={faClock}
          label="Time"
          value={stats.totalTime}
        />
        <Stat
          icon={faRuler}
          label="Distance"
          value={`${stats.totalDistance.toLocaleString()} ${unit}`}
        />
        <Stat
          icon={faStopwatch}
          label="Pace"
          value={stats.totalDistance > 0 ? `${stats.avgPace} ${unit}` : "—"}
        />
      </div>
    </Card>
  );
}
