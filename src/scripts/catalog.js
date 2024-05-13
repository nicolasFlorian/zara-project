export const catalog = [
    createItem(
        "0155",
        'COLETE ACOLCHOADO',
        `Colete confeccionado em tecido técnico acolchoado. Gola alta e sem mangas.
        Bolsos com zíper no quadril. Bainha ajustável com elástico nas laterais.
        Fecho à frente com zíper.`,
        "379,00",
        0.4,
        'Colete',
        {
            S: 3,
            M: 4,
            L: 0,
            XL: 2
        },
        'Male',
        false
    ),

    createItem(
        "1063",
        'CAMISA COM TEXTURA',
        `Camisa regular fit confeccionada em tecido com textura elástica. 
        Gola com lapela e manga comprida acabada em punho com botão. Bolso de patch no peito.
        Fecho de botões à frente.`,
        "279,00",
        null,
        'Camisa',
        {
            S: 2,
            M: 0,
            L: 0,
            XL: 1
        },
        'Male',
        true
    ),

    createItem(
        "5585",
        'JEANS STRAIGHT FIT',
        `Jeans straight fit. Cinco bolsos. Lavado com efeito
        de rasgões e estampa tipo manchas nas pernas. Fecho com botões à frente.`,
        "379,00",
        null,
        'Jeans',
        {
            S: 1,
            M: 2,
            L: 0,
            XL: 1
        },
        'Male',
        true
    ),
    
    createItem(
        "6985",
        'COLETE ACOLCHOADO COM CAPUZ',
        `Colete acolchoado de gola alta com capuz ajustável.
         Sem mangas. Bolsos de debrum no quadril e detalhe de bolso interno.
         Bainha com acabamento com elástico. Fecho frontal com zíper oculto
         por aba com botões de pressão.`,
        "439,00",
        null,
        'Colete',
        {
            S: 3,
            M: 2,
            L: 2,
            XL: 5
        },
        'Male',
        true   
    ),

    createItem(
        "7545",
        "CAMISA LISTRADA",
        `Camisa relaxed fit. Gola com lapela e manga comprida com acabamento em punho com botão. Bolso de patch no peito. Fecho com botões na frente.`,
        "359,9",
        "0.25",
        "Camisa",
        {
            S: 2,
            M: 2,
            L: 1,
            XL: 1
        },
        "Male",
        false
    ),

    createItem(
        "8574",
        "COLETE ACOLCHOADO ENGOMADO",
        `Colete acolchoado confeccionado em um tecido com acabamento engomado. Gola alta e sem mangas. Bolsos de patch no quadril e bolso interno. Parte inferior ajustável. Fecho frontal com zíper.`,
        "499,90",
        "0.3",
        "Colete",
        {
            S: 1,
            M: 1,
            L: 1,
            XL: 1
        },
        "Male",
        false
    )
]

function createItem(id, name, description, price, discount, category, sizes, gender, isNew) {
    const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
    const imgs = {
        main: {
            srcJpeg: `${id}-1.jpeg`,
            srcWebp: `${id}-1.webp`,
            alt: capitalizeName
        },
        secondary: {
            srcJpeg: `${id}-2.jpeg`,
            srcWebp: `${id}-2.webp`,
            alt: capitalizeName
        }
    };
  
    return {
        id,
        name,
        description,
        price,
        discount,
        imgs,
        category,
        sizes,
        gender,
        new: isNew
    };
}