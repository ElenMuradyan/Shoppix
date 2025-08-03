export const optionNamesOptions = [
    { label: "Չափս", value: "չափս" },
    { label: "Գույն", value: "գույն" },
    { label: "Նյութ", value: "նյութ" },
    { label: "Ուժ", value: "ուժ" },
    { label: "Քաշ", value: "քաշ" },
];

export const names: Record<string, string> = {
    չափս: 'չափս',
    գույն: 'գույն',
    նյութ: 'նյութ',
    ուժ: 'ուժ',
    քաշ: 'քաշ',
}

export const cartNames: Record<string, string> = {
    չափս: 'Չափս',
    գույն: 'Գույն',
    նյութ: 'Նյութ',
    ուժ: 'Ուժ',
    քաշ: 'Քաշ',
}

type val = { label: string, value: string }
export const suboptions: Record<string, val[]> = {
    չափս: [
        { label: "Շատ Փոքր", value: "շատ փոքր" },
        { label: "Փոքր", value: "փոքր" },
        { label: "Միջին", value: "միջին" },
        { label: "Մեծ", value: "մեծ" },
        { label: "Շատ Մեծ", value: "շատ մեծ" },
        { label: "XX-Մեծ", value: "xx մեծ" },
        { label: "XXX-Մեծ", value: "xxx մեծ" },
        { label: "XXXX-Մեծ", value: "xxxx մեծ" },
        { label: "Մեկ Չափս", value: "մեկ չափս" }
    ],
    գույն: [
        { label: "Կարմիր", value: "կարմիր" },
        { label: "Կապույտ", value: "կապույտ" },
        { label: "Կանաչ", value: "կանաչ" },
        { label: "Սեւ", value: "սեւ" },
        { label: "Սպիտակ", value: "սպիտակ" },
        { label: "Դեղին", value: "դեղին" },
        { label: "Վարդագույն", value: "վարդագույն" },
        { label: "Մանուշակագույն", value: "մանուշակագույն" },
        { label: "Դարչնագույն", value: "դարչնագույն" },
        { label: "Մոխրագույն", value: "մոխրագույն" }
    ],
    նյութ: [
        { label: "Բամբակ", value: "բամբակ" },
        { label: "Կաշի", value: "կաշի" },
        { label: "Պոլիեսթեր", value: "պոլիեսթեր" },
        { label: "Փայտ", value: "փայտ" },
        { label: "Մետաղ", value: "մետաղ" },
        { label: "Պլաստիկ", value: "պլաստիկ" },
        { label: "Ապակի", value: "ապակի" },
        { label: "Մետաքս", value: "մետաքս" },
        { label: "Ողջ", value: "ողջ" }
    ],
    ուժ: [
        { label: "Թույլ", value: "թույլ" },
        { label: "Միջին", value: "միջին" },
        { label: "Ուժեղ", value: "ուժեղ" },
        { label: "Շատ Ուժեղ", value: "շատ ուժեղ" }
    ],
    քաշ: [
        { label: "Թեթեւ", value: "թեթեւ" },
        { label: "Միջին", value: "միջին" },
        { label: "Ծանր", value: "ծանր" },
        { label: "Շատ Ծանր", value: "շատ ծանր" }
    ]
}