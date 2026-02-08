import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student, DashboardStats } from '@/types';

interface StudentContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  approveStudent: (id: string, rollNumber: string, section: string) => void;
  rejectStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
  stats: DashboardStats;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

// Initial mock data
const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    fullName: 'محمد احمد',
    fatherName: 'محمد علی',
    dateOfBirth: '2010-05-15',
    gender: 'male',
    address: 'رباط دیر، خیبر پختونخواہ',
    phoneNumber: '03001234567',
    previousEducation: 'پرائمری پاس',
    classApplyingFor: 'hifz',
    status: 'approved',
    rollNumber: 'H-001',
    section: 'A',
    academicYear: '2024-2025',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    fullName: 'عبداللہ خان',
    fatherName: 'یوسف خان',
    dateOfBirth: '2012-08-20',
    gender: 'male',
    address: 'تمرگرہ، دیر لوئر',
    phoneNumber: '03009876543',
    previousEducation: 'مڈل پاس',
    classApplyingFor: 'nazra',
    status: 'pending',
    academicYear: '2024-2025',
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: '3',
    fullName: 'حافظ عمر فاروق',
    fatherName: 'فاروق احمد',
    dateOfBirth: '2008-03-12',
    gender: 'male',
    address: 'چکدرہ، دیر لوئر',
    phoneNumber: '03451234567',
    previousEducation: 'حفظ مکمل',
    classApplyingFor: 'aalim',
    status: 'approved',
    rollNumber: 'D-015',
    section: 'B',
    academicYear: '2024-2025',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: '4',
    fullName: 'زید الرحمان',
    fatherName: 'عبدالرحمان',
    dateOfBirth: '2011-11-25',
    gender: 'male',
    address: 'بلامبٹ، دیر لوئر',
    phoneNumber: '03331234567',
    previousEducation: 'پرائمری',
    classApplyingFor: 'tajweed',
    status: 'pending',
    academicYear: '2024-2025',
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-15'),
  },
];

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const addStudent = (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
          ? { ...student, ...updates, updatedAt: new Date() }
          : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const approveStudent = (id: string, rollNumber: string, section: string) => {
    updateStudent(id, { status: 'approved', rollNumber, section });
  };

  const rejectStudent = (id: string) => {
    updateStudent(id, { status: 'rejected' });
  };

  const getStudentById = (id: string) => {
    return students.find(student => student.id === id);
  };

  const stats: DashboardStats = {
    totalStudents: students.length,
    pendingAdmissions: students.filter(s => s.status === 'pending').length,
    approvedStudents: students.filter(s => s.status === 'approved').length,
    rejectedStudents: students.filter(s => s.status === 'rejected').length,
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        approveStudent,
        rejectStudent,
        getStudentById,
        stats,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}
