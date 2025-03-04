import React from 'react';
import { Eye, Trash, PawPrint, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { DonationRequest, DonationResponse } from '../types/showDonationRequestType';

interface ShowDonateRequestProps {
  response: DonationResponse;
  onView: (request: DonationRequest) => void;
  onDelete: (id: number) => void;
}

const ShowDonateRequest = ({ response, onView, onDelete }: ShowDonateRequestProps) => {
  const navigate = useNavigate();

  // Safely parse user from localStorage
  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  // Handler for new donation navigation
  const handleNewDonation = () => {
    navigate('/donation');
  };

  // If request was unsuccessful or no data
  if (!response.success || !response.data || response.data.length === 0) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[500px] bg-[#E4D3E7] p-4">
        {/* New Donation Button */}
        <Button 
          onClick={handleNewDonation}
          className="absolute top-4 left-4 bg-[#8A5691] hover:bg-[#8A5691]/80"
        >
          <Plus className="mr-2 h-4 w-4" /> New Donation
        </Button>

        <PawPrint 
          className="w-32 h-32 text-[#8A5691] mb-6 animate-bounce" 
          strokeWidth={1.5} 
        />
        <h2 className="text-2xl font-semibold text-[#8A5691] mb-4">
          No Donation Requests Found
        </h2>
        <p className="text-[#A864AF] text-center max-w-md">
          {response.message || "It looks like there are no current donation requests."}
        </p>
        <p className="text-[#A864AF] text-center max-w-md mt-2">
          Start by creating a new request or check back later.
        </p>
      </div>
    );
  }

  // Render table if data exists
  return (
    <div 
      className="container mx-auto p-4 relative"
      style={{ backgroundColor: '#E4D3E7' }}
    >
      {/* New Donation Button */}
      <Button 
        onClick={handleNewDonation}
        className="absolute top-4 left-4 bg-[#8A5691] hover:bg-[#8A5691]/80"
      >
        <Plus className="mr-2 h-4 w-4" /> New Donation
      </Button>

      <h2 
        className="text-2xl font-semibold mb-4 text-[#8A5691] text-center"
      >
        Donation Requests
      </h2>
      <table className="w-full border-collapse">
        <thead className="bg-[#A864AF] text-[#FFFEFE]">
          <tr>
            <th className="p-2 text-left text-[#FFFEFE]">Email</th>
            <th className="p-2 text-left text-[#FFFEFE]">Mobile No</th>
            <th className="p-2 text-left text-[#FFFEFE]">Status</th>
            <th className="p-2 text-center text-[#FFFEFE]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {response.data.map((request) => (
            <tr 
              key={request.id} 
              className="hover:bg-[#D1B0D2]/30 transition-colors border-b"
            >
              <td className="p-2 text-[#8A5691]">
                {user.email || "No Email Found"}
              </td>
              <td className="p-2 text-[#8A5691]">
                {request.phone_no}
              </td>
              <td 
                className={`p-2 font-medium ${
                  request.status === 'pending' 
                    ? 'text-yellow-600' 
                    : request.status === 'approved' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}
              >
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </td>
              <td className="p-2 flex gap-2 justify-center">
                {/* View Button */}
                <button 
                  className="p-2 border rounded hover:bg-[#A864AF]/20"
                  onClick={() => onView(request)}
                >
                  <Eye className="w-4 h-4 text-[#8A5691]" />
                </button>
                {/* Delete Button (only if status is Pending) */}
                {request.status === "pending" && (
                  <button 
                    className="p-2 bg-[#8A5691] text-white rounded hover:bg-[#8A5691]/80"
                    onClick={() => onDelete(request.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowDonateRequest;