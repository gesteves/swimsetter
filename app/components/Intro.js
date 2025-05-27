import Card from './Card';

export default function Intro() {
  return (
    <Card>
      <ul className="text-gray-700 text-sm space-y-3 list-disc list-inside">
        <li><strong>Set the pace</strong> on your Endless Pool (or other swim spa).</li>
        <li><strong>Open SwimSetter</strong> on your phone, put it in a waterproof pouch or bag, and leave it on the side of the pool.</li>
        <li><strong>Start a timer</strong> or a stopwatch on your watch.</li>
        <li><strong>Swim!</strong></li>
        <li>Whenever you stop, <strong>tap “Add Set”</strong> and record the time and pace.</li>
        <li>When you're done, <strong>copy the details</strong> to your workout log or Strava activity.</li>
      </ul>
    </Card>
  );
}
