import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { StudentCard } from "@/components/StudentCard";
import { useAuth } from "@/contexts/AuthContext";
import { useStudents } from "@/contexts/StudentContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, UserPlus, UserCheck, UserX, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SECTIONS } from "@/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isTeacher } = useAuth();
  const { students, stats, approveStudent, rejectStudent } = useStudents();
  const { toast } = useToast();

  const [approvalDialog, setApprovalDialog] = useState<{ open: boolean; studentId: string | null }>({
    open: false,
    studentId: null,
  });
  const [rollNumber, setRollNumber] = useState("");
  const [section, setSection] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else if (user.role === "student") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || (!isAdmin && !isTeacher)) {
    return null;
  }

  const pendingStudents = students.filter(s => s.status === 'pending');
  const recentStudents = students
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const handleApprove = (studentId: string) => {
    setApprovalDialog({ open: true, studentId });
  };

  const confirmApproval = () => {
    if (approvalDialog.studentId && rollNumber && section) {
      approveStudent(approvalDialog.studentId, rollNumber, section);
      toast({
        title: "Student Approved",
        description: "The student has been approved successfully.",
      });
      setApprovalDialog({ open: false, studentId: null });
      setRollNumber("");
      setSection("");
    }
  };

  const handleReject = (studentId: string) => {
    rejectStudent(studentId);
    toast({
      title: "Application Rejected",
      description: "The admission application has been rejected.",
      variant: "destructive",
    });
  };

  return (
    <Layout showFooter={false}>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            خوش آمدید، {user.name}
          </h1>
          <p className="text-muted-foreground">
            Welcome to the Admin Dashboard
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Pending Admissions"
            value={stats.pendingAdmissions}
            icon={UserPlus}
            variant="warning"
          />
          <StatCard
            title="Approved Students"
            value={stats.approvedStudents}
            icon={UserCheck}
            variant="success"
          />
          <StatCard
            title="Rejected"
            value={stats.rejectedStudents}
            icon={UserX}
            variant="default"
          />
        </div>

        {/* Pending Admissions */}
        {isAdmin && pendingStudents.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  زیر التوا درخواستیں
                </h2>
                <p className="text-sm text-muted-foreground">Pending Admission Requests</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/students?status=pending">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingStudents.slice(0, 3).map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  showActions={isAdmin}
                  onApprove={() => handleApprove(student.id)}
                  onReject={() => handleReject(student.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recent Students */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                حالیہ طلبہ
              </h2>
              <p className="text-sm text-muted-foreground">Recent Students</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/students">
                View All Students
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentStudents.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                showActions={isAdmin && student.status === 'pending'}
                onApprove={() => handleApprove(student.id)}
                onReject={() => handleReject(student.id)}
              />
            ))}
          </div>
        </section>

        {/* Approval Dialog */}
        <Dialog open={approvalDialog.open} onOpenChange={(open) => setApprovalDialog({ ...approvalDialog, open })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Student Admission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  placeholder="e.g., H-001"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select value={section} onValueChange={setSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTIONS.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={confirmApproval} className="w-full" disabled={!rollNumber || !section}>
                Confirm Approval
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Dashboard;
