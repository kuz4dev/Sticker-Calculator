export const inputNumberZeroValidator = (_, value) => {
    if (Number(value) && Number(value) > 0) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Введите число больше нуля!'));
};