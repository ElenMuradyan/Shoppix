export const ROUTE_CONSTANTS = {
    AUTH_PROTECTED: {
        LOGIN: "/sign-in",
        REGISTER: "/sign-up",
    },
    NOT_AUTH_PROTECTED: {
        
    },
    HOME: "/",
    SEARCH: '/search',
    CART: '/cart',
    PROFILE: '/profile',
    ORDERS: '/orders',
    ADDPRODUCT: '/Product/create-product',
} as const;