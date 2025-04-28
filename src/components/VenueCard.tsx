
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  imageUrl: string;
  features: string[];
  category: string;
};

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video overflow-hidden">
        <img 
          src={venue.imageUrl} 
          alt={venue.name}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{venue.name}</h3>
            <p className="text-sm text-muted-foreground">{venue.location}</p>
          </div>
          <Badge variant="outline">{venue.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-2 mb-2">
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
          <span className="text-sm">Capacity: {venue.capacity}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {venue.features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/venues/${venue.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
