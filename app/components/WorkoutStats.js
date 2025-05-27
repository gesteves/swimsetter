import Card from './Card';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell } from './Table';

export default function WorkoutStats({ stats }) {
  return (
    <Card>
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
              {stats.totalDistance}m
            </TableCell>
            <TableCell>
              {stats.totalDistance > 0 ? stats.avgPace : "–"}
            </TableCell>
          </tr>
        </TableBody>
      </Table>
    </Card>
  );
} 
