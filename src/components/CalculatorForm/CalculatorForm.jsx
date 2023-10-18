import { Form, Typography, Input, Button, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import StickerSizeForm from "../StickerSizeForm/StickerSizeForm";
import Error from "../Logs/Error";
import Info from "../Logs/Info";
import { buttonInTable, formStyle, formsStyle, titleStyle } from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { changeCanvasPrice, changeCoefficient, changeInkPrice, clearStickerInfo, deleteSize } from "../../store/stickerReducer";
import { inputNumberZeroValidator } from "../../utils/validators/validators";

const MIN_HEIGHT_TO_PRINT = 0.5;

const CalculatorForm = () => {
    const dispatch = useDispatch();
    const stickersState = useSelector((state) => state.sticker);
    const stickers = stickersState.stickers;

    const isMounted = useRef(false);

    const [form] = Form.useForm();

    const [isVisible, setIsVisible] = useState({
        info: false,
        error: false,
        minimum: false,
    });

    const lengthToPrint = (stickers.map(sticker => sticker.metersToPrint).reduce((accumulator, currentValue) => accumulator + currentValue + 0.002, 0) + 0.17).toFixed(2);
    const finalPrice = (stickers.map(sticker => sticker.finalPrice).reduce((accumulator, currentValue) => accumulator + currentValue, 0) + stickersState.plotterPrice).toFixed(2);
    const isMaxWidthOrHeight = stickers.map(sticker => sticker.stickerInRow).every((stickersInRow) => stickersInRow > 0);
    const coefficient = stickersState.coefficient;

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

    useEffect(() => {
        if (isMounted.current) {
            onSubmit();
        } else {
            isMounted.current = true;
        }
    }, [lengthToPrint, isMaxWidthOrHeight]);

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
        dispatch(clearStickerInfo());
        form.resetFields();
    };

    const onCanvasPriceChange = (event) => {
        dispatch(changeCanvasPrice(Number(event.target.value)));
    };

    const onInkPriceChange = (event) => {
        dispatch(changeInkPrice(Number(event.target.value)));
    };

    const deleteSizeFromTable = (record) => {
        dispatch(deleteSize(record.key));
    };

    const onCoefficientChange = (event) => {
        dispatch(changeCoefficient(Number(event.target.value)));
    };

    const dataTable = stickers.map((sticker, index) => {
        return ({
            key: sticker.id,
            size: sticker.id,
            width: sticker.width,
            height: sticker.height,
            count: sticker.number,
            price: Number.isFinite(Number(sticker.oneStickerPrice)) ? sticker.oneStickerPrice : '-',
        });
    });

    const tableColumnInfo = [
        {
            title: 'Номер размера',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Ширина стикера (см)',
            dataIndex: 'width',
            key: 'width',
        },
        {
            title: 'Высота стикера (см)',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Цена (руб)',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Удалить размер',
            dataIndex: 'delete',
            key: 'delete',
            render: (_, record) => <Button style={buttonInTable} type="primary" onClick={() => deleteSizeFromTable(record)}>Удалить</Button>
        }
    ];

    const pagination = {
        pageSize: 2,
    };

    return (
        <div style={formStyle} >

            <Form
                form={form}
                name="mainForm"
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                style={formsStyle}
                initialValues={{
                    priceCanvas: stickersState.canvasPrice,
                    pricePrint: stickersState.inkPrice,
                    coefficient: stickersState.coefficient,
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

                <Form.Item
                    name="coefficient"
                    label="Введите коэффициент для расчёта стоимости"
                    rules={[
                        {
                            validator: inputNumberZeroValidator,
                        },
                    ]}
                >
                    <Input onChange={onCoefficientChange} />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button htmlType="button" type='primary' onClick={onReset}>
                            Сбросить
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

            <StickerSizeForm stickersState={stickersState} dispatch={dispatch} updateInfo={onSubmit} />

            {
                <Table columns={tableColumnInfo} dataSource={dataTable} pagination={pagination} />
            }


            {
                isVisible.info && isMaxWidthOrHeight &&
                <Info stickers={stickers} lengthToPrint={lengthToPrint} finalPrice={finalPrice} coefficient={coefficient} />
            }

            {
                isVisible.minimum && isMounted.current &&
                <Error title={'Минимальная длина плёнки к печати - 0.5 метра!'} message={`Нужно напечатать больше стикеров!`} />
            }
            {
                isVisible.error &&
                <Error title={'Ошибка!'} message={'Превышена максимальная ширина и высота для стикеров!'} />
            }
        </div >
    );
};

export default CalculatorForm;