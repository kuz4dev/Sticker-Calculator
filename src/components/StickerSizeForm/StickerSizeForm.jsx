import { Form, Input, Button, Space, Typography } from "antd";
import { formsStyle, titleStyle } from "../../styles/style";
import { inputNumberZeroValidator } from "../../utils/validators/validators";
import { addStickerSize } from "../../store/stickerReducer";
import stickerCalculator from "../../stickerCalculator";

const StickerSizeForm = ({ closeForm, dispatch, stickersState }) => {

    const [form] = Form.useForm();

    const onSubmit = ({ width, height, number }) => {
        const [stickerInRow, finalPrice, metersToPrint, oneStickerPrice, minStickersToPrint] = stickerCalculator(Number(width), Number(height), Number(number), stickersState.canvasPrice, stickersState.inkPrice);
        dispatch(addStickerSize({ width: Number(width), height: Number(height), number: Number(number), stickerInRow, finalPrice, metersToPrint: Number(metersToPrint), oneStickerPrice, minStickersToPrint }));
        closeForm(false);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onClose = () => {
        closeForm(false);
    };

    return (
        <div>
            <Form
                form={form}
                name="stickerSizeForm"
                onFinish={onSubmit}
                style={formsStyle}
            >
                <Typography.Text style={titleStyle}>
                    Введите данные для размера стикера
                </Typography.Text>

                <Form.Item
                    name="width"
                    label="Ширина (см)"
                    rules={[
                        {
                            required: true,
                            message: 'Введите ширину стикеров!',
                            validator: inputNumberZeroValidator
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="height"
                    label="Высота (см)"
                    rules={[
                        {
                            required: true,
                            message: 'Введите высоту стикеров!',
                            validator: inputNumberZeroValidator
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="number"
                    label="Количество"
                    rules={[
                        {
                            required: true,
                            message: 'Введите количество стикеров!'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Добавить размер
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Сбросить
                        </Button>
                        <Button htmlType="button" onClick={onClose} type='primary'>
                            Закрыть форму
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default StickerSizeForm;