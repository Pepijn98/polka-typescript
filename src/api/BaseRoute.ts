import { IRoute } from "../interfaces/IRoute";
import { Polka, ServerRequest, ServerResponse } from "polka";

export default abstract class BaseRoute implements IRoute {
    public abstract method: string;
    public abstract path: string;
    public abstract router: Polka;
    [x: string]: unknown | undefined;

    public abstract async run(req: ServerRequest, res: ServerResponse): Promise<any>;
}
