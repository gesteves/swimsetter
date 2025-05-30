import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Card({ children, footer, footerButton, className = "" }) {
  const variantClasses = {
    default: "text-blue-600 hover:text-blue-500",
    danger: "text-red-600 hover:text-red-500",
  };

  return (
    <div className={`divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm ${className}`}>
      <div className="p-4 sm:p-6">{children}</div>

      {(footer || footerButton) && (
        <div className={`${footerButton ? "px-4 py-1" : "p-4"} flex items-center justify-center`}>
          {footer ? (
            footer
          ) : (
            <button
              onClick={footerButton.onClick}
              className={`text-sm w-full py-2 transition-colors ${
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
