module.exports = {
	apps: [
		{
			name: "whispr",
			script: "./dist/bin/www.js",
			node_args: "-r dotenv/config",
			env: {
				"NODE_ENV": "development",
			},
			env_production : {
				"NODE_ENV": "production"
			}
		}
	]
}