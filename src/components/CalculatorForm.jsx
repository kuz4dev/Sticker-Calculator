import { Form, Input, Button, Space, Layout, Typography } from "antd";
import stickerCalculator from "../stickerCalculator";
import { useState } from "react";

const CalculatorForm = () => {

    const [isInfo, setIsInfo] = useState(false);

    const [form] = Form.useForm();

    const onFinish = ({ width, height, number }) => {
        console.log(width, height, number);
        setIsInfo(true);
        const [stickerInRow, rowCount, metersToPrint] = stickerCalculator(Number(width), Number(height), Number(number));

        console.log(stickerInRow, rowCount, metersToPrint);
    };

    const onFinishFailed = (errorInfo) => {
        setIsInfo(false);
    };

    const onReset = () => {
        setIsInfo(false);
        form.resetFields();
    };

    return (
        <>
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
                    label="Width"
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
                    label="Height"
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

            <br />

            {isInfo &&
                <>
                    <Typography>
                        <pre>Number of Stickers: { }</pre>
                        <pre>Final print price : { }</pre>
                        <pre>Meters to print: { }</pre>
                        <pre>The cost of one Sticker: { }</pre>
                    </Typography>
                </>
            }
        </>
    );
};

export default CalculatorForm;