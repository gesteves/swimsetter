import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';

export default function ButtonCard({ onAddSet }) {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <Card>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-500 hover:shadow-md active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onAddSet}
          >
            <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
            Add Set
          </button>
        </div>
      </Card>
    </div>
  );
} 
