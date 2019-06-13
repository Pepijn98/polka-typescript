import send from "@polka/send-type";
import Collection from "@kurozero/collection";
import APIRouter from "../Router";
import settings from "../../../settings";
import { IRoute } from "../../interfaces/IRoute";
import { Polka, IncomingMessage, ServerResponse } from "polka";

export default class IndexGET implements IRoute {
    public method: string;
    public path: string;
    public router: Polka;
    public routes: Collection<IRoute>;

    public constructor(api: APIRouter) {
        this.method = "get";
        this.path = "/";
        this.router = api.router;
        this.routes = api.routes;

        this.router.get(this.path, (_req: IncomingMessage, res: ServerResponse) => {
            send(res, 200, {
                statusCode: 200,
                statusMessage: "OK",
                data: {
                    message: "Request successfully completed",
                    version: settings.version,
                    env: settings.env,
                    routes: this.routes.map((v) => `${v.method.toUpperCase()} => ${v.path}`).sort()
                }
            });
        });
    }
}
