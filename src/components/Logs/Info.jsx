import { Typography } from "antd";


const Info = ({ stickers, lengthToPrint, finalPrice, coefficient }) => {
    return (
        <div>
            <Typography>
                <pre>Размер используемой плёнки (м): {lengthToPrint}</pre>
                <pre>Себестоимость печати (руб): {finalPrice}</pre>
                <pre>Итоговая стоимость печати (руб): {(finalPrice * coefficient).toFixed(2)}</pre>
            </Typography>
        </div>
    );
};

export default Info;