import morgan from "morgan";
import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";

export const logger = WinstonModule.createLogger({
  transports: [
    // file on daily rotation (error only)
    new transports.File({
      filename: `logs/error.log`,
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
      zippedArchive: false,
    }),
    // same for all levels
    new transports.File({
      filename: `logs/combined.log`,
      format: format.combine(format.timestamp(), format.json()),
      zippedArchive: false,
    }),
    new transports.Console({
      format: format.combine(
        format.cli({
          colors: {
            info: "blue",
            error: "red",
            warn: "orange",
          },
          all: true,
        }),
        format.splat(),
        format.timestamp({
          format: "HH:mm:ss",
        }),
        format.printf((info) => {
          return `[${info.timestamp}] ${info.level}: ${info.message}`;
        })
      ),
    }),
  ],
});

export const requestLogger = morgan("tiny", {
  stream: {
    write: (str: string) => logger.log(str.replace("\n", "")),
  },
});
