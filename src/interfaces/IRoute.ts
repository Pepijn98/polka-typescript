import { Polka } from "polka";
import { IncomingMessage, ServerResponse } from "http";

export interface IRoute {
    method: string;
    path: string;
    router: Polka;
    run: (req: IncomingMessage, res: ServerResponse) => Promise<any>
}
