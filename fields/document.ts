import { document } from "@keystone-6/fields-document";

export const content = document({
  formatting: {
    inlineMarks: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      code: true,
      superscript: true,
      subscript: true,
      keyboard: true,
    },
    listTypes: {
      ordered: true,
      unordered: true,
    },
    alignment: {
      center: true,
      end: true,
    },
    headingLevels: [2, 3, 4, 5, 6],
    blockTypes: {
      blockquote: true,
      code: true,
    },
    softBreaks: true,
  },
  dividers: true,
  links: true,
  layouts: [
    [1, 1],
    [1, 1, 1],
    [2, 1],
    [1, 2],
    [1, 2, 1],
  ],
});
