module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019, // Node.js 12の場合は2019、他のバージョンのNode.jsを利用している場合は場合は適宜変更する
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json']
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    "no-inferrable-types": 0,
    "@typescript-eslint/naming-convention": [
      // classについてPascalCase以外不許可
      "error", {
        "selector": ["class","interface","enum"],
        "format": ["PascalCase"],
      }/*,{
        "selector": ["variable","function","method"],
        "format": ["camelCase"],
      },{
        "selector": "variable",
        "type": ["boolean"],
        "format": ["camelCase"],
        "prefix": ["is", "should","can","has"]
      },{
        "selector":["enumMember"],
        "format":["UPPER_CASE"]
      },{
        "selector":["parameter"],
        "format":["snake_case"]
      }*/
    ]
  },
};