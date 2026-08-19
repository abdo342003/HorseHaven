import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(fr|ar|en)/:path*", "/((?!_next|api|studio|favicon.ico|images|.*\\..*).*)"],
};