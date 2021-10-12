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
        Manor: 2,
        House: 3,
        Market: 5,
        Theater: 3,
        Park: 2,
        Lumberjacks: 5,
        Mines: 5,
        Harbour: 3,
        Tavern: 3,
        Farm: 4,
        Fields: 4
    }
}

export default mapConstants