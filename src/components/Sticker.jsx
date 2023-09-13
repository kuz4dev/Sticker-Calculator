

const Sticker = ({ width, height }) => {

    const stickerStyle = {
        width: `${width * 4}px`,
        height: `${height * 4}px`,
        background: '#3e5159'
    };

    return (
        <div style={stickerStyle}></div>
    );
};

export default Sticker;