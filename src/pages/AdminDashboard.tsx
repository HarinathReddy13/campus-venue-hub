
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import BookingStatusBadge from "@/components/BookingStatusBadge";

// Mock data for admin dashboard
const bookingRequestsData = [
  {
    id: "req1",
    userName: "Alice Johnson",
    userEmail: "alice@example.com",
    venueName: "Main Auditorium",
    date: new Date(2025, 4, 15),
    timeSlot: "Afternoon",
    title: "Annual Department Meeting",
    attendees: 120,
    status: "pending" as const,
  },
  {
    id: "req2",
    userName: "Bob Smith",
    userEmail: "bob@example.com",
    venueName: "Conference Room A",
    date: new Date(2025, 4, 16),
    timeSlot: "Morning",
    title: "Project Planning Session",
    attendees: 15,
    status: "pending" as const,
  },
  {
    id: "req3",
    userName: "Carol White",
    userEmail: "carol@example.com",
    venueName: "Computer Lab",
    date: new Date(2025, 4, 18),
    timeSlot: "Morning",
    title: "Software Training",
    attendees: 25,
    status: "pending" as const,
  },
];

const allBookingsData = [
  ...bookingRequestsData,
  {
    id: "book1",
    userName: "David Lee",
    userEmail: "david@example.com",
    venueName: "Sports Hall",
    date: new Date(2025, 4, 10),
    timeSlot: "Evening",
    title: "Basketball Tournament",
    attendees: 150,
    status: "approved" as const,
  },
  {
    id: "book2",
    userName: "Eve Harris",
    userEmail: "eve@example.com",
    venueName: "Outdoor Amphitheater",
    date: new Date(2025, 4, 12),
    timeSlot: "Afternoon",
    title: "Drama Club Performance",
    attendees: 200,
    status: "approved" as const,
  },
  {
    id: "book3",
    userName: "Frank Martin",
    userEmail: "frank@example.com",
    venueName: "Study Room 101",
    date: new Date(2025, 4, 8),
    timeSlot: "Morning",
    title: "Group Study Session",
    attendees: 8,
    status: "rejected" as const,
  },
];

