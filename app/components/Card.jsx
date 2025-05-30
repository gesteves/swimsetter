import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Card({ children, footer, footerButton, className = "", withDividers = false }) {
  const variantClasses = {
    default: "text-blue-600 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900",
    danger: "text-red-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900",
  };

  return (
    <div className={`divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm ${className}`}>
      {withDividers ? children : <div className="p-4 sm:p-6">{children}</div>}

      {(footer || footerButton) && (
        <div className={`${footerButton ? "p-1" : "p-4"} flex items-center justify-center`}>
          {footer ? (
            footer
          ) : (
            <button
              onClick={footerButton.onClick}
              className={`text-sm w-full p-2 rounded-md transition-colors cursor-pointer ${
                variantClasses[footerButton.variant || "default"]
              }`}
            >
              {footerButton.icon && <FontAwesomeIcon icon={footerButton.icon} className="mr-1" />}
              {footerButton.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
