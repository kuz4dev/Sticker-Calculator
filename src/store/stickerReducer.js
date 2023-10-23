const ADD_STICKER_SIZE = 'ADD_STICKER_SIZE';
const CHANGE_INK_PRICE = 'CHANGE_INK_PRICE';
const CHANGE_CANVAS_PRICE = 'CHANGE_CANVAS_PRICE';
const CLEAR_STICKER_SIZES = 'CLEAR_STICKER_SIZES';
const DELETE_STICKER_SIZE = 'DELETE_STICKER_SIZE';
const UPDATE_PLOTTER_PRICE = 'UPDATE_PLOTTER_PRICE';
const COEFFICIENT_CHANGE = 'COEFFICIENT_CHANGE';
const SET_PAGINATION = 'SET_PAGINATION';

const initialState = {
    canvasPrice: 9000,
    inkPrice: 80,
    stickers: [],
    plotterPrice: null,
    coefficient: 1,
    pagination: 5,
};

const stickerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_STICKER_SIZE: {
            return {
                ...state,
                stickers: [...state.stickers, { ...action.stickerInfo, id: state.stickers.length + 1 }]
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
        case DELETE_STICKER_SIZE: {
            return {
                ...state,
                stickers: state.stickers.filter(sticker => sticker.id !== action.id)
            }
        }
        case UPDATE_PLOTTER_PRICE: {
            return {
                ...state,
                plotterPrice: action.plotterPrice
            }
        }
        case COEFFICIENT_CHANGE: {
            return {
                ...state,
                coefficient: action.coefficient
            }
        }
        case SET_PAGINATION: {
            return {
                ...state,
                pagination: action.pagination,
            }
        }
        default:
            return state;
    };
};

export const addStickerSize = (stickerInfo) => ({ type: ADD_STICKER_SIZE, stickerInfo });
export const changeInkPrice = (inkPrice) => ({ type: CHANGE_INK_PRICE, inkPrice });
export const changeCanvasPrice = (canvasPrice) => ({ type: CHANGE_CANVAS_PRICE, canvasPrice });
export const clearStickerInfo = () => ({ type: CLEAR_STICKER_SIZES });
export const deleteSize = (id) => ({ type: DELETE_STICKER_SIZE, id });
export const updatePlotterPrice = (plotterPrice) => ({ type: UPDATE_PLOTTER_PRICE, plotterPrice });
export const changeCoefficient = (coefficient) => ({ type: COEFFICIENT_CHANGE, coefficient });
export const setPagination = (pagination) => ({ type: SET_PAGINATION, pagination })

export default stickerReducer;