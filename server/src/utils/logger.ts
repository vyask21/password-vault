/* import pino from "pino";
import pinoPretty from "pino-pretty"

const logger = pino({
    prettifier: pinoPretty(),
  });
  

export default logger; */
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      ignore: "hostname",
    },
  },
});

export default logger;