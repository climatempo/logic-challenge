module.exports = {
  roots: ['tests/'],
  verbose: true,
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node', 'geojson'],
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: [
    '!node_modules/**',
    '!src/index.js',
    '!src/constants.js',
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      statements: 80,
      branches: 80,
      functions: 80,
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
}
