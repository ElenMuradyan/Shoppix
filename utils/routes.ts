export const ROUTE_CONSTANTS = {
    AUTH_PROTECTED: {
        LOGIN: "../(auth)/sign-in",
        REGISTER: "../(auth)/sign-up",
    },
    NOT_AUTH_PROTECTED: {
        
    },
    HOME: "/"
} as const;