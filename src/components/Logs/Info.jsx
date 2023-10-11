import { Typography } from "antd";


const Info = ({ stickers, lengthToPrint, finalPrice }) => {
    return (
        <div>
            <Typography>
                <pre>Размер используемой плёнки (м): {lengthToPrint.toFixed(2)}</pre>
                <pre>Себестоимость печати (руб): {finalPrice}</pre>
            </Typography>
        </div>
    );
};

export default Info;