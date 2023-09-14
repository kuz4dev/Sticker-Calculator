import { Form, Input, Button, Space, Typography } from "antd";
import stickerCalculator from "../stickerCalculator";
import { useState } from "react";

const CalculatorForm = () => {

    const [isInfo, setIsInfo] = useState(false);
    const [sticker, setSticker] = useState();
    const [final, setFinal] = useState();
    const [meters, setMeters] = useState();
    const [oneSticker, setOneSticker] = useState();
    const [minSticker, setMinSticker] = useState();

    const [isError, setIsError] = useState(false);

    const [form] = Form.useForm();

    const onFinish = ({ width, height, number }) => {
        const [stickerInRow, finalPrice, metersToPrint, oneStickerPrice, minStickersToPrint] = stickerCalculator(Number(width), Number(height), Number(number));

        console.log(stickerInRow, finalPrice, metersToPrint, oneStickerPrice, minStickersToPrint)

        if (stickerInRow < 1) {
            setIsError(true);
            setIsInfo(false);
        } else {
            setIsError(false);
            if (minStickersToPrint > number) {
                setMinSticker(minStickersToPrint);
                setIsInfo(false);
            } else {
                setMinSticker(null);
                setSticker(stickerInRow);
                setFinal(finalPrice);
                setMeters(metersToPrint);
                setOneSticker(oneStickerPrice);
                setIsInfo(true);
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        setIsInfo(false);
    };

    const onReset = () => {
        setIsInfo(null);
        setIsError(false);
        form.resetFields();
    };

    const styles = {
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div style={styles} >
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="width"
                    label="Width (sm)"
                    rules={[
                        {
                            required: true,
                            message: 'Enter the width of the stickers'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="height"
                    label="Height (sm)"
                    rules={[
                        {
                            required: true,
                            message: 'Enter the height of the stickers'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="number"
                    label="Number"
                    rules={[
                        {
                            required: true,
                            message: 'Enter the number of stickers'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

            {isInfo &&
                <div>
                    <Typography>
                        <pre>Number of Stickers in row: {sticker}</pre>
                        <pre>Final print price : {final} rub</pre>
                        <pre>Meters to print: {meters}</pre>
                        <pre>The cost of one Sticker: {oneSticker} rub</pre>
                    </Typography>
                </div>
            }

            {!isInfo &&
                <div>
                    <Typography>
                        <Typography.Text>The minimum length of the canvas for printing is 0.5 meters</Typography.Text>
                        <pre>Minimum number of stickers: {minSticker}</pre>
                    </Typography>
                </div >
            }

            {
                isError &&
                <div>
                    <Typography>
                        <Typography.Text>
                            Warning!
                        </Typography.Text>
                        <Typography.Text>
                            <pre>Max sticker width and height is 96 sm!</pre>
                        </Typography.Text>
                    </Typography>
                </div>
            }
        </div >
    );
};

export default CalculatorForm;