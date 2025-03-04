import { useState } from "react";
import { DonationRequest } from "../types/showDonationRequestType";
import { useFetchUserDonationsQuery } from "../api/showDonateRequestApi";
import ShowDonateRequest from "../components/ShowDonateRequest";
import ViewDonatePetDialog from "../components/ViewDonatePetDialog";

const ShowDonateRequestContainer = () => {
  const { data, error, isLoading } = useFetchUserDonationsQuery();
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleView = (request: DonationRequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting Donation request with ID: ${id}`);
    // Add delete logic here (API call)
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = "status" in error ? (error.data as any)?.message : "Something went wrong";
    return <p className="text-red-500">{errorMessage}</p>;
  }

  // Extract adoption requests from the response
  const donationRequests: DonationRequest[] = data?.data || [];

  return (
    <>
      <ShowDonateRequest data={donationRequests} onView={handleView} onDelete={handleDelete} />
      {selectedRequest && (
        <ViewDonatePetDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} request={selectedRequest} />
      )}
    </>
  );
};

export default ShowDonateRequestContainer;
