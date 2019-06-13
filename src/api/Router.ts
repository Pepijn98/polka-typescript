import Collection from "@kurozero/collection";
import path from "path";
import send from "@polka/send-type";
import polka, { Polka, IncomingMessage, ServerResponse } from "polka";
import { promises as fs } from "fs";
import { IRoute } from "../interfaces/IRoute";

export default class APIRouter {
    public router: Polka;
    public routes: Collection<IRoute>;
    public path: string;

    public constructor() {
        this.router = polka();
        this.routes = new Collection();
        this.path = "/api";
    }

    public async loadRoutes(): Promise<void> {
        const files = await fs.readdir(path.join(__dirname, "routes"));
        for (const file of files) {
            if (file.endsWith(".ts")) {
                const route: IRoute = new (await import(path.join(__dirname, "routes", file))).default(this);
                this.routes.add(route);
                console.info(`Connected route: ${this.path}${route.path}`);
            }
        }

        this.router.get("*", this._notFound);
        this.router.post("*", this._notFound);
    }

    private _notFound(_req: IncomingMessage, res: ServerResponse): void {
        send(res, 404, {
            statusCode: 404,
            statusMessage: "Not Found",
            data: {
                message: "Route does not exist"
            }
        });
    }
}
