import { Student, CLASS_OPTIONS } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, CheckCircle, XCircle, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: Student;
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}

const statusStyles = {
  pending: "bg-gold-light text-accent border-accent/30",
  approved: "bg-emerald-light text-primary border-primary/30",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

export function StudentCard({ student, onApprove, onReject, showActions = false }: StudentCardProps) {
  const classInfo = CLASS_OPTIONS.find(c => c.id === student.classApplyingFor);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-arabic text-lg font-semibold text-foreground leading-tight">
                {student.fullName}
              </h3>
              <p className="text-sm text-muted-foreground font-arabic">
                ولدیت: {student.fatherName}
              </p>
            </div>
          </div>
          <Badge className={cn("border", statusStyles[student.status])}>
            {student.status === 'pending' ? 'زیر التوا' : 
             student.status === 'approved' ? 'منظور شدہ' : 'مسترد'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Class:</span>
            <span className="font-medium font-arabic">{classInfo?.nameUrdu || student.classApplyingFor}</span>
          </div>
          {student.rollNumber && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Roll No:</span>
              <span className="font-medium">{student.rollNumber}</span>
            </div>
          )}
          {student.section && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Section:</span>
              <span className="font-medium">{student.section}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Phone:</span>
            <span className="font-medium">{student.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={`/students/${student.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </Link>
          </Button>
          
          {showActions && student.status === 'pending' && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={onApprove}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onReject}
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
