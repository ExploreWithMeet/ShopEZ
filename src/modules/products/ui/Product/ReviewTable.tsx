import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

const ReviewTable = () => {
  return (
    <div className="border h-fit rounded-lg overflow-hidden">
      <Table className="w-3xs">
        <TableHeader className="bg-primary/8">
          <TableRow>
            <TableHead className="flex items-center text-md">
              <Star
                size={16}
                className="mr-2 stroke-yellow-400 fill-yellow-400"
              />
              Reviews: 3.7 (12 people)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold">5 stars</span>
                <Progress value={67} />
                <p className="text-muted-foreground">67%</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold">4 stars</span>
                <Progress value={23} />
                <p className="text-muted-foreground">23%</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold">3 stars</span>
                <Progress value={6} />
                <p className="text-muted-foreground">6%</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold">2 stars</span>
                <Progress value={3} />
                <p className="text-muted-foreground">3%</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2.5">
                <span className="font-semibold">1 star</span>
                <Progress value={2} className="ml-2.5" />
                <p className="text-muted-foreground">2%</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewTable;
