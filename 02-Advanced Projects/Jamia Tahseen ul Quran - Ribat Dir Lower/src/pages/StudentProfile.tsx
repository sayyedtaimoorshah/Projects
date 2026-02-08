import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useStudents } from "@/contexts/StudentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Phone, MapPin, Calendar, GraduationCap, FileText } from "lucide-react";
import { CLASS_OPTIONS } from "@/types";
import { cn } from "@/lib/utils";

const statusStyles = {
  pending: "bg-gold-light text-accent border-accent/30",
  approved: "bg-emerald-light text-primary border-primary/30",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getStudentById } = useStudents();

  const student = id ? getStudentById(id) : undefined;

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (!student) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Student Not Found</h1>
          <p className="text-muted-foreground mb-8">The student record you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/students">Back to Students</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const classInfo = CLASS_OPTIONS.find(c => c.id === student.classApplyingFor);

  return (
    <Layout showFooter={false}>
      <div className="container py-8">
        {/* Back link */}
        <Link to="/students" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students List
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-primary p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary-foreground" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="font-arabic text-3xl font-bold text-primary-foreground mb-2">
                    {student.fullName}
                  </h1>
                  <p className="text-primary-foreground/80 font-arabic text-lg">
                    ولدیت: {student.fatherName}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge className={cn("border text-sm", statusStyles[student.status])}>
                      {student.status === 'pending' ? 'زیر التوا' : 
                       student.status === 'approved' ? 'منظور شدہ' : 'مسترد'}
                    </Badge>
                    {student.rollNumber && (
                      <Badge variant="secondary" className="text-sm">
                        Roll: {student.rollNumber}
                      </Badge>
                    )}
                    {student.section && (
                      <Badge variant="outline" className="text-sm bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30">
                        Section: {student.section}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString('en-PK')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium">{student.gender === 'male' ? 'Male / مرد' : 'Female / عورت'}</p>
                  </div>
                </div>
                {student.idNumber && (
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">CNIC/B-Form</p>
                      <p className="font-medium">{student.idNumber}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{student.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{student.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Class / کلاس</p>
                    <p className="font-medium font-arabic text-lg">{classInfo?.nameUrdu || student.classApplyingFor}</p>
                    <p className="text-sm text-muted-foreground">{classInfo?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Academic Year</p>
                    <p className="font-medium text-lg">{student.academicYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Previous Education</p>
                    <p className="font-medium">{student.previousEducation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Details */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Application Date</p>
                    <p className="font-medium">{new Date(student.createdAt).toLocaleDateString('en-PK', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{new Date(student.updatedAt).toLocaleDateString('en-PK', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
