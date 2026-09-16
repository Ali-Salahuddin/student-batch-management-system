export interface BatchData {
  courseName: string;
  instructor: string;
  batchCode: string;
  timing: string;
  classesPerWeek: number;
  classDays: number[];
  durationMonths: number;
  startDate: string;
  fee: number;
  // totalStudents: number;
  mode: string;
  enrolledStudents: number;
}
export interface Batch extends BatchData {
  _id: string;
}