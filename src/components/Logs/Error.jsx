import { Typography } from "antd";
import { error } from "./../../styles/style";

const Error = ({ title }) => {
    return (
        <div>
            <Typography>
                <Typography.Text style={error}>
                    {title}
                </Typography.Text>
                {/* <pre style={{ margin: '5px' }}>{message}</pre> */}
            </Typography>
        </div>
    );
};

export default Error;