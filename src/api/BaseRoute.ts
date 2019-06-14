import { IRoute } from "../interfaces/IRoute";
import { Polka } from "polka";
import { IncomingMessage, ServerResponse } from "http";

export default abstract class BaseRoute implements IRoute {
    public abstract method: string;
    public abstract path: string;
    public abstract router: Polka;
    [x: string]: unknown | undefined;

    public abstract async run(req: IncomingMessage, res: ServerResponse): Promise<any>;
}
