import { ROUTE_CONSTANTS } from "@/utils/routes";
import { router, useSegments } from "expo-router";
import { useEffect } from "react";

export function Middleware({children, isAuth}: {children: React.ReactNode, isAuth: boolean}) {
    const segments = useSegments();
    const fullPath = '/' + segments.join('/');
    const publicOnlyPaths = [
        '/(tabs)/(auth)/sign-in',
        '/(tabs)/(auth)/sign-up',
    ];

    const privateOnlyPaths = [
        '/(tabs)/profile',
        '/(tabs)/dashboard',
    ];

    useEffect(() => {
        if(publicOnlyPaths.includes(fullPath) && isAuth){
            router.replace(ROUTE_CONSTANTS.HOME);
        }

        if(privateOnlyPaths.includes(fullPath) && !isAuth){
            router.replace(ROUTE_CONSTANTS.AUTH_PROTECTED.LOGIN);
        }
    }, [isAuth, segments]);

    return(<>{children}</>)
}