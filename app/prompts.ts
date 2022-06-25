type Prompt = {
  code: string[];
  answer: Answer;
};

export type Answer = {
  id?: string[];
  class?: string[];
  type?: string[];
  zero?: string[];
};

export const prompts: Prompt[] = [
  {
    code: [`#myId`],
    answer: {
      id: [`#myId`]
    }
  },
  {
    code: [`[type="password"]`],
    answer: {
      class: [`[type="password"]`],
    },
  },
  {
    code: ["input", ":focus"],
    answer: {
      class: [":focus"],
      type: ["input"],
    },
  },
  {
    code: [`.myElement`],
    answer: {
      class: [`.myElement`],
    },
  },
  {
    code: [`:root`, ` `, `#myApp`, ` `, `input`, `:required`],
    answer: {
      id: ["#myApp"],
      class: [":required", ":root"],
      type: ["input"],
    },
  },
  {
    code: ["#myApp", "#myApp", "#myApp"],
    answer: {
      id: ["#myApp"],
    },
  },
  {
    code: [
      ".bodyClass",
      " ",
      ".sectionClass",
      " ",
      ".parentClass",
      " ",
      '[id="myElement"]',
    ],
    answer: {
      class: [
        ".bodyClass",
        ".sectionClass",
        ".parentClass",
        '[id="myElement"]',
      ],
    },
  },
  {
    code: ["#myApp", " ", '[id="myElement"]'],
    answer: {
      id: ["#myApp"],
      class: ['[id="myElement"]'],
    },
  },
  {
    code: [`:root`, ` `, `input`],
    answer: {
      class: [":root"],
      type: ["input"],
    },
  },
  {
    code: [`html`, " ", `body`, " ", `main`, " ", `input`],
    answer: {
      type: ["html", "body", "main", "input"],
    },
  },
  {
    code: [`div`, `:not(.inner)`, " ", `p`],
    answer: {
      class: [":not(.inner)"],
      type: ["div", "p"],
    },
  },
  {
    code: [":is(", "p", ", ", "#fakeId", ")"],
    answer: {
      id: ["#fakeId"],
      zero: ["p"],
    },
  },
  {
    code: ["div", ":not(", ".inner", ", ", "#fakeId", ")", " p"],
    answer: {
      id: ["#fakeId"],
      type: ["div", "p"],
      zero: [".inner"],
    },
  },
  {
    code: [`:where(#defaultTheme)`, " ", "a"],
    answer: {
      type: ["a"],
      zero: [":where(#defaultTheme)"],
    },
  },
  {
    code: [":is(", "p", ")"],
    answer: {
      type: ["p"],
    },
  },
];
