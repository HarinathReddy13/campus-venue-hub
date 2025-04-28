
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VenueCard, { Venue } from "@/components/VenueCard";

// Mock data for venues
const mockVenues: Venue[] = [
  {
    id: "1",
    name: "Main Auditorium",
    location: "Central Campus",
    capacity: 500,
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: ["Stage", "Sound System", "Projector"],
    category: "Auditorium"
  },
  {
    id: "2",
    name: "Conference Room A",
    location: "Business Building",
    capacity: 50,
    imageUrl: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: ["Whiteboard", "Video Conferencing", "Coffee Machine"],
    category: "Conference Room"
  },
  {
    id: "3",
    name: "Sports Hall",
    location: "Sports Complex",
    capacity: 200,
    imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: ["Basketball Court", "Locker Rooms", "Scoreboard"],
    category: "Sports Venue"
  },
  {
    id: "4",
    name: "Study Room 101",
    location: "Library",
    capacity: 15,
    imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: ["Quiet Space", "Power Outlets", "Wi-Fi"],
    category: "Study Space"
  },
  {
    id: "5",
    name: "Computer Lab",
    location: "Technology Building",
    capacity: 40,
    imageUrl: "https://images.unsplash.com/photo-1662025118270-544f3b9fe645?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: ["High-end Computers", "Software Development Tools", "Dual Monitors"],
    category: "Lab"
  },
  {
    id: "6",
    name: "Outdoor Amphitheater",
    location: "Arts Quad",
    capacity: 300,
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: ["Open Air", "Stage", "Natural Acoustics"],
    category: "Outdoor Space"
  },
];

const categories = ["All", "Auditorium", "Conference Room", "Sports Venue", "Study Space", "Lab", "Outdoor Space"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [capacityFilter, setCapacityFilter] = useState("");

  const filteredVenues = mockVenues.filter((venue) => {
    // Filter by search query
    const matchesSearch = 
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      selectedCategory === "All" || venue.category === selectedCategory;
    
    // Filter by capacity
    const capacityNumber = parseInt(capacityFilter);
    const matchesCapacity = 
      !capacityFilter || (capacityNumber > 0 && venue.capacity >= capacityNumber);
    
    return matchesSearch && matchesCategory && matchesCapacity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find and Book Campus Venues</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Easily discover, compare, and book the perfect space for your events, meetings, or study sessions.
        </p>
      </section>
      
      {/* Search and filter */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search venues by name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Input
              type="number"
              placeholder="Min. Capacity"
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setCapacityFilter("");
            }}
            variant="outline"
          >
            Reset Filters
          </Button>
        </div>
      </section>
      
      {/* Venues grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Available Venues</h2>
        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No venues found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find venues.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
