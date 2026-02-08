import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StudentCard } from "@/components/StudentCard";
import { useAuth } from "@/contexts/AuthContext";
import { useStudents } from "@/contexts/StudentContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Download } from "lucide-react";
import { CLASS_OPTIONS, SECTIONS, Student } from "@/types";

const Students = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAdmin, isTeacher } = useAuth();
  const { students, approveStudent, rejectStudent } = useStudents();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");
  const [classFilter, setClassFilter] = useState("all");

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

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phoneNumber.includes(searchQuery) ||
      (student.rollNumber?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesClass = classFilter === "all" || student.classApplyingFor === classFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

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

  const exportToCSV = () => {
    const headers = ['Name', 'Father Name', 'Phone', 'Class', 'Status', 'Roll No', 'Section'];
    const rows = filteredStudents.map(s => [
      s.fullName,
      s.fatherName,
      s.phoneNumber,
      CLASS_OPTIONS.find(c => c.id === s.classApplyingFor)?.name || s.classApplyingFor,
      s.status,
      s.rollNumber || '-',
      s.section || '-'
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: `Exported ${filteredStudents.length} students to CSV`,
    });
  };

  return (
    <Layout showFooter={false}>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-arabic text-3xl font-bold text-foreground mb-2">
            طلبہ کی فہرست
          </h1>
          <p className="text-muted-foreground">Student Management</p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-6 rounded-xl bg-card border border-border">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {CLASS_OPTIONS.map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.nameUrdu}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isAdmin && (
                <Button variant="outline" onClick={exportToCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No students found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                showActions={isAdmin && student.status === 'pending'}
                onApprove={() => handleApprove(student.id)}
                onReject={() => handleReject(student.id)}
              />
            ))}
          </div>
        )}

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

export default Students;
