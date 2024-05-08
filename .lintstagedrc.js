export default {
  "**/*.(js|cjs|mjs|jsx|json)": [
    "eslint --cache --fix",
    "prettier --write --list-different",
  ],
  "**/*.(ts|tsx|cts|mts)": [
    "eslint --cache --fix",
    "prettier --write --list-different",
    () => "tsc --pretty --noEmit",
  ],
};
