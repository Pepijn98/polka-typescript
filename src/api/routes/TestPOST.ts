import send from "@polka/send-type";
import APIRouter from "../Router";
import BaseRoute from "../BaseRoute";
import settings from "../../../settings";
import { Polka, ServerRequest, ServerResponse } from "polka";

export default class TestPOST extends BaseRoute {
    public method: string;
    public path: string;
    public router: Polka;

    public constructor(api: APIRouter) {
        super();

        this.method = "post";
        this.path = "/test";
        this.router = api.router;

        this.router[this.method](this.path, this.run.bind(this));
    }

    public async run(req: ServerRequest, res: ServerResponse): Promise<void> {
        if (req.body && Object.entries(req.body).length !== 0) {
            send(res, 200, {
                statusCode: 200,
                statusMessage: "OK",
                data: {
                    message: "Request successfully completed",
                    requestBody: req.body
                }
            }, settings.api.headers);
        } else {
            send(res, 400, {
                statusCode: 400,
                statusMessage: "Bad Request",
                data: {
                    message: "Missing request body"
                }
            }, settings.api.headers);
        }
    }
}
