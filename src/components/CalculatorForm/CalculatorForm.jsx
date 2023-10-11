import { Form, Typography, Input, Button, Space, Table } from "antd";
import { useState } from "react";
import StickerSizeForm from "../StickerSizeForm/StickerSizeForm";
import Error from "../Logs/Error";
import Info from "../Logs/Info";
import { buttonAddStyle, formsStyle, titleStyle } from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { changeCanvasPrice, changeInkPrice, clearStickerInfo } from "../../store/stickerReducer";
import { inputNumberZeroValidator } from "../../utils/validators/validators";

const MIN_HEIGHT_TO_PRINT = 0.5;

const CalculatorForm = () => {
    const dispatch = useDispatch();
    const stickersState = useSelector((state) => state.sticker);
    const stickers = stickersState.stickers;

    const [form] = Form.useForm();

    const [isStickerForm, setIsStickerForm] = useState(false);

    const [isVisible, setIsVisible] = useState({
        info: false,
        error: false,
        minimum: false,
    });

    const lengthToPrint = stickers.map(sticker => sticker.metersToPrint).reduce((accumulator, currentValue) => accumulator + currentValue + 0.002, 0);
    const finalPrice = stickers.map(sticker => sticker.finalPrice).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const isMaxWidthOrHeight = stickers.map(sticker => sticker.stickerInRow).every((stickersInRow) => stickersInRow > 0);

    const onSubmit = () => {
        if (!isMaxWidthOrHeight) {
            setIsVisible({ error: true, info: false, minimum: false });
        } else {
            setIsVisible(prevState => {
                return {
                    ...prevState,
                    error: false,
                }
            });

            if (lengthToPrint < MIN_HEIGHT_TO_PRINT) {
                setIsVisible(prevState => {
                    return {
                        ...prevState,
                        info: false,
                        minimum: true,
                    }
                });
            } else {
                setIsVisible(prevState => {
                    return {
                        ...prevState,
                        info: true,
                        minimum: false,
                    }
                });
            }
        }
    };

    const onFinishFailed = () => {
        setIsVisible(prevState => {
            return {
                ...prevState,
                info: false,
            }
        });
    };

    const onReset = () => {
        setIsVisible({
            minimum: false, error: false, info: false,
        });
        form.resetFields();
        dispatch(clearStickerInfo());
    };

    const onAddSize = () => {
        setIsStickerForm(!isStickerForm);
    };

    const onCanvasPriceChange = (event) => {
        dispatch(changeCanvasPrice(Number(event.target.value)));
    };

    const onInkPriceChange = (event) => {
        dispatch(changeInkPrice(Number(event.target.value)));
    };

    const columns = [
        {
            title: 'Номер размера',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Ширина стикера',
            dataIndex: 'width',
            key: 'width',
        },
        {
            title: 'Высота стикера',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
        },
    ];

    const dataTable = stickers.map((sticker, index) => {
        return ({
            key: index + 1,
            size: index + 1,
            width: sticker.width,
            height: sticker.height,
            count: sticker.number,
            price: sticker.oneStickerPrice,
        });
    });

    const pagination = {
        pageSize: 2,
    };

    return (
        <div style={{ marginTop: '10px' }
        } >

            {isStickerForm &&
                <StickerSizeForm stickersState={stickersState} dispatch={dispatch} closeForm={setIsStickerForm} />
            }

            {
                !isStickerForm &&
                <Button style={buttonAddStyle} htmlType="button" type="primary" onClick={onAddSize}>
                    Добавить размер стикеров
                </Button>
            }

            {
                <Table columns={columns} dataSource={dataTable} pagination={pagination} />
            }

            <Form
                form={form}
                name="mainForm"
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                style={formsStyle}
                initialValues={{
                    priceCanvas: stickersState.canvasPrice,
                    pricePrint: stickersState.inkPrice,
                }}
            >
                <Typography.Text style={titleStyle}>
                    Введите стоимость печати
                </Typography.Text>

                <Form.Item
                    name="priceCanvas"
                    label="Введите стоимость плёнки (рулон 52.5м)"
                    rules={[
                        {
                            validator: inputNumberZeroValidator,
                        },
                    ]}
                >
                    <Input onChange={onCanvasPriceChange} />
                </Form.Item>

                <Form.Item
                    name="pricePrint"
                    label="Введите стоимость печати (метр)"
                    rules={[
                        {
                            validator: inputNumberZeroValidator,
                        },
                    ]}
                >
                    <Input onChange={onInkPriceChange} />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Расчитать
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Сбросить
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

            {
                isVisible.info && isMaxWidthOrHeight &&
                <Info stickers={stickers} lengthToPrint={lengthToPrint} finalPrice={finalPrice} />
            }

            {
                isVisible.minimum &&
                <Error title={'Минимальная длина плёнки к печати - 0.5 метра!'} message={`Минимальное количество стикеров: ${stickersState.stickers[0].minStickersToPrint}`} />
            }
            {
                isVisible.error &&
                <Error title={'Ошибка!'} message={'Максимиальная ширина и высота стикера 96 см!'} />
            }
        </div >
    );
};

export default CalculatorForm;