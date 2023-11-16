
module.exports = {

	"testMatch": [
		"**/*.spec.ts"
	],
	"testEnvironment": "node",
	"moduleFileExtensions": [
		"ts",
		"js"
	],
	"transform": {
		"^.+\\.ts$": "ts-jest"
	},
	"coverageDirectory": "coverage",
	"coverageReporters": [
		"text",
		"lcov"
	],
	"collectCoverageFrom": [
		"src/**/*.ts",
		"!src/**/*.d.ts"
	],
	"coverageThreshold": {
		"global": {
			"branches": 80,
			"functions": 80,
			"lines": 80,
			"statements": -10
		}
	},
	"preset": "ts-jest",
	"modulePathIgnorePatterns": [
		"<rootDir>/dist/",
		"<rootDir>/node_modules/",
	],
	"moduleNameMapper": {
		"@/(.*)": "<rootDir>/src/$1",
		"@test/(.*)": "<rootDir>/test/$1"
	}

}
