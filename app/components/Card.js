export default function Card({ children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
} 
