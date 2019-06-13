import send from "@polka/send-type";
import settings from "../../../settings";
import { IRoute } from "../../interfaces/IRoute";

const route: IRoute = {
    method: "get",
    path: "/",
    fn: (_req, res) => {
        send(res, 200, {
            statusCode: 200,
            statusMessage: "OK",
            data: {
                message: "Request successfully completed",
                version: settings.version,
                env: settings.env
            }
        });
    }
};

export default route;
