export interface Batch {
   _id: string;
  courseName: string;
  batchCode: string;
  instructor: string;
  timing: string;
  classesPerWeek: number;
  duration: string;
  startDate: string;
  mode: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;

  batch: Batch | null;
}