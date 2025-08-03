import { categories } from "@/constants/categories"; 

export const generateSearchHelper = (): string[] => {
  const helperSet = new Set<string>();

  Object.values(categories).forEach((category) => {
    helperSet.add(category.armenianName);

    category.subcategories.forEach((sub) => {
      helperSet.add(sub.armenianName);
    });
  });

  return Array.from(helperSet);
};

export const searchHelper = generateSearchHelper();