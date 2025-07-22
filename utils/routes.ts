export const ROUTE_CONSTANTS = {
  AUTH_PROTECTED: {
    LOGIN: "/sign-in",
    REGISTER: "/sign-up",
  },
  NOT_AUTH_PROTECTED: {
    CART: "/cart",
    PROFILE: "/profile",
    ORDERS: "/orders" ,
    ADDPRODUCT: '/Product/create-product',
    PLACEORDER: '/Placeorder',
    PRODUCTDETAILS: (id: string) => `/Product/product-details/${id}`,
  },
  HOME: "/",
} as const;