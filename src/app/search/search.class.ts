export class Student {
  constructor(public id: number, public name: string) {}
}

export interface IStudentResponse {
  total: number;
  results: Student[];
}
