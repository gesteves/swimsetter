export default function Card({ children, footer, className = "" }) {
  return (
    <div className={`divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm ${className}`}>
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-4 flex items-center justify-center">
          {footer}
        </div>
      )}
    </div>
  );
} 
