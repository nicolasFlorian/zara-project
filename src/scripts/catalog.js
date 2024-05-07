const catalog = [
    {
        id: "0155",
        name: 'COLETE ACOLCHOADO',
        description: `Colete confeccionado em tecido técnico acolchoado. Gola alta e sem mangas.
        Bolsos com zíper no quadril. Bainha ajustável com elástico nas laterais.
        Fecho à frente com zíper.`,
        price: "379,00",
        discount: 0.4,
        imgs: {
            main: {
                srcJpeg: `${this.id}-1.jpeg`,
                srcWebp: `${this.id}-1.webp`,
                alt: `${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`
            },
            secondary: {
                srcJpeg: `${this.id}-2.jpeg`,
                srcWebp: `${this.id}-2.webp`,
                alt: `${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`
            }
        },
        category: 'Colete',
        sizes: {
            S: 3,
            M: 4,
            L: 0,
            XL: 2
        },
        gender: 'Male',
        new: false
    },

    {
        id: "1063",
        name: 'CAMISA COM TEXTURA',
        description: `Camisa regular fit confeccionada em tecido com textura elástica. 
        Gola com lapela e manga comprida acabada em punho com botão. Bolso de patch no peito.
        Fecho de botões à frente.`,
        price: "279,00",
        discount: null,
        imgs: {
            main: {
                srcJpeg: `${this.id}-1.jpeg`,
                srcWebp: `${this.id}-1.webp`,
                alt: `${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`
            },
            secondary: {
                srcJpeg: `${this.id}-2.jpeg`,
                srcWebp: `${this.id}-2.webp`,
                alt: `${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`
            }
        },
        category: 'Camisa',
        sizes: {
            S: 2,
            M: 0,
            L: 0,
            XL: 1
        },
        gender: 'Male',
        new: true
    },

    {
        id: "5585",
        name: 'JEANS STRAIGHT FIT',
        description: `Jeans straight fit. Cinco bolsos. Lavado com efeito
        de rasgões e estampa tipo manchas nas pernas. Fecho com botões à frente.`,
        price: "379,00",
        discount: null,
        imgs: {
            main: {
                srcJpeg: `${this.id}-1.jpeg`,
                srcWebp: `${this.id}-1.webp`,
                alt: `${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`
            },
            secondary: {
                srcJpeg: `${this.id}-2.jpeg`,
                srcWebp: `${this.id}-2.webp`,
                alt: `${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`
            }
        },
        category: 'Jeans',
        sizes: {
            S: 1,
            M: 2,
            L: 0,
            XL: 1
        },
        gender: 'Male',
        new: true
    },
    
    {
        id: "6985",
        name: 'COLETE ACOLCHOADO COM CAPUZ',
        description: `Colete acolchoado de gola alta com capuz ajustável.
         Sem mangas. Bolsos de debrum no quadril e detalhe de bolso interno.
         Bainha com acabamento com elástico. Fecho frontal com zíper oculto
         por aba com botões de pressão.`,
        price: "439,00",
        discount: null,
        imgs: {
            main: {
                srcJpeg: `${this.id}-1.jpeg`,
                srcWebp: `${this.id}-1.webp`,
                alt: `${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`
            },
            secondary: {
                srcJpeg: `${this.id}-2.jpeg`,
                srcWebp: `${this.id}-2.webp`,
                alt: `${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`
            }
        },
        category: 'Colete',
        sizes: {
            S: 3,
            M: 2,
            L: 2,
            XL: 5
        },
        gender: 'Male',
        new: true   
    }
]