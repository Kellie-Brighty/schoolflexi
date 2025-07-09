export type UserRole =
  | "admin"
  | "teacher"
  | "secretary"
  | "proprietor"
  | "parent"
  | "student";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  schoolCode: string;
  schoolName: string;
  profilePicture?: string;
  phone?: string;
  address?: string;

  // Student specific
  studentId?: string;
  classGrade?: string;
  parentEmail?: string;
  dateOfBirth?: string;

  // Teacher specific
  department?: string;
  employeeId?: string;
  qualifications?: string;
  experience?: string;

  // Parent specific
  parentStudentId?: string;
  occupation?: string;
  relationship?: string;

  // Emergency contacts
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface RegisterData {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  schoolCode: string;
  schoolName: string;
  address?: string;

  // Student specific
  studentId?: string;
  classGrade?: string;
  parentEmail?: string;
  dateOfBirth?: string;

  // Teacher specific
  department?: string;
  employeeId?: string;
  qualifications?: string;
  experience?: string;

  // Parent specific
  parentStudentId?: string;
  occupation?: string;
  relationship?: string;

  // Emergency contacts
  emergencyContact?: string;
  emergencyPhone?: string;
}

// New types for multi-tenant system
export interface SchoolRegistrationData {
  // Proprietor information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;

  // School information
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  schoolEmail: string;
  subdomain: string; // greenwood-academy

  // Branding
  logo?: File;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface InvitationData {
  email: string;
  role: UserRole;
  schoolCode: string;
  invitedBy: string;
  expiresAt: Date;
  token: string;

  // Role-specific data
  studentId?: string;
  classGrade?: string;
  department?: string;
  employeeId?: string;
}

export interface AcceptInvitationData {
  token: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
}
