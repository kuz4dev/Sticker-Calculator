const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 5250;
const MIN_CANVAS_HEIGHT = 50;
const MIN_INDENT = 0.2;

const CANVAS_PRICE = 9000;
const INK_PRICE_PER_METER = 80;

//Рассчет ширины полотна с учетом отступа
const REAL_CANVAS_WIDTH = CANVAS_WIDTH - 4;

const stickerCalculator = (stickerWidth, stickerHeight, stickersNumber) => {

    let stickerInRow, finalPrice, metersToPrint, oneStickerPrice;

    if (stickerWidth > REAL_CANVAS_WIDTH && stickerHeight <= REAL_CANVAS_WIDTH) {
        const width = stickerWidth;
        stickerWidth = stickerHeight;
        stickerHeight = width;
        stickerInRow = Math.floor(REAL_CANVAS_WIDTH / stickerWidth);
    } else {
        stickerInRow = Math.floor((REAL_CANVAS_WIDTH + MIN_INDENT) / (stickerWidth + MIN_INDENT));
    }

    const rowCount = Math.ceil(stickersNumber / stickerInRow);
    metersToPrint = ((16 + (stickerHeight + 0.2) * rowCount) / 100).toFixed(3);
    finalPrice = Math.ceil((CANVAS_PRICE * (metersToPrint * 100 / CANVAS_HEIGHT)) + (INK_PRICE_PER_METER * metersToPrint));
    oneStickerPrice = Math.ceil(finalPrice / stickersNumber);

    const minStickersToPrint = (Math.floor((MIN_CANVAS_HEIGHT - 15 - 1) / (stickerHeight + MIN_INDENT)) * stickerInRow) + stickerInRow;

    return [stickerInRow, finalPrice, metersToPrint, oneStickerPrice, minStickersToPrint];
};

export default stickerCalculator;