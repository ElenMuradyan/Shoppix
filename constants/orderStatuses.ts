export const orderStatuses: Record<string, Record<string, string>> = {
  newOrders: {
    color: "#FEE2A8", // պայծառ դեղին-100
    textColor: "#B45309", // մուգ դեղին-700
    message: "Ձեր պատվերը գրանցվել է և սպասում է հաստատման։",
    modalMessage: 'Վստահ ե՞ք, որ ունեք բավարար պաշար՝ պատվերը պատրաստելու և ուղարկելու համար։ Եթե ոչ, խնդրում ենք չեղարկել այն։ Խնդիրների դեպքում կապվեք մեզ հետ։',
    buttonMessage: 'Հաստատել պատվերը',
    index: '0',
  },
  processingOrders: {
    color: "#C7D2FE", // պայծառ մանուշակագույն-100
    textColor: "#4F46E5", // մուգ մանուշակագույն-700
    message: "Ձեր պատվերը մշակվում է և պատրաստվում առաքմանը։",
    modalMessage: 'Վստահ ե՞ք, որ արդեն ուղարկել եք պատվերը։ Եթե գնորդը չստանա այն, չենք կարող փոխանցել գումարը։ Խնդիրների դեպքում կապվեք մեզ հետ։',
    buttonMessage: 'Ուղարկել պատվերը',
    index: '1',
  },
  sentOrders: {
    color: "#FED7AA", // պայծառ նարնջագույն-100
    textColor: "#9C4D15", // մուգ նարնջագույն-700
    message: "Ձեր պատվերը ուղարկված է և շուտով կհասնի։",
    buyerModalMessage: 'Եթե ստացել եք պատվերը և ամեն ինչ կարգին է, խնդրում ենք հաստատել ստացումը։',
    index: '2',
  },
  doneOrders: {
    color: "#D1FAE5", // պայծառ կանաչ-100
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
  processingReturn: {
    color: "#FBCFE8", // վարդագույն-100
    textColor: "#BE185D", // մուգ վարդագույն-700
    message: "Պատվերի վերադարձը մշակվում է։",
    modalMessage: 'Հաստատու՞մ եք, որ վերադարձի պայմանները բավարարված են։ Եթե ոչ, խնդրում ենք մերժել վերադարձը կամ կապնվել մեզ հետ։',
    buttonMessage: 'Հաստատել վերադարձը',
    index: '5',
  },
};
export type OrderKeys = keyof typeof orderStatuses;
