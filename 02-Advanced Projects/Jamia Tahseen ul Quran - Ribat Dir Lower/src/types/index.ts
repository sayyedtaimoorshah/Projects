export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  createdAt: Date;
}

export interface Student {
  id: string;
  fullName: string;
  fatherName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  address: string;
  phoneNumber: string;
  previousEducation: string;
  classApplyingFor: string;
  idNumber?: string;
  photoUrl?: string;
  documentUrls?: string[];
  status: 'pending' | 'approved' | 'rejected';
  rollNumber?: string;
  section?: string;
  academicYear: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}

export interface DashboardStats {
  totalStudents: number;
  pendingAdmissions: number;
  approvedStudents: number;
  rejectedStudents: number;
}

export interface ClassOption {
  id: string;
  name: string;
  nameUrdu: string;
}

export const CLASS_OPTIONS: ClassOption[] = [
  { id: 'hifz', name: 'Hifz ul Quran', nameUrdu: 'حفظ القرآن' },
  { id: 'nazra', name: 'Nazra Quran', nameUrdu: 'ناظرہ قرآن' },
  { id: 'tajweed', name: 'Tajweed', nameUrdu: 'تجوید' },
  { id: 'aalim', name: 'Dars-e-Nizami (Aalim)', nameUrdu: 'درس نظامی (عالم)' },
  { id: 'fazil', name: 'Fazil Course', nameUrdu: 'فاضل کورس' },
];

export const SECTIONS = ['A', 'B', 'C', 'D'];

export const ACADEMIC_YEARS = [
  '2024-2025',
  '2025-2026',
  '2026-2027',
];
