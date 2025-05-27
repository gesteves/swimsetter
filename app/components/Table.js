export function Table({ children, className = "" }) {
  return (
    <table className={`min-w-full divide-y divide-gray-300 ${className}`}>
      {children}
    </table>
  );
}

export function TableHeader({ children, className = "" }) {
  return (
    <thead>
      <tr>
        {children}
      </tr>
    </thead>
  );
}

export function TableHeaderCell({ children, className = "" }) {
  return (
    <th className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ${className}`}>
      {children}
    </th>
  );
}

export function TableBody({ children, className = "" }) {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
}

export function TableCell({ children, className = "" }) {
  return (
    <td className={`py-4 px-3 text-sm text-gray-900 ${className}`}>
      {children}
    </td>
  );
} 
