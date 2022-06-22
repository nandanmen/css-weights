export const prompts = [
  {
    code: `#myElement`,
    answer: [1, 0, 0],
  },
  {
    code: `[type="password"]`,
    answer: [0, 1, 0],
  },
  {
    code: `input:focus`,
    answer: [0, 1, 1],
  },
  {
    code: `.myElement`,
    answer: [0, 1, 0],
  },
  {
    code: `:root #myApp input:required`,
    answer: [1, 2, 1],
  },
  {
    code: `#fakeId#fakeId#fakeID`,
    answer: [3, 0, 0],
  },
  {
    code: `.bodyClass .sectionClass .parentClass [id="myElement"]`,
    answer: [0, 4, 0],
  },
  {
    code: `#myApp [id="myElement"]`,
    answer: [1, 1, 0],
  },
  {
    code: `:root input`,
    answer: [0, 1, 1],
  },
  {
    code: `html body main input`,
    answer: [0, 0, 4],
  },
  {
    code: `div:not(.inner) p`,
    answer: [0, 1, 2],
  },
  {
    code: `:is(p, #fakeId)`,
    answer: [1, 0, 0],
  },
  {
    code: `div:not(.inner, #fakeId) p`,
    answer: [1, 0, 2],
  },
  {
    code: `:where(#defaultTheme) a`,
    answer: [0, 0, 1],
  },
  {
    code: `:is(p)`,
    answer: [0, 0, 1],
  },
];
