import Card from './Card';
import Stat from './Stat';
import { faClipboard, faClipboardCheck, faClock, faRuler, faStopwatch } from '@fortawesome/pro-solid-svg-icons';
import { useConfirmation } from '../utils/useConfirmation';

export default function WorkoutStats({ stats, onCopy, useYards }) {
  const { confirming: copied, arm } = useConfirmation();
  const unit = useYards ? 'yd' : 'm';

  const handleCopy = () => {
    onCopy();
    arm();
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
