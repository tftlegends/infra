module.exports = {
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
			}
		],

		"unicorn/filename-case": [
			"error",
			{
				"case": "kebabCase"
			}
		]
	}
};
