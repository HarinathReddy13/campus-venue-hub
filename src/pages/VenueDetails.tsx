
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

// Mock data for venue details
const venueData = {
  "1": {
    id: "1",
    name: "Main Auditorium",
    location: "Central Campus",
    capacity: 500,
    imageUrls: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1517457440474-8dde1fab3c41?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1526724655426-c6decf8233ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    features: ["Stage", "Sound System", "Projector", "Air Conditioning", "Wheelchair Access"],
    category: "Auditorium",
    description: "Our main auditorium is perfect for large events, lectures, and performances. It features state-of-the-art sound and lighting systems with comfortable seating for up to 500 people.",
    availableTimeSlots: ["Morning", "Afternoon", "Evening"],
    rules: [
      "No food or drinks inside",
      "No modification of stage setup without permission",
      "Booking includes basic technical support"
    ]
  },
  "2": {
    id: "2",
    name: "Conference Room A",
    location: "Business Building",
    capacity: 50,
    imageUrls: [
      "https://images.unsplash.com/photo-1596079890744-c1a0462d0975?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    features: ["Whiteboard", "Video Conferencing", "Coffee Machine", "Projector", "Air Conditioning"],
    category: "Conference Room",
    description: "A professional conference room equipped with modern facilities for presentations, meetings, and workshops. Features a large table, comfortable chairs, and high-tech conferencing equipment.",
    availableTimeSlots: ["Morning", "Afternoon"],
    rules: [
      "Room must be left clean",
      "Technical equipment must be handled with care",
      "Maximum 4-hour booking slots"
    ]
  },
  "3": {
    id: "3",
    name: "Sports Hall",
    location: "Sports Complex",
    capacity: 200,
    imageUrls: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1567603452239-496d5e8c375e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    features: ["Basketball Court", "Locker Rooms", "Scoreboard", "Sound System", "Spectator Seating"],
    category: "Sports Venue",
    description: "A multipurpose sports hall suitable for basketball, volleyball, badminton, and various indoor sports events or fitness activities. Includes spectator seating and full changing facilities.",
    availableTimeSlots: ["Morning", "Afternoon", "Evening"],
    rules: [
      "Appropriate footwear must be worn",
      "Equipment damage must be reported immediately",
      "No food on the court"
    ]
  },
  "4": {
    id: "4",
    name: "Study Room 101",
    location: "Library",
    capacity: 15,
    imageUrls: [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1529007196863-d07650a3f0b9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    features: ["Quiet Space", "Power Outlets", "Wi-Fi", "Whiteboards", "Natural Lighting"],
    category: "Study Space",
    description: "A quiet and comfortable study room ideal for group work, discussions, or collaborative projects. Features multiple power outlets and a peaceful environment for focused work.",
    availableTimeSlots: ["Morning", "Afternoon", "Evening"],
    rules: [
      "Quiet voices only",
      "No food or drinks except water",
      "Maximum booking time of 3 hours"
    ]
  },
  "5": {
    id: "5",
    name: "Computer Lab",
    location: "Technology Building",
    capacity: 40,
    imageUrls: [
      "https://images.unsplash.com/photo-1662025118270-544f3b9fe645?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1566125882500-87e10f726cdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    features: ["High-end Computers", "Software Development Tools", "Dual Monitors", "Fast Internet", "Ergonomic Chairs"],
    category: "Lab",
    description: "A state-of-the-art computer lab with 40 high-performance workstations loaded with professional software. Ideal for programming classes, digital design work, or technical training sessions.",
    availableTimeSlots: ["Morning", "Afternoon"],
    rules: [
      "No food or drinks around computers",
      "No software installation without permission",
      "Supervised access only"
    ]
  },
  "6": {
    id: "6",
    name: "Outdoor Amphitheater",
    location: "Arts Quad",
    capacity: 300,
    imageUrls: [
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578944184805-26de4e76c735?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ],
    features: ["Open Air", "Stage", "Natural Acoustics", "Tiered Seating", "Lighting System"],
    category: "Outdoor Space",
    description: "A beautiful outdoor performance space with natural acoustics and a Greek-inspired design. Perfect for performances, graduation ceremonies, or outdoor lectures on pleasant days.",
    availableTimeSlots: ["Morning", "Afternoon"],
    rules: [
      "Weather-dependent venue",
      "Sound restrictions after 8pm",
      "No staking anything into the ground"
    ]
  },
};

// Sample unavailable dates for demonstration
const unavailableDates = [
  new Date(2025, 3, 12),
  new Date(2025, 3, 13),
  new Date(2025, 3, 18),
  new Date(2025, 3, 25),
  new Date(2025, 4, 2),
  new Date(2025, 4, 10),
];

export default function VenueDetails() {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Check if venue exists with the provided ID
  if (!id || !venueData[id as keyof typeof venueData]) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Venue Not Found</h1>
        <p className="mb-8 text-muted-foreground">The venue you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  const venue = venueData[id as keyof typeof venueData];

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/venues/${id}` } });
      return;
    }

    if (selectedDate && selectedTimeSlot) {
      navigate(`/booking/${id}`, { 
        state: { 
          venue, 
          selectedDate, 
          selectedTimeSlot 
        } 
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-4"
      >
        ← Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Images and details */}
        <div className="lg:col-span-2">
          {/* Image gallery */}
          <div className="mb-8">
            <div className="aspect-[16/9] overflow-hidden rounded-xl mb-4">
              <img 
                src={venue.imageUrls[activeImageIndex]} 
                alt={venue.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {venue.imageUrls.map((img, index) => (
                <div 
                  key={index} 
                  className={`aspect-[16/9] overflow-hidden rounded-lg cursor-pointer transition ${activeImageIndex === index ? 'ring-2 ring-brand-600' : 'opacity-70 hover:opacity-100'}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={img} 
                    alt={`${venue.name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Venue information */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold">{venue.name}</h1>
                <p className="text-muted-foreground">{venue.location}</p>
              </div>
              <Badge variant="outline" className="text-sm">
                {venue.category}
              </Badge>
            </div>

            <Tabs defaultValue="details" className="mb-8">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <p className="mb-4">{venue.description}</p>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Capacity: {venue.capacity} people</span>
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="grid grid-cols-2 gap-2">
                  {venue.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="rules" className="mt-4">
                <ul className="space-y-2">
                  {venue.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-brand-600 mt-1"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right column - Booking */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Book This Venue</CardTitle>
              <CardDescription>Select a date and time to book</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calendar */}
              <div>
                <h3 className="font-medium mb-2">Available Dates</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    // Disable past dates, weekends, and specific unavailable days
                    return (
                      date < new Date() || 
                      date.getDay() === 0 || 
                      date.getDay() === 6 ||
                      unavailableDates.some(
                        (unavailableDate) =>
                          unavailableDate.getDate() === date.getDate() &&
                          unavailableDate.getMonth() === date.getMonth() &&
                          unavailableDate.getFullYear() === date.getFullYear()
                      )
                    );
                  }}
                  className="rounded-md border"
                />
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div>
                  <h3 className="font-medium mb-2">Available Time Slots</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {venue.availableTimeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTimeSlot === slot ? "default" : "outline"}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={selectedTimeSlot === slot ? "bg-brand-600 hover:bg-brand-700" : ""}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <Button 
                className="w-full" 
                size="lg" 
                disabled={!selectedDate || !selectedTimeSlot}
                onClick={handleBooking}
              >
                {isAuthenticated ? 'Continue to Booking' : 'Login to Book'}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                {isAuthenticated 
                  ? 'You will be able to specify details in the next step' 
                  : 'You need to be logged in to book this venue'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
