// para instalar o ESLint
npm install eslint --save-dev

//configurando o ESLint
npx eslint --init

{
  "extends": ["eslint:recommended"]
}

exports.modelComposition = function (model, period) {
  const compositions = []

  // Write the code here

  return compositions
}

// Exporting the linter configuration object
exports.eslintConfig = {
  files: ['*.js'],
  options: {
    fix: true
  }
}

{
  "scripts": {
    "lint": "eslint ."
  }
}

npm run lint
