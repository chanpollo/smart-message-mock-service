import { createLogger, format, transports } from 'winston';
import { join, resolve } from 'path';
import { existsSync, renameSync, mkdirSync } from 'fs';

const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, message }) => {
  return `Time: ${timestamp} - ${message}`;
});

const logDirectory = resolve('./logs');

const getLogFileName = () => join(logDirectory, 'tps.log');
const getRotatedFileName = () => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}00`;
  return join(logDirectory, `${formattedDate}_tps_log.log`);
};

const rotateLogFile = () => {
  const currentLogFile = getLogFileName();
  if (existsSync(currentLogFile)) {
    renameSync(currentLogFile, getRotatedFileName());
  }
};

if (!existsSync(logDirectory)) {
  mkdirSync(logDirectory);
}

const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: getLogFileName() }),
    new transports.Console()
  ]
});

const scheduleLogRotation = () => {
  const now = new Date();
  const msToNextHour = ((60 - now.getMinutes()) * 60 * 1000) - (now.getSeconds() * 1000) - now.getMilliseconds();
  setTimeout(() => {
    rotateLogFile();
    scheduleLogRotation();
  }, msToNextHour);
};

scheduleLogRotation();

export { logger };
