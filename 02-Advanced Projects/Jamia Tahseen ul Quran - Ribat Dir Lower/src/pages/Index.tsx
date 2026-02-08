import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, GraduationCap, Users, Star, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Index = () => {
  const { user, isAdmin, isTeacher } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: "حفظ القرآن",
      titleEn: "Quran Memorization",
      description: "Complete Hifz program with experienced Huffaz teachers",
    },
    {
      icon: GraduationCap,
      title: "درس نظامی",
      titleEn: "Dars-e-Nizami",
      description: "Traditional Islamic scholarship curriculum",
    },
    {
      icon: Users,
      title: "تجوید",
      titleEn: "Tajweed Classes",
      description: "Master the art of Quranic recitation",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden islamic-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-light/50 to-background" />
        <div className="container relative py-20 lg:py-32">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="mb-8 animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse-soft" />
                <img
                  src={logo}
                  alt="جامعہ تحسین القرآن"
                  className="relative h-32 w-32 md:h-40 md:w-40 rounded-full object-cover shadow-2xl border-4 border-card"
                />
              </div>
            </div>

            {/* Title */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="font-arabic text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
                جامعہ تحسین القرآن
              </h1>
              <p className="font-arabic text-xl md:text-2xl text-accent mb-2">
                رباط دیر لوئر
              </p>
              <p className="text-muted-foreground text-lg">
                Jamia Tahseen ul Quran - Rabat Dir Lower, KPK Pakistan
              </p>
            </div>

            {/* Tagline */}
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Dedicated to providing quality Quranic education and nurturing future Islamic scholars 
              in the beautiful tradition of knowledge and spirituality.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="text-lg px-8 shadow-glow-green">
                <Link to="/admission">
                  Apply for Admission
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {user && (isAdmin || isTeacher) ? (
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/auth">Staff Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-arabic text-3xl md:text-4xl font-bold text-foreground mb-4">
              ہمارے پروگرام
            </h2>
            <p className="text-muted-foreground text-lg">Our Educational Programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="font-arabic text-2xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-lg font-medium text-primary mb-3">{feature.titleEn}</p>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Students", labelUrdu: "طلبہ" },
              { value: "10+", label: "Teachers", labelUrdu: "اساتذہ" },
              { value: "5+", label: "Years", labelUrdu: "سال" },
              { value: "100+", label: "Huffaz", labelUrdu: "حفاظ" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <p className="text-4xl md:text-5xl font-bold text-accent">{stat.value}</p>
                <p className="text-primary-foreground/80 font-arabic text-lg">{stat.labelUrdu}</p>
                <p className="text-primary-foreground/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 islamic-pattern">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="font-arabic text-3xl md:text-4xl font-bold text-foreground mb-4">
              آج ہی داخلے کے لیے درخواست دیں
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Begin your journey of Islamic education with us. Apply now for the upcoming academic year.
            </p>
            <Button asChild size="lg" className="text-lg px-10">
              <Link to="/admission">
                Start Application
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
