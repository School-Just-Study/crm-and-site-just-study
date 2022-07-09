import { LevelStudent } from "../enums/level-student.enum";

export const levelStudentParser = (level: string) => {
  switch (level) {
    case "A1 Beginner":
      return LevelStudent.A1;
    case "A2 Elementary":
      return LevelStudent.A2;
    case "B1 Intermediate":
      return LevelStudent.B1;
    case "B2 Upper intermediate":
      return LevelStudent.B2;
    case "C1 Advanced":
      return LevelStudent.C1;
  }
};
