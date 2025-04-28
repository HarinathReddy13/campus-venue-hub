
import { Badge } from "@/components/ui/badge";

type BookingStatus = "pending" | "approved" | "rejected";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export default function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const getStatusConfig = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-status-pending text-white",
          label: "Pending"
        };
      case "approved":
        return {
          color: "bg-status-approved text-white",
          label: "Approved"
        };
      case "rejected":
        return {
          color: "bg-status-rejected text-white",
          label: "Rejected"
        };
      default:
        return {
          color: "bg-muted",
          label: status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={`${config.color}`}>
      {config.label}
    </Badge>
  );
}
