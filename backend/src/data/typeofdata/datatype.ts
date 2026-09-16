export interface Batchdatatype {
  id: number;
  courseName: string;
  instructor: string;
  batchCode: string;
  timing: string;
  classesPerWeek: number;
  classDays: number[];
  durationMonths: number;
  startDate: string;
  fee: number;
  totalStudents: number;
  mode: string;
}