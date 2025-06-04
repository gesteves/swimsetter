import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Stat({ icon, label, value }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-lg py-4">
      <FontAwesomeIcon
        icon={icon}
        className="text-blue-600 dark:text-blue-400 mb-2"
        size="lg"
        aria-hidden="true"
      />
      <div className="text-gray-500 dark:text-gray-400 text-xs font-medium">{label}</div>
      <div className="text-black dark:text-white text-sm sm:text-base font-bold">{value}</div>
    </div>
  );
} 
