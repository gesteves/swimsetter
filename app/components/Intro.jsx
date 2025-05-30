import Card from './Card';

export default function Intro() {
  return (
    <Card>
      <ul className="text-gray-700 dark:text-gray-200 text-base space-y-3 list-disc list-inside">
        <li><strong>Set the pace</strong> on your Endless Pool (or other swim spa).</li>
        <li><strong>Put your phone in a waterproof case</strong> and leave it on the side of the pool.</li>
        <li><strong>Start a timer or stopwatch</strong> on your watch.</li>
        <li><strong>Swim!</strong></li>
        <li>Whenever you stop, <strong>tap “Add Set”</strong> and enter the duration and pace of your last set.</li>
        <li>When you’re done, <strong>enter the details</strong> in your workout log or Strava activity.</li>
      </ul>
    </Card>
  );
}
