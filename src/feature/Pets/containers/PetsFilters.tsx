import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedGender: string | null;
  setSelectedGender: (value: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (value: string | null) => void;
  selectedBreed: string | null;
  setSelectedBreed: (value: string | null) => void;
  resetFilters: () => void;
  uniqueCategories: string[];
  uniqueBreeds: string[];
}

const PetsFilters = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  selectedStatus,
  setSelectedStatus,
  selectedBreed,
  setSelectedBreed,
  resetFilters,
  uniqueCategories,
  uniqueBreeds,
}: FiltersProps) => (
  <aside className="w-64 bg-amber-100 p-4 border-r hidden md:block flex flex-col justify-between h-screen">
    <div>
      <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2">
        <Filter className="w-5 h-5" /> Filters
      </h2>
      <div className="mt-4 space-y-6">
        {/* Category Filter */}
        <div>
          <p className="font-semibold text-amber-800">Filter by Category</p>
          <ScrollArea className="h-24 border rounded-md p-2">
            {uniqueCategories.map((category, index) => (
              <div key={index} className="flex items-center space-x-2 mt-1">
                <Checkbox
                  checked={selectedCategory === category}
                  onCheckedChange={(checked) => setSelectedCategory(checked ? category : null)}
                />
                <label className="text-sm text-gray-700 cursor-pointer">{category}</label>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Search by Breed */}
        <div>
          <p className="font-semibold text-amber-800">Search by Breed</p>
          <Input type="text" placeholder="Enter breed name..." value={search} onChange={(e) => setSearch(e.target.value)} className="mt-2" />
        </div>

        {/* Gender Filter */}
        <div>
          <p className="font-semibold text-amber-800">Sort by Gender</p>
          <div className="flex gap-4 mt-2">
            <Button variant={selectedGender === "Male" ? "default" : "outline"} onClick={() => setSelectedGender(selectedGender === "Male" ? null : "Male")}>
              Male
            </Button>
            <Button variant={selectedGender === "Female" ? "default" : "outline"} onClick={() => setSelectedGender(selectedGender === "Female" ? null : "Female")}>
              Female
            </Button>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <p className="font-semibold text-amber-800">Sort by Availability</p>
          <div className="flex gap-4 mt-2">
            <Button variant={selectedStatus === "Available" ? "default" : "outline"} onClick={() => setSelectedStatus(selectedStatus === "Available" ? null : "Available")}>
              Available
            </Button>
            <Button variant={selectedStatus === "Unavailable" ? "default" : "outline"} onClick={() => setSelectedStatus(selectedStatus === "Unavailable" ? null : "Unavailable")}>
              Unavailable
            </Button>
          </div>
        </div>

         {/* Breed Filter */}
         <div>
          <p className="font-semibold text-amber-800">Filter by Breeds</p>
          <ScrollArea className="h-40 border rounded-md p-2">
            {uniqueBreeds.map((breed, index) => (
              <div key={index} className="flex items-center space-x-2 mt-1">
                <Checkbox
                  checked={selectedBreed === breed}
                  onCheckedChange={(checked) => setSelectedBreed(checked ? breed : null)}
                />
                <label className="text-sm text-gray-700 cursor-pointer">{breed}</label>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
    {/* Reset Filters Button */}
    <Button onClick={resetFilters} className="mt-4 bg-red-500 hover:bg-red-600 text-white">Reset Filters</Button>
  </aside>
);

export default PetsFilters;
