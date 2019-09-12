module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/dist/test'],
    coveragePathIgnorePatterns: ['/node_modules/'],
};
