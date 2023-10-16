import { Typography } from "antd";
import { titleStyle } from "../../styles/style";

const Error = ({ title, message }) => {
    return (
        <div>
            <Typography>
                <Typography.Text style={titleStyle}>
                    {title}
                </Typography.Text>
                <pre style={{ margin: '5px' }}>{message}</pre>
            </Typography>
        </div>
    );
};

export default Error;