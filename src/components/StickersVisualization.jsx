import { Typography } from "antd";
import Sticker from "./Sticker";

const { Text } = Typography;

const StickersVisualization = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px'
        }}>
            <Text style={{
                fontSize: '16px',
                fontWeight: 500
            }}>Displaying Stickers</Text>
            <div style={{
                background: '#025373',
                borderRadius: '5px',
                width: '400px',
                height: '500px',
                display: 'flex',
                gap: '2px',
                flexWrap: 'wrap',
                padding: '15px 2px 1px 2px',
            }}>
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
                <Sticker width='5' height='5' />
            </div>
        </div>
    );
};

export default StickersVisualization;