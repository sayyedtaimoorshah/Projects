import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudents } from "@/contexts/StudentContext";
import { useToast } from "@/hooks/use-toast";
import { CLASS_OPTIONS, ACADEMIC_YEARS, Student } from "@/types";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { z } from "zod";

const admissionSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters").max(100, "Name is too long"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"], { required_error: "Please select gender" }),
  address: z.string().min(10, "Please provide a complete address").max(500, "Address is too long"),
  phoneNumber: z.string().regex(/^[0-9+\-\s]{10,15}$/, "Please enter a valid phone number"),
  previousEducation: z.string().min(2, "Please specify previous education").max(200, "Too long"),
  classApplyingFor: z.string().min(1, "Please select a class"),
  idNumber: z.string().optional(),
  academicYear: z.string().min(1, "Please select academic year"),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

const Admission = () => {
  const navigate = useNavigate();
  const { addStudent } = useStudents();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AdmissionFormData, string>>>({});
  
  const [formData, setFormData] = useState<AdmissionFormData>({
    fullName: "",
    fatherName: "",
    dateOfBirth: "",
    gender: "male",
    address: "",
    phoneNumber: "",
    previousEducation: "",
    classApplyingFor: "",
    idNumber: "",
    academicYear: ACADEMIC_YEARS[0],
  });

  const handleChange = (field: keyof AdmissionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = admissionSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AdmissionFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof AdmissionFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const validatedData = result.data;
    addStudent({
      fullName: validatedData.fullName,
      fatherName: validatedData.fatherName,
      dateOfBirth: validatedData.dateOfBirth,
      gender: validatedData.gender,
      address: validatedData.address,
      phoneNumber: validatedData.phoneNumber,
      previousEducation: validatedData.previousEducation,
      classApplyingFor: validatedData.classApplyingFor,
      idNumber: validatedData.idNumber,
      academicYear: validatedData.academicYear,
      status: 'pending',
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "درخواست موصول ہوگئی",
      description: "Your admission application has been submitted successfully!",
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="container py-20">
          <Card className="max-w-xl mx-auto text-center">
            <CardContent className="pt-10 pb-10">
              <div className="mb-6 inline-flex p-4 rounded-full bg-primary/10">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              <h2 className="font-arabic text-2xl font-bold text-foreground mb-2">
                درخواست جمع ہوگئی
              </h2>
              <p className="text-xl font-medium text-primary mb-4">
                Application Submitted Successfully!
              </p>
              <p className="text-muted-foreground mb-8">
                Your admission application has been received. You will be notified once the administration reviews your application.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/">Return Home</Link>
                </Button>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Submit Another Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-arabic text-3xl md:text-4xl font-bold text-foreground mb-4">
              داخلہ فارم
            </h1>
            <p className="text-lg text-muted-foreground">
              Admission Application Form
            </p>
          </div>

          <Card className="shadow-xl border-primary/10">
            <CardHeader>
              <CardTitle>Student Information / طالب علم کی معلومات</CardTitle>
              <CardDescription>
                Please fill in all required fields accurately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name / پورا نام *</Label>
                    <Input
                      id="fullName"
                      placeholder="محمد احمد"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father/Guardian Name / والد کا نام *</Label>
                    <Input
                      id="fatherName"
                      placeholder="محمد علی"
                      value={formData.fatherName}
                      onChange={(e) => handleChange('fatherName', e.target.value)}
                      className={errors.fatherName ? "border-destructive" : ""}
                    />
                    {errors.fatherName && <p className="text-sm text-destructive">{errors.fatherName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth / تاریخ پیدائش *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className={errors.dateOfBirth ? "border-destructive" : ""}
                    />
                    {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender / جنس *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleChange('gender', value)}
                    >
                      <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male / مرد</SelectItem>
                        <SelectItem value="female">Female / عورت</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address / پتہ *</Label>
                  <Textarea
                    id="address"
                    placeholder="Complete address with village/city, tehsil, district"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className={errors.address ? "border-destructive" : ""}
                    rows={3}
                  />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number / فون نمبر *</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="03001234567"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      className={errors.phoneNumber ? "border-destructive" : ""}
                    />
                    {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">CNIC/B-Form Number (Optional)</Label>
                    <Input
                      id="idNumber"
                      placeholder="xxxxx-xxxxxxx-x"
                      value={formData.idNumber}
                      onChange={(e) => handleChange('idNumber', e.target.value)}
                    />
                  </div>
                </div>

                {/* Academic Info */}
                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold mb-4">Academic Information / تعلیمی معلومات</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="previousEducation">Previous Education / سابقہ تعلیم *</Label>
                      <Input
                        id="previousEducation"
                        placeholder="e.g., پرائمری پاس، مڈل پاس"
                        value={formData.previousEducation}
                        onChange={(e) => handleChange('previousEducation', e.target.value)}
                        className={errors.previousEducation ? "border-destructive" : ""}
                      />
                      {errors.previousEducation && <p className="text-sm text-destructive">{errors.previousEducation}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="classApplyingFor">Class Applying For / کلاس *</Label>
                      <Select
                        value={formData.classApplyingFor}
                        onValueChange={(value) => handleChange('classApplyingFor', value)}
                      >
                        <SelectTrigger className={errors.classApplyingFor ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {CLASS_OPTIONS.map(option => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.nameUrdu} - {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.classApplyingFor && <p className="text-sm text-destructive">{errors.classApplyingFor}</p>}
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Label htmlFor="academicYear">Academic Year / تعلیمی سال *</Label>
                    <Select
                      value={formData.academicYear}
                      onValueChange={(value) => handleChange('academicYear', value)}
                    >
                      <SelectTrigger className="w-full md:w-1/2">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {ACADEMIC_YEARS.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Application / درخواست جمع کروائیں
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admission;
