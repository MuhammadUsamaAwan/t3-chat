import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { appRouter } from './router';
import { createContext } from './router/context';

const wss = new ws.Server({
  port: 3001,
});

const handler = applyWSSHandler({ wss, router: appRouter, createContext });

wss.on('connection', () => {
  wss.once('close', () => {});
});

process.on('SIGTERM', () => {
  handler.broadcastReconnectNotification();
  wss.close();
});