const venuesData = [
  {
    id: "venue1",
    name: "Main Auditorium",
    location: "Central Campus",
    capacity: 500,
    bookingsCount: 45,
    category: "Auditorium",
    status: "active",
  },
  {
    id: "venue2",
    name: "Conference Room A",
    location: "Business Building",
    capacity: 50,
    bookingsCount: 120,
    category: "Conference Room",
    status: "active",
  },
  {
    id: "venue3",
    name: "Sports Hall",
    location: "Sports Complex",
    capacity: 200,
    bookingsCount: 30,
    category: "Sports Venue",
    status: "active",
  },
  {
    id: "venue4",
    name: "Study Room 101",
    location: "Library",
    capacity: 15,
    bookingsCount: 85,
    category: "Study Space",
    status: "active",
  },
  {
    id: "venue5",
    name: "Computer Lab",
    location: "Technology Building",
    capacity: 40,
    bookingsCount: 62,
    category: "Lab",
    status: "maintenance",
  },
  {
    id: "venue6",
    name: "Outdoor Amphitheater",
    location: "Arts Quad",
    capacity: 300,
    bookingsCount: 15,
    category: "Outdoor Space",
    status: "active",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [bookingSearchQuery, setBookingSearchQuery] = useState("");
  const [venueSearchQuery, setVenueSearchQuery] = useState("");
  const [bookingFilter, setBookingFilter] = useState("all");

  // Redirect non-admin users
  if (!isAdmin) {
    navigate("/");
    return null;
  }

  // Filter bookings
  const filteredBookings = allBookingsData.filter((booking) => {
    const matchesSearch =
      booking.venueName.toLowerCase().includes(bookingSearchQuery.toLowerCase()) ||
      booking.userName.toLowerCase().includes(bookingSearchQuery.toLowerCase()) ||
      booking.title.toLowerCase().includes(bookingSearchQuery.toLowerCase());
    const matchesStatus = bookingFilter === "all" || booking.status === bookingFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter venues
  const filteredVenues = venuesData.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(venueSearchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(venueSearchQuery.toLowerCase()) ||
      venue.category.toLowerCase().includes(venueSearchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleStatusChange = (bookingId: string, newStatus: "approved" | "rejected") => {
    // In a real app, this would be an API call
    console.log(`Changing booking ${bookingId} to ${newStatus}`);
    
    // Show success toast
    // Add actual implementation here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage venues and booking requests
          </p>
        </div>
        <Button>Add New Venue</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Venues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{venuesData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookingRequestsData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{allBookingsData.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Pending Requests</TabsTrigger>
          <TabsTrigger value="allBookings">All Bookings</TabsTrigger>
          <TabsTrigger value="venues">Manage Venues</TabsTrigger>
        </TabsList>

        {/* Pending Requests Tab */}
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Booking Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {bookingRequestsData.length > 0 ? (
                <div className="space-y-4">
                  {bookingRequestsData.map((request) => (
                    <Card key={request.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{request.title}</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-x-6 mt-1 text-sm">
                              <p>
                                <span className="text-muted-foreground">By:</span> {request.userName}
                              </p>
                              <p>
                                <span className="text-muted-foreground">Venue:</span> {request.venueName}
                              </p>
                              <p>
                                <span className="text-muted-foreground">Attendees:</span> {request.attendees}
                              </p>
                            </div>
                            <p className="text-sm mt-2">
                              {format(request.date, "MMMM d, yyyy")} • {request.timeSlot}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              onClick={() => handleStatusChange(request.id, "approved")} 
                              variant="default"
                              className="bg-status-approved hover:bg-status-approved/90"
                            >
                              Approve
                            </Button>
                            <Button 
                              onClick={() => handleStatusChange(request.id, "rejected")} 
                              variant="default"
                              className="bg-status-rejected hover:bg-status-rejected/90"
                            >
                              Reject
                            </Button>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline">Details</Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="font-semibold">Request Details</h4>
                                  <p className="text-sm">
                                    <span className="font-medium">Submitter:</span> {request.userName} ({request.userEmail})
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Title:</span> {request.title}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Venue:</span> {request.venueName}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Date:</span> {format(request.date, "MMMM d, yyyy")}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Time:</span> {request.timeSlot}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Attendees:</span> {request.attendees}
                                  </p>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No pending requests</h3>
                  <p className="text-muted-foreground mt-1">All booking requests have been processed.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Bookings Tab */}
        <TabsContent value="allBookings">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Input
                  placeholder="Search bookings..."
                  value={bookingSearchQuery}
                  onChange={(e) => setBookingSearchQuery(e.target.value)}
                  className="max-w-[300px]"
                />
                <Select value={bookingFilter} onValueChange={setBookingFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.title}</TableCell>
                        <TableCell>{booking.userName}</TableCell>
                        <TableCell>{booking.venueName}</TableCell>
                        <TableCell>
                          {format(booking.date, "MMM d, yyyy")} • {booking.timeSlot}
                        </TableCell>
                        <TableCell>
                          <BookingStatusBadge status={booking.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Venues Tab */}
        <TabsContent value="venues">
          <Card>
            <CardHeader>
              <CardTitle>Venue Management</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Input
                  placeholder="Search venues..."
                  value={venueSearchQuery}
                  onChange={(e) => setVenueSearchQuery(e.target.value)}
                  className="max-w-[300px]"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVenues.map((venue) => (
                      <TableRow key={venue.id}>
                        <TableCell className="font-medium">{venue.name}</TableCell>
                        <TableCell>{venue.location}</TableCell>
                        <TableCell>{venue.capacity}</TableCell>
                        <TableCell>{venue.category}</TableCell>
                        <TableCell>{venue.bookingsCount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={venue.status === "active" ? "outline" : "secondary"}
                            className={
                              venue.status === "active"
                                ? "bg-status-approved/10 text-status-approved border-status-approved/20"
                                : "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
                            }
                          >
                            {venue.status === "active" ? "Active" : "Maintenance"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
