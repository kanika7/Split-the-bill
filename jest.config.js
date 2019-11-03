module.exports = {
  testPathIgnorePatterns: [
    "<rootDir>/scripts/",
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  coverageDirectory: "<rootDir>/coverage/",
  coverageReporters: ["html", "cobertura", "lcov"],
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.{js,jsx}"],
  setupFiles: ["./src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/config/styleMock.js"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
