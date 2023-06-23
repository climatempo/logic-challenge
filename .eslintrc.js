npm install eslint --save-dev

touch .eslintrc.js

module.exports = {
  extends: [
    'standard'
  ],
  rules: {
    'space-infix-ops': 'off',
  },
};

npx eslint .
