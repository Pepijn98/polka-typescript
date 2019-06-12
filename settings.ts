import pkg from "./package.json";
import { ISettings } from "./src/interfaces/ISettings";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const settings: ISettings = {
    version: pkg.version,
    env: process.env.NODE_ENV.startsWith("dev") ? "development" : "production"
}

export default settings;
