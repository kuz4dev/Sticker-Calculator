const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 5250;
const MIN_CANVAS_HEIGHT = 50;
const MIN_INDENT = 0.2;

const CANVAS_PRICE = 9000;
const INK_PRICE_PER_METER = 80;

//Рассчет ширины полотна с учетом отступа
const REAL_CANVAS_WIDTH = CANVAS_WIDTH - 4;

const stickerCalculator = (stickerWidth, stickerHeight, stickersNumber) => {
    let stickerInRow, finalPrice, oneStickerPrice, metersToPrint;

    stickerInRow = Math.floor(REAL_CANVAS_WIDTH / (stickerWidth + MIN_INDENT));

    const rowCount = Math.ceil(stickersNumber / stickerInRow);

    metersToPrint = (16 + (stickerHeight + 0.2) * rowCount) / 100;

    return [stickerInRow, rowCount, metersToPrint];
};

export default stickerCalculator;