module.exports = {
	plugins: [
		"unicorn",
		"sonarjs"
	],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:unicorn/recommended",
		"plugin:sonarjs/recommended"
	],
	rules: {
		"@typescript-eslint/naming-convention": [
			"error",
			{
				"selector": "enum",
				"format": ["PascalCase"],
			},
			{
				"selector": "enumMember",
				"format": ["UPPER_CASE"]
			},
			{
				"selector": "classMethod",
				"format": ["camelCase"],
			},
			{
				"selector": "classProperty",
				"format": ["camelCase"],
			},
			{
				"selector": "class",
				"format": ["PascalCase"],
			},
			{
				"selector": "variable",
				"format": ["camelCase"],
			}
		],

		"unicorn/filename-case": [
			"error",
			{
				"case": "camelCase"
			}
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		'unicorn/no-null': 'off',
		"no-var": "error",
		"prefer-const": 'off'

	}
};
