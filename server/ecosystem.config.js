module.exports = {
	apps: [
		{
			name: "whispr",
			script: "./dist/bin/www.js",
			env: {
				"NODE_ENV": "development",
			},
			env_production : {
				"NODE_ENV": "production"
			}
		}
	]
}