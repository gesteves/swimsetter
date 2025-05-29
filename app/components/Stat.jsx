import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Stat({ icon, label, value }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-blue-50 rounded-lg py-4">
      <FontAwesomeIcon icon={icon} className="text-blue-600 mb-2" size="lg" />
      <div className="text-gray-500 text-sm font-medium">{label}</div>
      <div className="text-black text-xl sm:text-lg font-bold mt-1">{value}</div>
    </div>
  );
} 
