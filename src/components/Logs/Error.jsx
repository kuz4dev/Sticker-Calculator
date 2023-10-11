import { Typography } from "antd";

const Error = ({ title, message }) => {
    return (
        <div>
            <Typography>
                <Typography.Text>
                    {title}
                </Typography.Text>
                <pre>{message}</pre>
            </Typography>
        </div>
    );
};

export default Error;