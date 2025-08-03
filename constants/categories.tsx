import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export const returnTypes = [
    {
        label: 'Ենթակա է վերադարձի',
        value: true
    },
    {
        label: 'Ենթակա չէ վերադարձի',
        value: false
    }
]

export interface category {
    armenianName: string,
    icon: React.ReactNode,
    imageName: string,
    imagePath: number,
    subcategories: subcategory[],
}

export interface subcategory {
    name: string,
    armenianName: string,
    icon: React.ReactNode,
}

export const categories: Record<string, category> = {
  Laundry: {
    armenianName: "Լվացք",
    icon: <MaterialIcons name="local-laundry-service" size={24} color="black" />,
    imageName: "laundry.jpg",
    imagePath: require("../assets/images/Categories/laundry.jpg"),
    subcategories: [
      { name: "Baskets", armenianName: "Զամբյուղներ", icon: <MaterialCommunityIcons name="basket" size={20} color="black" /> },
      { name: "Detergents", armenianName: "Լվացքի միջոցներ", icon: <MaterialCommunityIcons name="spray-bottle" size={20} color="black" /> },
      { name: "Dryers", armenianName: "Չորանոցներ", icon: <MaterialCommunityIcons name="tumble-dryer" size={20} color="black" /> },
      { name: "Organizers", armenianName: "Կազմակերպիչներ", icon: <MaterialIcons name="category" size={20} color="black" /> },
    ],
  },
  Kitchen: {
    armenianName: "Խոհանոց",
    icon: <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="black" />,
    imageName: "kitchen.jpg",
    imagePath: require("../assets/images/Categories/kitchen.jpg"),
    subcategories: [
      { name: "Cookware", armenianName: "Թավաներ և կաթսաներ", icon: <MaterialCommunityIcons name="pot" size={20} color="black" /> },
      { name: "Cutlery", armenianName: "Դանակ-պատառաքաղ", icon: <MaterialCommunityIcons name="silverware" size={20} color="black" /> },
      { name: "Storage", armenianName: "Պահեստավորում", icon: <MaterialCommunityIcons name="fridge-outline" size={20} color="black" /> },
      { name: "Textiles", armenianName: "Սրբիչներ և գոգնոցներ", icon: <MaterialCommunityIcons name="tshirt-crew-outline" size={20} color="black" /> },
    ],
  },
  Cleaning: {
    armenianName: "Մաքրություն",
    icon: <MaterialCommunityIcons name="broom" size={24} color="black" />,
    imageName: "cleaning.jpg",
    imagePath: require("../assets/images/Categories/cleaning.jpg"),
    subcategories: [
      { name: "Sprays", armenianName: "Մաքրող միջոցներ", icon: <MaterialCommunityIcons name="spray-bottle" size={20} color="black" /> },
      { name: "Brushes", armenianName: "Խոզանակներ", icon: <MaterialCommunityIcons name="brush" size={20} color="black" /> },
      { name: "Mops", armenianName: "Մոփեր", icon: <MaterialCommunityIcons name="broom" size={20} color="black" /> },
      { name: "Gloves", armenianName: "Ձեռնոցներ", icon: <FontAwesome5 name="hand-paper" size={24} color="black" /> },
    ],
  },
  Plants: {
    armenianName: "Բույսեր",
    icon: <MaterialCommunityIcons name="flower-outline" size={24} color="black" />,
    imageName: "plants.jpg",
    imagePath: require("../assets/images/Categories/plants.jpg"),
    subcategories: [
      { name: "Pots", armenianName: "Կաթսաներ բույսերի համար", icon: <MaterialCommunityIcons name="flower" size={24} color="black" />},
      { name: "Seeds", armenianName: "Սերմեր", icon: <MaterialCommunityIcons name="grain" size={20} color="black" /> },
      { name: "Tools", armenianName: "Գործիքներ", icon: <MaterialCommunityIcons name="shovel" size={20} color="black" /> },
      { name: "Decorations", armenianName: "Դեկորացիաներ", icon: <MaterialCommunityIcons name="star-outline" size={20} color="black" /> },
    ],
  },
  Decor: {
    armenianName: "Դեկոր",
    icon: <MaterialCommunityIcons name="sofa-outline" size={24} color="black" />,
    imageName: "decor.jpg",
    imagePath: require("../assets/images/Categories/decor.jpg"),
    subcategories: [
      { name: "WallArt", armenianName: "Պատային արվեստ", icon: <MaterialCommunityIcons name="palette" size={20} color="black" /> },
      { name: "Vases", armenianName: "Ծաղկամաններ", icon: <MaterialCommunityIcons name="cup-outline" size={20} color="black" /> },
      { name: "Cushions", armenianName: "Բարձիկներ", icon: <MaterialCommunityIcons name="sofa" size={20} color="black" /> },
      { name: "Lights", armenianName: "Լուսամփոփներ", icon: <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="black" /> },
    ],
  },
  Bathroom: {
    armenianName: "Լոգասենյակ",
    icon: <MaterialCommunityIcons name="shower" size={24} color="black" />,
    imageName: "bathroom.jpg",
    imagePath: require("../assets/images/Categories/bathroom.jpg"),
    subcategories: [
      { name: "Towels", armenianName: "Սրբիչներ", icon: <MaterialCommunityIcons name="owl" size={20} color="black" /> },
      { name: "Storage", armenianName: "Պահեստավորում", icon: <MaterialCommunityIcons name="home" size={20} color="black" /> },
      { name: "Shower Items", armenianName: "Լոգանքի պարագաներ", icon: <MaterialCommunityIcons name="shower-head" size={20} color="black" /> },
      { name: "Mats", armenianName: "Գորգիկներ", icon: <MaterialCommunityIcons name="rug" size={20} color="black" /> },
    ],
  },
  Appliances: {
    armenianName: "Կենցաղային սարքեր",
    icon: <MaterialCommunityIcons name="fridge-outline" size={24} color="black" />,
    imageName: "appliances.jpg",
    imagePath: require("../assets/images/Categories/appliances.jpg"),
    subcategories: [
      { name: "Small Appliances", armenianName: "Փոքր սարքեր (բլենդեր, հացթուխ)", icon: <MaterialCommunityIcons name="toaster" size={20} color="black" /> },
      { name: "Large Appliances", armenianName: "Մեծ սարքեր (սառնարան, լվացքի մեքենա)", icon: <MaterialCommunityIcons name="fridge" size={20} color="black" /> },
    ],
  },
};

