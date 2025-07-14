export interface Student {
  registrationNumber: string;
  admissionNumber: string;
  surname: string;
  firstName: string;
  middleName?: string;
  passportUrl?: string;
  currentAcademicLevel: string;
  currentAcademicClass: string;
  studentCategory: string;

  // Personal Data
  gender: "Male" | "Female";
  dateOfBirth: string; // ISO date string
  religion?: string;
  nationality: string;
  address: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  homeTown?: string;
  languageSpoken?: string;

  // Sponsor Data
  sponsor: {
    name: string;
    photoUrl?: string;
    relationship: string;
    address: string;
    phone: string;
    email?: string;
    occupation: string;
  };

  // Medical Info
  bloodGroup?: string;
  genotype?: string;
  disability?: string;

  // Admission Info
  academicSessionAdmitted: string;
  academicPeriodAdmitted: string;
  academicClassAdmitted: string;
  dateOfAdmission: string; // ISO date string

  createdAt: string; // ISO date string or Firestore Timestamp
  updatedAt: string; // ISO date string or Firestore Timestamp
} 