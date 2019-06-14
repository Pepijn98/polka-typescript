import { Polka, ServerRequest, ServerResponse } from "polka";

export interface IRoute {
    method: string;
    path: string;
    router: Polka;
    run: (req: ServerRequest, res: ServerResponse) => Promise<any>;
}
