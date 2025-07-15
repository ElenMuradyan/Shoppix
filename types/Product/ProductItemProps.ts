import { categories } from "@/constants/categories";
import { Control, UseFormSetValue, UseFormGetValues, FieldErrors } from "react-hook-form";

export interface ProductItemProps {
  id: string;
  name: string;
  price: string;
  description: string;
  autor: string;
  images: string[];
  category: category;
  subCategory: string;
  stock: string;
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