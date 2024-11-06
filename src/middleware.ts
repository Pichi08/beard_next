import { NextRequest, NextResponse } from "next/server";

// Rutas estáticas que deseas proteger
const staticProtectedRoutes = ['/contact', '/profile', '/administrar'];

// Rutas dinámicas que deseas proteger, utilizando patrones regex
const dynamicProtectedRoutesRegex = /^\/product\/edit\/[^/]+$/;

export default function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("currentUser")?.value;
    const pathname = request.nextUrl.pathname;

    // Verifica si la ruta es estática y protegida
    const isStaticProtectedRoute = staticProtectedRoutes.includes(pathname);
    
    // Verifica si la ruta es dinámica y protegida mediante regex
    const isDynamicProtectedRoute = dynamicProtectedRoutesRegex.test(pathname);

    // Si la ruta es protegida y el usuario no está autenticado, redirige a login
    if (!currentUser && (isStaticProtectedRoute || isDynamicProtectedRoute)) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next(); // Permite el acceso si el usuario está autenticado o si no es una ruta protegida
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
};
