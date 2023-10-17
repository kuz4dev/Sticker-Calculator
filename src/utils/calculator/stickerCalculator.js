const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 5250;
const MIN_CANVAS_HEIGHT = 50;
const MIN_INDENT = 0.2;

//Рассчет ширины полотна с учетом отступа
const REAL_CANVAS_WIDTH = CANVAS_WIDTH - 4;

const stickerCalculator = (stickerWidth, stickerHeight, stickersNumber, canvasPrice = 9000, inkPricePerMeter = 80) => {

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
    metersToPrint = (((stickerHeight + MIN_INDENT) * rowCount) / 100 - (MIN_INDENT / 100)).toFixed(2);

    finalPrice = Math.ceil(canvasPrice * (metersToPrint * 100 / CANVAS_HEIGHT)) + (inkPricePerMeter * metersToPrint);
    oneStickerPrice = (finalPrice / stickersNumber).toFixed(2);

    const minStickersToPrint = (Math.floor((MIN_CANVAS_HEIGHT - 15 - 2) / (stickerHeight + MIN_INDENT)) * stickerInRow) + stickerInRow;

    const plotterPrice = canvasPrice / 52.5 * 0.17;

    return [stickerInRow, finalPrice, metersToPrint, oneStickerPrice, minStickersToPrint, plotterPrice];
};

export default stickerCalculator;