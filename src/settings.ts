import * as Path from 'path';

export const settings = {
	LOG_PATH: process.env.LOG_PATH || Path.resolve(__dirname, '../log'),
	PORT: process.env.PORT || 3000,
	PUBLIC_PATH: process.env.PUBLIC_PATH || Path.resolve(__dirname, '../public'),
	MIRAI: {
		OPEN: false,
		IP: "",
		PORT: 0,
		USER: "",
		PASSWORD: "",
		COMMAND_PREFIX: "",
		METHODS: [
			'UDP', 
			'TCP',
			'HTTP',
			'SYN',
			'ICMP',
			'DNS',
			'PLAIN'
		]
	},
	QBOT: {
		OPEN: false,
		IP: "",
		PORT: 0,
		USER: "",
		PASSWORD: "",
		COMMAND_PREFIX: "",
		METHODS: [
			'UDP', 
			'TCP',
			'HTTP',
			'SYN',
			'ICMP',
			'DNS',
			'PLAIN'
		]
	}
};
