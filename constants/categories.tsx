import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export const categories = {
  Laundry: {
    armenianName: "Լվացք",
    icon: <MaterialIcons name="local-laundry-service" size={24} color="black" />,
    subcategories: [
      { name: "Baskets", armenianName: "Զամբյուղներ" },
      { name: "Detergents", armenianName: "Լվացքի միջոցներ" },
      { name: "Dryers", armenianName: "Չորանոցներ" },
      { name: "Organizers", armenianName: "Կազմակերպիչներ" },
    ],
  },
  Kitchen: {
    armenianName: "Խոհանոց",
    icon: <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="black" />,
    subcategories: [
      { name: "Cookware", armenianName: "Թավաներ և կաթսաներ" },
      { name: "Cutlery", armenianName: "Դանակ-պատառաքաղ" },
      { name: "Storage", armenianName: "Պահեստավորում" },
      { name: "Textiles", armenianName: "Սրբիչներ և գոգնոցներ" },
    ],
  },
  Cleaning: {
    armenianName: "Մաքրություն",
    icon: <MaterialCommunityIcons name="broom" size={24} color="black" />,
    subcategories: [
      { name: "Sprays", armenianName: "Մաքրող միջոցներ" },
      { name: "Brushes", armenianName: "Խոզանակներ" },
      { name: "Mops", armenianName: "Մոփեր" },
      { name: "Gloves", armenianName: "Ձեռնոցներ" },
    ],
  },
  Plants: {
    armenianName: "Բույսեր",
    icon: <MaterialCommunityIcons name="flower-outline" size={24} color="black" />,
    subcategories: [
      { name: "Pots", armenianName: "Կաթսաներ բույսերի համար" },
      { name: "Seeds", armenianName: "Սերմեր" },
      { name: "Tools", armenianName: "Գործիքներ" },
      { name: "Decorations", armenianName: "Դեկորացիաներ" },
    ],
  },
  Decor: {
    armenianName: "Դեկոր",
    icon: <MaterialCommunityIcons name="sofa-outline" size={24} color="black" />,
    subcategories: [
      { name: "Wall Art", armenianName: "Պատային արվեստ" },
      { name: "Vases", armenianName: "Ծաղկամաններ" },
      { name: "Cushions", armenianName: "Բարձիկներ" },
      { name: "Lights", armenianName: "Լուսամփոփներ" },
    ],
  },
  Bathroom: {
    armenianName: "Լոգասենյակ",
    icon: <MaterialCommunityIcons name="shower" size={24} color="black" />,
    subcategories: [
      { name: "Towels", armenianName: "Սրբիչներ" },
      { name: "Storage", armenianName: "Պահեստավորում" },
      { name: "Shower Items", armenianName: "Լոգանքի պարագաներ" },
      { name: "Mats", armenianName: "Գորգիկներ" },
    ],
  },
  Appliances: {
    armenianName: "Կենցաղային սարքեր",
    icon: <MaterialCommunityIcons name="fridge-outline" size={24} color="black" />,
    subcategories: [
      { name: "Small Appliances", armenianName: "Փոքր սարքեր (բլենդեր, հացթուխ)" },
      { name: "Large Appliances", armenianName: "Մեծ սարքեր (սառնարան, լվացքի մեքենա)" },
    ],
  },
};
