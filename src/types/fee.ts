export interface FeeSetup {
  academicSession: string;
  academicPeriod: string;
  academicLevel: string;
  academicClass: string;
  tuitionFee: number;
  schoolUniformFee?: number;
  ptaFee?: number;
  sportWearFee?: number;
  noteBooksFee?: number;
  reportCardFee?: number;
  schoolEventsFee?: number;
  textbooksFee?: number;
  registrationFee?: number;
  ictFee?: number;
  otherFee?: number;
  totalStudentFee: number;
  createdAt: string; // ISO date string or Firestore Timestamp
  updatedAt: string; // ISO date string or Firestore Timestamp
} 