import { RootState } from "@/store/store";
import { ROUTE_CONSTANTS } from "@/utils/routes";
import { router, useSegments } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function Middleware({children}: {children: React.ReactNode}) {
    const { authUserInfo: {isAuth}} = useSelector((store: RootState) => store.userData);
    const segments = useSegments();
    const fullPath = '/' + segments.join('/');
    const publicOnlyPaths = [
        '/sign-in',
        '/sign-up',
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