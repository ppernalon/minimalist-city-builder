const mapConstants = {
    TILE_SIZE: 17,
    NUMBER_TILE_COL: 56,
    NUMBER_TILE_ROW: 32,

    PLAIN_ENV: 0,
    FOREST_ENV: 1,
    MOUNTAIN_ENV: 2,
    LAKE_ENV: 3,
    BEACH_ENV: 4,

    PLAIN_COLORS: [
        "#2CC32D",
        "#1FC733",
        "#11CB38",
        "#12B844",
        "#0EA44D"
    ],
    FOREST_COLORS: [
        "#1C6812",
        "#0B6C0B",
        "#03700D",
        "#045D13",
        "#024915"
    ],
    MOUNTAIN_COLORS: [
        "#858585",
        "#848484",
        "#838383",
        "#797979",
        "#6D6D6D"
    ],
    LAKE_COLORS: [
        "#2355F7",
        "#1237FB",
        "#0019FF",
        "#030DEC",
        "#0500D8"
    ],
    BEACH_COLORS: [
        "#F7EDCC",
        "#FBEFBE",
        "#FFF2AF",
        "#ECE2A5",
        "#D8D194"
    ],

    INFLUENCE_COLOR: "#FFCE00",
    NOT_ALLOWED_COLOR: "#DC0005",

    INFLUENCE_RANGES: {
        TownCenter: 7,
        Manor: 3,
        House: 4,
        Market: 6,
        Theater: 4,
        Park: 3,
        Lumberjacks: 6,
        Mines: 6,
        Harbour: 4,
        Tavern: 4,
        Farm: 4,
        Fields: 4
    },

    SIZE_BUILDING: {
        TownCenter: [1, 1],
        Manor: [2, 2],
        House: [2, 3],
        Market: [4, 5],
        Theater: [4, 4],
        Park: [1, 1],
        Lumberjacks: [4, 4],
        Mines: [4, 4],
        Harbour: [3, 2],
        Tavern: [2, 2],
        Farm: [2, 2],
        Fields: [4, 2]
    },

    SRC_BUILDINGS_NBER_AVAILABLE:{
        TownCenter: 0,
        Manor: 1,
        House: 2,
        Market: 0,
        Theater: 0,
        Park: 0,
        Lumberjacks: 0,
        Mines: 5,
        Harbour: 2,
        Tavern: 0,
        Farm: 1,
        Fields: 0,
    },

    SRC_BUILDINGS: {
        TownCenter: './buildings/town-center.png',
        Manor: './buildings/manor.png',
        House: './buildings/houses.png',
        Market: './buildings/market.png',
        Theater: './buildings/theater.png',
        Park: './buildings/park.png',
        Lumberjacks: './buildings/lumberjack.png',
        Mines: './buildings/mines.png',
        Harbour: './buildings/harbour.png',
        Tavern: './buildings/tavern.png',
        Farm: './buildings/farm.png',
        Fields: './buildings/fields.png',
    },

    SCORE_BUILDINGS:{
        TownCenter: {
            TownCenter: -20,
            Manor: 5,
            House: 2,
            Market: 10,
            Theater: 7,
            Park: 5,
            Lumberjacks: -15,
            Mines: -20,
            Harbour: 10,
            Tavern: 10,
            Farm: -15,
            Fields: -20,
        },
        Manor: {
            TownCenter: 5,
            Manor: 3,
            House: -1,
            Market: -3,
            Theater: 3,
            Park: 2,
            Lumberjacks: -20,
            Mines: -20,
            Harbour: -5,
            Tavern: -2,
            Farm: -20,
            Fields: -20,
        },
        House: {
            TownCenter: 2,
            Manor: 1,
            House: 1,
            Market: 2,
            Theater: 0,
            Park: 1,
            Lumberjacks: -5,
            Mines: 1,
            Harbour: 2,
            Tavern: 4,
            Farm: -5,
            Fields: -10,
        },
        Market: {
            TownCenter: 10,
            Manor: 3,
            House: 2,
            Market: -20,
            Theater: 0,
            Park: 0,
            Lumberjacks: 2,
            Mines: 2,
            Harbour: 5,
            Tavern: 1,
            Farm: 2,
            Fields: 0,
        },
        Theater: {
            TownCenter: 7,
            Manor: 4,
            House: 2,
            Market: 0,
            Theater: -15,
            Park: 3,
            Lumberjacks: -15,
            Mines: -15,
            Harbour: 0,
            Tavern: 2,
            Farm: 0,
            Fields: -10,
        },
        Park: {
            TownCenter: 5,
            Manor: 3,
            House: 2,
            Market: 0,
            Theater: 0,
            Park: 2,
            Lumberjacks: -5,
            Mines: -15,
            Harbour: 0,
            Tavern: 2,
            Farm: 0,
            Fields: 0,
        },
        Lumberjacks: {
            TownCenter: -15,
            Manor: 0,
            House: 0,
            Market: 5,
            Theater: 0,
            Park: 5,
            Lumberjacks: -5,
            Mines: 2,
            Harbour: 4,
            Tavern: 0,
            Farm: 10,
            Fields: 0,
        },
        Mines: {
            TownCenter: -5,
            Manor: 0,
            House: 0,
            Market: 5,
            Theater: 0,
            Park: 0,
            Lumberjacks: 3,
            Mines: 0,
            Harbour: 2,
            Tavern: 0,
            Farm: 10,
            Fields: 0,
        },
        Harbour: {
            TownCenter: 10,
            Manor: 0,
            House: 1,
            Market: 10,
            Theater: 0,
            Park: 0,
            Lumberjacks: 4,
            Mines: 0,
            Harbour: 5,
            Tavern: 5,
            Farm: 0,
            Fields: 0,
        },
        Tavern: {
            TownCenter: 10,
            Manor: 2,
            House: 4,
            Market: 5,
            Theater: 5,
            Park: 0,
            Lumberjacks: 2,
            Mines: 2,
            Harbour: 5,
            Tavern: -5,
            Farm: 1,
            Fields: 0,
        },
        Farm: {
            TownCenter: -15,
            Manor: 0,
            House: 0,
            Market: 0,
            Theater: 0,
            Park: 0,
            Lumberjacks: 5,
            Mines: 0,
            Harbour: 0,
            Tavern: 1,
            Farm: -5,
            Fields: 0,
        },
        Fields: {
            TownCenter: -15,
            Manor: 0,
            House: 0,
            Market: 0,
            Theater: 0,
            Park: 0,
            Lumberjacks: 0,
            Mines: 0,
            Harbour: 0,
            Tavern: 0,
            Farm: 5,
            Fields: 5,
        },
    },

    SCORE_ENV:{
        plain: {
            TownCenter: 0,
            Manor: 0,
            House: 0,
            Market: 0,
            Theater: 0,
            Park: 2,
            Lumberjacks: 0,
            Mines: -10,
            Harbour: 'notAllowed',
            Tavern: 0,
            Farm: 10,
            Fields: 0,
        },
        forest: {
            TownCenter: -10,
            Manor: 0,
            House: 0,
            Market: -10,
            Theater: -10,
            Park: 5,
            Lumberjacks: 20,
            Mines: -15,
            Harbour: 'notAllowed',
            Tavern: 0,
            Farm: 0,
            Fields: 0,
        },
        mountain: {
            TownCenter: -10,
            Manor: -5,
            House: -5,
            Market: -10,
            Theater: -10,
            Park: -5,
            Lumberjacks: -5,
            Mines: 20,
            Harbour: 'notAllowed',
            Tavern: 5,
            Farm: -10,
            Fields: -20,
        },
        beach: {
            TownCenter: 'notAllowed',
            Manor: 'notAllowed',
            House: 'notAllowed',
            Market: 'notAllowed',
            Theater: 'notAllowed',
            Park: 'notAllowed',
            Lumberjacks: 'notAllowed',
            Mines: 'notAllowed',
            Harbour: 15,
            Tavern: 'notAllowed',
            Farm: 'notAllowed',
            Fields: 'notAllowed',
        },
        water: {
            TownCenter: 'notAllowed',
            Manor: 'notAllowed',
            House: 'notAllowed',
            Market: 'notAllowed',
            Theater: 'notAllowed',
            Park: 'notAllowed',
            Lumberjacks: 'notAllowed',
            Mines: 'notAllowed',
            Harbour: 'notAllowed',
            Tavern: 'notAllowed',
            Farm: 'notAllowed',
            Fields: 'notAllowed',
        }
    }
}

export default mapConstants