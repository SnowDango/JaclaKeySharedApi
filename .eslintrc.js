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
    "no-var": 2, // varの禁止
    "block-spacing": 1, // 単一行ブロックで内側スペースの挿入を強制
    "indent": ["error", 2, {"SwitchCase": 1}], // intentを2
    "no-trailing-spaces": 2, // 行の末尾へのスペースの付与を禁止
    "space-infix-ops": 1, // 演算子の前後にスペースを強制
    "dot-notation": 1, // ドット表記可能な場合にドット表記を強制
    "no-inferrable-types": 0, // number,string,booleanの初期化済みの型宣言を許可、冗長なコードを排除しない
    "eqeqeq": 2, // == を禁止、===に強制
    "no-ex-assign": 2, // catch内でのExceptionへの参照に上書きを禁止
    "no-extra-boolean-cast": 2, // Booleanへのcastを禁止
    "no-func-assign": 2, // functionの上書きを禁止
    "accessor-pairs": 1, // setter,getterをPairで作ることを強制
    "no-undef-init": 2, // 変数定義時にundefinedで初期を行わないこと
    "no-undef": 1, // 未定義の変数は利用しないこと
    "no-constant-condition": 2, // 条件判定文が定数のみの判定になっていないこと
    "no-duplicate-case": 2, // 重複するcase文を作らないこと
    "no-extra-semi": 1, // 不要なセミコロンの記述しないこと
    "no-sparse-arrays": 2, // 配列においてまばらな値設定を行わないこと
    "no-process-env": 1, // process.env は使わないこと
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-unsafe-assignment": 1,
    "@typescript-eslint/no-unsafe-return": 1,
    "@typescript-eslint/no-unsafe-call": 1,
    "@typescript-eslint/no-unsafe-member-access": 1,
    "@typescript-eslint/naming-convention": [
      "error", { // class, interface, typeAlias, enum, typeParameterについてPascalCase以外不許可
        "selector": "typeLike",
        "format": ["PascalCase"],
      }, { // variableについてcamelCase,UPPER_CASE以外不許可
        "selector": ["variable", "property"],
        "format": ["camelCase", "UPPER_CASE", "PascalCase"],
      }, { // classMethod, objectLiteralMethod, typeMethod, accessor, parameterProperty, parameter, function, property
        // についてcamelCase以外不許可
        "selector": ["method", "accessor", "parameterProperty", "parameter", "function"],
        "format": ["camelCase"]
      }, {
        // enumMemberについてUPPER_CASE以外不許可
        "selector": ["enumMember"],
        "format": ["UPPER_CASE"]
      }
    ]
  },
};