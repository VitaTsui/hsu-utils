export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/build/tsconfig.json'
    }
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  coveragePathIgnorePatterns: [
    '/lib/',
    '/es/',
    '/dist/',
    '/node_modules/',
    '/DownloadFile/',
    '/GetStrSize/',
    '/LoadFont/',
    '/LoadImage/',
    '/RenderPDF/',
    '/GenerateRandomStr/'
  ]
}
