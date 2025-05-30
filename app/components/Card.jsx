export default function Card({ children, footer, className = "" }) {
  return (
    <div className={`divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm ${className}`}>
      <div className="p-4 sm:p-6">
        {children}
      </div>
      {footer && (
        <div className="p-4 flex items-center justify-center">
          {footer}
        </div>
      )}
    </div>
  );
}
