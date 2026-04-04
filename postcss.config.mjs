const config = {
	plugins: {
		'@tailwindcss/postcss': {},
		'postcss-flexbugs-fixes': {},
		'postcss-preset-env': {
			autoprefixer: { flexbox: 'no-2009' },
			stage: 3,
			features: {
				'nesting-rules': true,
			},
		},
	},
};

export default config;
