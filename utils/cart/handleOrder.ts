import { ENV } from "@/constants/env";
import { db } from "@/lib/appwrite";
import { handleOrderInterface } from "@/types/handleOrderInterface";
import { Query } from "react-native-appwrite";

export const handleOrder = async ({
  cart,
  setErrorMessage,
}: handleOrderInterface) => {
  try {
    const filteredCart = cart.filter((item) => item.ordering);

    const stocks = filteredCart.reduce((acc: Record<string, number>, item) => {
      acc[item.productId] = (acc[item.productId] || 0) + Number(item.stock);
      return acc;
    }, {});

    const productIds = Object.keys(stocks);

    const productDocs = await db.listDocuments(
      ENV.DB_ID,
      ENV.DB_PRODUCTS_COL_ID,
      productIds.map((id) => Query.equal("$id", id))
    );

    const productMap: { [key: string]: any } = {};
    productDocs.documents.forEach((doc) => {
      productMap[doc.$id] = doc;
    });

    for (const id of productIds) {
      const requestedQty = stocks[id];
      const product = productMap[id];

      if (!product) {
        const msg = `Product with ID ${id} not found.`;
        setErrorMessage(msg);
        throw new Error(msg);
      }

      if (requestedQty > product.stock) {
        const msg = `Not enough stock for "${product.name}". Requested: ${requestedQty}, Available: ${product.stock}`;
        setErrorMessage(msg);
        throw new Error(msg);
      }
    }
    return { success: true };
  } catch (err: any) {
    console.error(err.message);
    setErrorMessage("Stock verification failed. Try again.");
    return { success: false, message: err.message };
  }
};
