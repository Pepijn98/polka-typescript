import { IncomingMessage, ServerResponse } from "http";

interface PolkaSettings {
    onError: (err: string | Error, req: IncomingMessage, res: ServerResponse, next: Function) => void;
    onNoMatch: (req: IncomingMessage, res: ServerResponse) => void;
}

export interface ISettings {
    version: string;
    env: "production" | "development";
    polka: PolkaSettings;
}
