import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status }) => {
  const getStatusVariant = (status) => {
    const statusLower = status?.toLowerCase().replace(/\s+/g, "-");
    
    switch (statusLower) {
      case "active":
        return "active";
      case "on-hold":
      case "on hold":
        return "on-hold";
      case "completed":
        return "completed";
      case "to-do":
      case "to do":
      case "todo":
        return "to-do";
      case "in-progress":
      case "in progress":
        return "in-progress";
      case "done":
        return "done";
      default:
        return "default";
    }
  };

  return (
    <Badge variant={getStatusVariant(status)}>
      {status}
    </Badge>
  );
};

export default StatusBadge;