export const categoryTranslations: Record<string, string> = {
  Laundry: "Լվացք",
  Baskets: "Զամբյուղներ",
  Detergents: "Լվացքի միջոցներ",
  Dryers: "Չորանոցներ",
  Organizers: "Կազմակերպիչներ",

  Kitchen: "Խոհանոց",
  Cookware: "Թավաներ և կաթսաներ",
  Cutlery: "Դանակ-պատառաքաղ",
  Storage: "Պահեստավորում",
  Textiles: "Սրբիչներ և գոգնոցներ",

  Cleaning: "Մաքրություն",
  Sprays: "Մաքրող միջոցներ",
  Brushes: "Խոզանակներ",
  Mops: "Մոփեր",
  Gloves: "Ձեռնոցներ",

  Plants: "Բույսեր",
  Pots: "Կաթսաներ բույսերի համար",
  Seeds: "Սերմեր",
  Tools: "Գործիքներ",
  Decorations: "Դեկորացիաներ",

  Decor: "Դեկոր",
  WallArt: "Պատային արվեստ",
  Vases: "Ծաղկամաններ",
  Cushions: "Բարձիկներ",
  Lights: "Լուսամփոփներ",

  Bathroom: "Լոգասենյակ",
  Towels: "Սրբիչներ",
  ShowerItems: "Լոգանքի պարագաներ",
  Mats: "Գորգիկներ",

  Appliances: "Կենցաղային սարքեր",
  SmallAppliances: "Փոքր սարքեր (բլենդեր, հացթուխ)",
  LargeAppliances: "Մեծ սարքեր (սառնարան, լվացքի մեքենա)"
};