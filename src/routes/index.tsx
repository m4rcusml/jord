import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    return false ? <AppRoutes /> : <AuthRoutes />
}