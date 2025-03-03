import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import { AdoptionRequest } from "../types/showAdoptRequestType";

interface ShowAdoptRequestProps {
  data: AdoptionRequest[];
  onView: (request: AdoptionRequest) => void;
  onDelete: (id: number) => void;
}

const ShowAdoptRequest = ({ data, onView, onDelete }: ShowAdoptRequestProps) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Adoption Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Mobile No</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.phone_no}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell className="flex gap-2 justify-center">
                {/* View Button */}
                <Button size="icon" variant="outline" onClick={() => onView(request)}>
                  <Eye className="w-4 h-4" />
                </Button>
                {/* Delete Button (only if status is Pending) */}
                {request.status === "pending" && (
                  <Button size="icon" variant="destructive" onClick={() => onDelete(request.id)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowAdoptRequest;
