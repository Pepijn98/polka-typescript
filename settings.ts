import send from "@polka/send-type";
import pkg from "./package.json";
import { ISettings } from "./src/interfaces/ISettings";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const settings: ISettings = {
    version: pkg.version,
    env: process.env.NODE_ENV.startsWith("dev") ? "development" : "production",
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
    }
};

export default settings;
