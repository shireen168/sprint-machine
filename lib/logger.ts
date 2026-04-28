function isDev() {
  return process.env.NODE_ENV === 'development';
}

export const logger = {
  debug: (...args: any[]) => {
    if (isDev()) console.debug('[debug]', ...args);
  },
  info: (...args: any[]) => {
    console.log('[info]', ...args);
  },
  error: (...args: any[]) => {
    console.error('[error]', ...args);
  },
  warn: (...args: any[]) => {
    console.warn('[warn]', ...args);
  },
};
