import { categories } from "@/constants/categories";
import { Control, UseFormSetValue, UseFormGetValues, FieldErrors } from "react-hook-form";
import { userDataType } from "../slices/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { cartProduct } from "../slices/cartItemsSlice";

export interface ProductItemProps {
  id: string;
  name: string;
  price: string;
  description: string;
  autor: string;
  images: string[];
  category: category;
  returnable: boolean;
  subCategory: string;
  options?: optionType[];
}

export type product = {
  id: string;
  name: string;
  price: string;
  description: string;
  autor: string;
  images: string[];
  category: category;
  returnable: boolean;
  subCategory: string;
  options?: optionType[];
}


export type optionType = {
    optionName: string,
    optionValue: string[],
}

export interface FormListProps {
  control: Control<ProductItemProps>;
  setValue: UseFormSetValue<ProductItemProps>;
  getValues: UseFormGetValues<ProductItemProps>;
  errors: FieldErrors<ProductItemProps>;
}

export type category = keyof typeof categories;

export interface related {
    category: string | undefined,
    subcategory: string | undefined,
}

export type selectedOptions = Record<string, string>;

export type orderedProductInfo = {
    stock: string,
    options: selectedOptions,
}

export interface handleAddToCartInterface {
    productInfo: ProductItemProps | null, 
    choosenOptions: selectedOptions, 
    setErrorMessage: (message: string) => void, 
    orderedProductInfo: orderedProductInfo, 
    userData: userDataType | null, 
    productId: string | undefined, 
    cartItems: cartProduct[],
    dispatch: Dispatch
}