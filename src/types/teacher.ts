export interface Teacher {
  // Profile
  fullName: string;
  classAssigned: string;        // e.g., "Primary 3"
  classLevel: string;           // e.g., "Basic 3"
  phoneNumber: string;          // e.g., "023-000-000-0000"
  email: string;
  address?: string;
  signatureUrl?: string;        // URL to uploaded signature image
  photoUrl?: string;            // URL to uploaded teacher photo

  // Login Profile
  userId: string;
  userPassword: string;         // Store hashed password, not plain text, in production

  createdAt: string;            // ISO date string or Firestore Timestamp
  updatedAt: string;            // ISO date string or Firestore Timestamp
} 