import { Eye, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function VisitorCounter() {
  // Mock data as the backend implementation is out of scope.
  const totalVisitors = "12,345";
  const uniqueVisitors = "8,765";

  return (
    <div className="flex items-center gap-4">
      <Badge variant="outline" className="flex items-center gap-2 border-primary/50 py-1 px-3">
        <Eye className="h-4 w-4 text-primary" />
        <span className="font-medium text-foreground">Total Visits:</span>
        <span className="font-semibold text-primary">{totalVisitors}</span>
      </Badge>
      <Badge variant="outline" className="flex items-center gap-2 border-accent/50 py-1 px-3">
        <Users className="h-4 w-4 text-accent" />
        <span className="font-medium text-foreground">Unique Visitors:</span>
        <span className="font-semibold text-accent">{uniqueVisitors}</span>
      </Badge>
    </div>
  );
}
