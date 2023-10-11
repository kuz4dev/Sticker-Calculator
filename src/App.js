import { Layout } from 'antd';
import './App.css';
import { GithubOutlined, MessageOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import CalculatorForm from './components/CalculatorForm/CalculatorForm';
import { contentStyle, iconStyle, linkStyle, sideStyle } from './styles/style';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>

      <Header style={sideStyle}>Sticker Calculator</Header>

      <Content style={contentStyle}>

        <CalculatorForm />

      </Content>

      <Footer style={sideStyle}>
        <Link style={linkStyle} href='https://github.com/kuz4dev'><GithubOutlined style={iconStyle} /></Link>
        <Link style={linkStyle} href='https://t.me/ku_z_ya1'><MessageOutlined style={iconStyle} /></Link>
      </Footer>

    </Layout>
  );
}

export default App;
