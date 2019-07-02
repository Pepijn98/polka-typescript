import send from "@polka/send-type";
import pkg from "./package.json";
import { ISettings } from "./src/interfaces/ISettings";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV.startsWith("dev") ? "development" : "production";

const settings: ISettings = {
    version: pkg.version,
    env,
    polka: {
        onError: (err, _req, res) => {
            console.error(err);
            send(res, 500, {
                statusCode: 500,
                statusMessage: "Internal Server Error",
                data: {
                    message: typeof err === "string" ? err : err.toString()
                }
            });
        },
        onNoMatch: (_req, res) => {
            send(res, 404, {
                statusCode: 404,
                statusMessage: "Not Found",
                data: {
                    message: "Route does not exist"
                }
            });
        }
    },
    api: {
        headers: {
            "x-powered-by": "polka",
            env
        }
    }
};

export default settings;
