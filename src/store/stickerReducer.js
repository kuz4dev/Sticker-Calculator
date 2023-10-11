const ADD_STICKER_SIZE = 'ADD_STICKER_SIZE';
const CHANGE_INK_PRICE = 'CHANGE_INK_PRICE';
const CHANGE_CANVAS_PRICE = 'CHANGE_CANVAS_PRICE';
const CLEAR_STICKER_SIZES = 'CLEAR_STICKER_SIZES';

const initialState = {
    canvasPrice: 9000,
    inkPrice: 80,
    stickers: [],
};

const stickerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_STICKER_SIZE: {
            return {
                ...state,
                stickers: [...state.stickers, { ...action.stickerInfo }]
            };
        }
        case CHANGE_INK_PRICE: {
            return {
                ...state,
                inkPrice: action.inkPrice,
            }
        }
        case CHANGE_CANVAS_PRICE: {
            return {
                ...state,
                canvasPrice: action.canvasPrice,
            }
        }
        case CLEAR_STICKER_SIZES: {
            return {
                ...state,
                stickers: [],
            }
        }
        default:
            return state;
    };
};

export const addStickerSize = (stickerInfo) => ({ type: ADD_STICKER_SIZE, stickerInfo: stickerInfo });
export const changeInkPrice = (inkPrice) => ({ type: CHANGE_INK_PRICE, inkPrice: inkPrice });
export const changeCanvasPrice = (canvasPrice) => ({ type: CHANGE_CANVAS_PRICE, canvasPrice: canvasPrice });
export const clearStickerInfo = () => ({ type: CLEAR_STICKER_SIZES });

export default stickerReducer;