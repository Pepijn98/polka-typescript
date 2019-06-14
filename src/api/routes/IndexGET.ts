import send from "@polka/send-type";
import Collection from "@kurozero/collection";
import APIRouter from "../Router";
import settings from "../../../settings";
import BaseRoute from "../BaseRoute";
import { Polka, ServerRequest, ServerResponse } from "polka";

export default class IndexGET extends BaseRoute {
    public method: string;
    public path: string;
    public router: Polka;
    public routes: Collection<BaseRoute>;

    public constructor(api: APIRouter) {
        super();

        this.method = "get";
        this.path = "/";
        this.router = api.router;
        this.routes = api.routes;

        this.router[this.method](this.path, this.run.bind(this));
    }

    public async run(_req: ServerRequest, res: ServerResponse): Promise<void> {
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
    }
}
