import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-12 w-12 rounded-full object-cover shadow-md" />
              <div>
                <h3 className="font-arabic text-lg font-bold text-primary">جامعہ تحسین القرآن</h3>
                <p className="font-arabic text-sm text-muted-foreground">رباط دیر لوئر</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Dedicated to Quranic education and Islamic learning
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/admission" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Apply for Admission
              </Link>
              <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Staff Login
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-foreground mb-4">Address</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>Rabat Kotkey, Dir Lower, KPK</p>
              <p>Khyber Pakhtunkhwa, Pakistan</p>
              <p className="font-arabic">خیبر پختونخواہ، پاکستان</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} جامعہ تحسین القرآن. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
