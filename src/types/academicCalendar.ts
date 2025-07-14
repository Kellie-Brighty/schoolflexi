export interface AcademicCalendar {
  academicSession: string;      // e.g., "2024/2025"
  academicPeriod: string;       // e.g., "1st Term"
  resumptionDate: string;       // ISO date string, e.g., "2024-09-10"
  vacationDate: string;         // ISO date string, e.g., "2024-12-15"
  status: "Active" | "Inactive" | "Completed";
  action?: string;              // e.g., "Edit", "Delete", or any action label
  createdAt: string;            // ISO date string or Firestore Timestamp
  updatedAt: string;            // ISO date string or Firestore Timestamp
} 