import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { forwardRef } from 'react';

const ButtonBar = forwardRef(function ButtonBar({ onAddSet }, ref) {
  return (
    <div 
      ref={ref} 
      className="fixed bottom-0 left-0 right-0 bg-white/85 dark:bg-gray-800/85 border-t border-gray-200 dark:border-gray-700 shadow-lg px-4 py-4 flex justify-center supports-backdrop-filter:bg-white/50 supports-backdrop-filter:dark:bg-gray-800/50 supports-backdrop-filter:backdrop-blur-xl"
    >
      <button
        className="cursor-pointer w-full sm:w-auto rounded-lg bg-blue-600 dark:bg-blue-500 px-5 py-2.5 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-500 dark:hover:bg-blue-400 hover:shadow-md active:bg-blue-700 dark:active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 inline-flex items-center justify-center"
        onClick={onAddSet}
      >
        <FontAwesomeIcon 
          icon={faCirclePlus} 
          className="mr-2 w-4 h-4" 
          style={{ minWidth: '1rem' }}
        />
        Add Set
      </button>
    </div>
  );
});

ButtonBar.displayName = "ButtonBar";

export default ButtonBar; 
