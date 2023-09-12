import { Layout } from 'antd';
import './App.css';
import { GithubOutlined, MessageOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import CalculatorForm from './components/CalculatorForm';

const { Header, Content, Footer } = Layout;

const sideStyle = {
  height: '5vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  color: 'white',
  fontSize: '20px',
  fontWeight: 700,
  background: '#025373'
};

const contentStyle = {
  height: '90vh',
  background: '#dce8f2',
  color: 'white',
  fontSize: '16px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
};

const iconStyle = {
  cursor: 'pointer',
  fontSize: '25px',
  fill: 'white',
};

const linkStyle = {
  color: 'white',
};

function App() {
  return (
    <Layout>

      <Header style={sideStyle}>Sticker Calculator</Header>

      <Content style={contentStyle}>

        <CalculatorForm />

        {/* <StickersVisualization /> */}

      </Content>

      <Footer style={sideStyle}>
        <Link style={linkStyle} href='https://github.com/kuz4dev'><GithubOutlined style={iconStyle} /></Link>
        <Link style={linkStyle} href='https://t.me/ku_z_ya1'><MessageOutlined style={iconStyle} /></Link>
      </Footer>

    </Layout>
  );
}

export default App;
