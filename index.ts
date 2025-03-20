import * as log4js from '@log4js-node/log4js-api';
import * as path from 'path';
import type { BotProxy } from './bot-proxy.interface.ts';
import type { MessageContext } from './message-context.interface.ts';

let mBot: BotProxy;
let logger: log4js.Logger;

export const init = async (bot: BotProxy, options: { [key: string]: any }): Promise<void> => {
    mBot = bot;
    logger = options.logger || console;
    const { default: metadata } = await import(path.resolve(import.meta.dirname, 'package.json'), { with: { type: "json" } });

    logger.info(`${metadata.name} plugin v${metadata.version} has been initialized.`);
};

export const onStart = () => {
    logger.debug('onStart()');
};

export const onStop = () => {
    logger.debug('onStop()');
};

export const onMessage = async (message: string, context: MessageContext, data: { [key: string]: any }) => {
    await mBot.sendTalk(await mBot.getChannelId(process.env.REC0_ENV_SINDOI_CHANNEL || 'sindoi'),
        `しんどい……${message.split(' ').slice(1).join(' ')}`);
};

export const onPluginEvent = (eventName: string, value?: any, fromId?: string) => {
    // Nop
};
