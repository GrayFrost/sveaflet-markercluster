import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/routes/**/*.{html,js,svelte,ts}',
		'./src/app.html',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'selector',
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				}
			},
			zIndex: {
				1002: '1002', // header
				1001: '1001', // sidebar
			}
		}
	},

	plugins: []
} as Config;
