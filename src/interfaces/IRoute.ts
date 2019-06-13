import { Polka } from "polka";

export interface IRoute {
    [x: string]: any | undefined;
    method: string;
    path: string;
    router: Polka;
}
