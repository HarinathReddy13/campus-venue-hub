
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import BookingStatusBadge from "@/components/BookingStatusBadge";

// Mock data for user bookings
const mockBookings = [
  {
    id: "b1",
    venueName: "Main Auditorium",
    venueLocation: "Central Campus",
    date: new Date(2025, 5, 10),
    timeSlot: "Afternoon",
    status: "approved" as const,
    title: "Marketing Department Presentation",
    eventType: "presentation"
  },
  {
    id: "b2",
    venueName: "Conference Room A",
    venueLocation: "Business Building",
    date: new Date(2025, 5, 15),
    timeSlot: "Morning",
    status: "pending" as const,
    title: "Strategic Planning Meeting",
    eventType: "meeting"
  },
  {
    id: "b3",
    venueName: "Study Room 101",
    venueLocation: "Library",
    date: new Date(2025, 5, 20),
    timeSlot: "Evening",
    status: "rejected" as const,
    title: "Group Study Session",
    eventType: "class"
  },
  {
    id: "b4",
    venueName: "Sports Hall",
    venueLocation: "Sports Complex",
    date: new Date(2025, 6, 5),
    timeSlot: "Afternoon",
    status: "approved" as const,
    title: "Basketball Tournament",
    eventType: "social"
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter bookings based on search and status
  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.venueName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          booking.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Notifications</Button>
          <Button>New Booking</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockBookings.filter(b => b.status === "approved").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockBookings.filter(b => b.status === "pending").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-[300px]"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bookings</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {filteredBookings.length > 0 ? (
                <div className="space-y-6">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{booking.title}</h3>
                            <Badge variant="outline">{booking.eventType}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {booking.venueName}, {booking.venueLocation}
                          </p>
                          <p className="text-sm mt-1">
                            {format(booking.date, "MMMM d, yyyy")} • {booking.timeSlot}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookingStatusBadge status={booking.status} />
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium">No bookings found</h3>
                  <p className="text-muted-foreground mt-1">Try adjusting your filters or search criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Account Settings</h3>
                <div className="grid gap-4">
                  <Button variant="outline" size="sm" className="justify-start w-fit">
                    Change Password
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start w-fit">
                    Notification Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
