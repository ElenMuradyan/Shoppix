export const orderStatuses: Record<string, Record<string, string>> = {
  newOrders: {
    color: "#FEE2A8", 
    textColor: "#B45309", 
    message: "Ձեր պատվերը գրանցվել է և սպասում է հաստատման։",
    modalMessage: 'Վստահ ե՞ք, որ ունեք բավարար պաշար՝ պատվերը պատրաստելու և ուղարկելու համար։ Եթե ոչ, խնդրում ենք չեղարկել այն։ Խնդիրների դեպքում կապվեք մեզ հետ։',
    cancelModalMessage: 'Պատվերի չեղարկումից հետո դուք կստանաք ձեր գումարը հետ,բայց փոխանցման ժամանակ գանձված հարկը՝ ոչ։Եթե վճարումը տեղում պետք է կատարեիք ապա պատվերը ուղղակի կչեղարկվի։',
    buttonMessage: 'Հաստատել պատվերը',
    index: '0',
  },
  processingOrders: {
    color: "#C7D2FE", 
    textColor: "#4F46E5",
    message: "Ձեր պատվերը մշակվում է և պատրաստվում առաքմանը։",
    modalMessage: 'Վստահ ե՞ք, որ արդեն ուղարկել եք պատվերը։ Եթե գնորդը չստանա այն, չենք կարող փոխանցել գումարը։ Խնդիրների դեպքում կապվեք մեզ հետ։',
    buttonMessage: 'Ուղարկել պատվերը',
    index: '1',
  },
  sentOrders: {
    color: "#FED7AA",
    textColor: "#9C4D15", 
    message: "Ձեր պատվերը ուղարկված է և շուտով կհասնի։",
    buyerModalMessage: 'Եթե ստացել եք պատվերը և ամեն ինչ կարգին է, խնդրում ենք հաստատել ստացումը։',
    index: '2',
  },
  doneOrders: {
    color: "#D1FAE5",
    textColor: "#065F46",
    message: "Ձեր պատվերը հաջողությամբ առաքվել է։",
    index: '3',
  },
  failedOrders: {
    color: "#FEE2E2", 
    textColor: "#B91C1C", 
    message: "Վճարումը կամ պատվերի մշակումը ձախողվել է։ Խնդրում ենք փորձել կրկին։",
    index: '4',
  },
};

export type OrderKeys = keyof typeof orderStatuses;
