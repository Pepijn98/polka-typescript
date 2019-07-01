import { PolkaOpts } from "polka";

interface APISettings {
    headers: Record<string|number|symbol, any>;
    [x: string]: any | undefined;
}

export interface ISettings {
    version: string;
    env: "production" | "development";
    polka: PolkaOpts;
    api: APISettings;
}
