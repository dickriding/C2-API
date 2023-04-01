import { Server } from 'server';

export const app: any = new Server;

app.start();
export const log = app.log;
