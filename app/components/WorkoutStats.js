import Card from './Card';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell } from './Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function WorkoutStats({ stats, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      footer={
        <button
          className="text-sm transition-colors text-blue-600 hover:text-blue-500"
          onClick={handleCopy}
        >
          <FontAwesomeIcon icon={copied ? faClipboardCheck : faClipboard} className="mr-1" />
          {copied ? "Copied to clipboard!" : "Copy to clipboard"}
        </button>
      }
    >
      <Table>
        <TableHeader>
          <TableHeaderCell>Sets</TableHeaderCell>
          <TableHeaderCell>Time</TableHeaderCell>
          <TableHeaderCell>Distance</TableHeaderCell>
          <TableHeaderCell>Pace</TableHeaderCell>
        </TableHeader>
        <TableBody>
          <tr>
            <TableCell>
              {stats.setCount}
            </TableCell>
            <TableCell>
              {stats.totalTime}
            </TableCell>
            <TableCell>
              {stats.totalDistance.toLocaleString()} m
            </TableCell>
            <TableCell>
              {stats.totalDistance > 0 ? stats.avgPace : "—"}
            </TableCell>
          </tr>
        </TableBody>
      </Table>
    </Card>
  );
} 
