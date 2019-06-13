import { PolkaOpts } from "polka";

export interface ISettings {
    version: string;
    env: "production" | "development";
    polka: PolkaOpts;
}
