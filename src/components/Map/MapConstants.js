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
        TownCenter: '/buildings/town-center.png',
        Manor: '/buildings/manor.png',
        House: '/buildings/houses.png',
        Market: '/buildings/market.png',
        Theater: '/buildings/theater.png',
        Park: '/buildings/park.png',
        Lumberjacks: '/buildings/lumberjack.png',
        Mines: '/buildings/mines.png',
        Harbour: '/buildings/harbour.png',
        Tavern: '/buildings/tavern.png',
        Farm: '/buildings/farm.png',
        Fields: '/buildings/fields.png',
    },
}

export default mapConstants