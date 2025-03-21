export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
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
    '/LoadImage/',
    '/RenderPDF/',
    '/GenerateRandomStr/'
  ]
}
