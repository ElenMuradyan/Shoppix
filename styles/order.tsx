import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
pageTitle: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#1f2937",
  marginBottom: 12,
  textAlign: "center",
},

container: {
  backgroundColor: "#ffffff",
  padding: 20,
  borderRadius: 20,
  elevation: 5,
  gap: 20,
},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: "#6b7280",
    fontSize: 14,
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#111827",
  },

  statusBox: {
  flexDirection: "row",
  alignItems: "center",
  padding: 12,
  borderRadius: 12,
  backgroundColor: "#fef3c7", // fallback color
  gap: 8,
  marginTop: 8,
},

statusText: {
  fontWeight: "600",
  fontSize: 15,
  color: "#92400e",
},
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  address: {
    fontSize: 14,
    color: "#374151",
  },

  productsContainer: {
    height: 'auto',
    width: '100%' 
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  confirmBtn: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

sectionTitle: {
  fontSize: 17,
  fontWeight: "bold",
  color: "#1f2937",
  marginTop: 24,
  marginBottom: 8,
},

  warningText: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 12,
  },

returnedProduct: {
  flexDirection: "row",
  alignItems: "center",
  padding: 12,
  backgroundColor: "#f9fafb",
  borderRadius: 12,
  shadowColor: "#000",
  shadowOpacity: 0.03,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  marginBottom: 10,
  gap: 12,
},
  returnedImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
  },

  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#111827",
    marginBottom: 4,
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
  },
  cancelBtn: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelText: {
    color: "#111827",
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: 'center',
    color: "#1f2937",
  },
  subtitle: {
    color: "#991b1b",
    marginTop: 4,
    textAlign: "center",
  },
  productBox: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
  },
  name: {
    fontWeight: "600",
    color: "#1f2937",
  },
  quantity: {
    fontSize: 13,
    color: "#4b5563",
  },
  option: {
    fontSize: 12,
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  confirmSection: {
    marginTop: 16,
  },
  confirmButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
  warning: {
    color: "#991b1b",
    marginTop: 8,
    textAlign: "center",
  },
  noItems: {
    textAlign: "center",
    color: "#6b7280",
  },
    checkbox: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderColor: "#6B7280", // gray-500
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});