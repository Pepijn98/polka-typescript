import Collection from "@kurozero/collection";
import path from "path";
import settings from "../../settings";
import BaseRoute from "./BaseRoute";
import polka, { Polka } from "polka";
import { promises as fs } from "fs";

export default class APIRouter {
    public router: Polka;
    public routes: Collection<BaseRoute>;
    public path: string;

    public constructor() {
        this.router = polka(settings.polka);
        this.routes = new Collection(BaseRoute);
        this.path = "/api";
    }

    public async loadRoutes(): Promise<void> {
        const files = await fs.readdir(path.join(__dirname, "routes"));
        for (const file of files) {
            if (file.endsWith(".ts")) {
                const route: BaseRoute = new (await import(path.join(__dirname, "routes", file))).default(this);
                this.routes.add(route);
                console.info(`Connected route: ${route.method.toUpperCase()}\t=> ${this.path}${route.path}`);
            }
        }
    }
}
