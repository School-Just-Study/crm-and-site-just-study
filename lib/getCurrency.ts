import { Language } from "../enums/language.enum";

export const getCurrency = (language: Language | string) => {
  switch (language) {
    case Language.Russian:
      return `₽`;
    default:
      return "$";
  }
};
