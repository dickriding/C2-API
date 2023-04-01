import * as Path from 'path';

import * as BodyParser from 'body-parser';
import * as Express from 'express';
import * as Morgan from 'morgan';
import * as Winston from 'winston';

import { settings } from 'settings';
import { routes } from 'routes';
import { IncomingMessage } from 'http';

const fs = require('fs');

export class Server {
	public app: any;
	public log: Winston.LoggerInstance;
	public router: Express.Router;

	constructor() {
		console.log('Api Server');
		console.log('https://example.com\r\n')
		console.log('Starting C2 API ...');
		this.app = Express();
		this.setLogger();
		this.setConfig();
		this.setRoutes();
	}

	public start() {
		this.app.listen(settings.PORT);
		this.log.info(`- C2 API started at port ${settings.PORT}!`);
	}

	private setConfig() {
		this.app.use('/', Express.static(settings.PUBLIC_PATH));
		this.app.use(BodyParser.json());
		this.log.info(`- Configs setted`);
	}

	private setRoutes() {
		routes(this.app);
		this.log.info(`- Routes setted`);
	}

	private setLogger() {
		const logFile = `${settings.LOG_PATH}/${new Date().toISOString().replace(/:/g, '-')}.log`;
		fs.writeFileSync(logFile, '');
	
		this.log = new Winston.Logger({
			transports: [
				new Winston.transports.File({
					level: 'info',
					filename: Path.resolve(settings.LOG_PATH, `${new Date().toISOString().replace(/:/g, '-')}.log`),
					handleExceptions: true,
					json: true,
					maxsize: 5242880,
					maxFiles: 5,
					colorize: false,
					
				}),
				new Winston.transports.Console({
					level: 'debug',
					handleExceptions: true,
					json: false,
					colorize: true,
				}),
			],
			exitOnError: false,
		});

		const morganOptions: Morgan.Options<IncomingMessage, any> = {
			stream: {
				write: (message: string) => {
					this.log.info(message);
				},
			},
		};

		this.app.use(Morgan('combined', morganOptions));
		this.log.info(`- Logger initialized`);
	}
}
