import React, { useState } from 'react'
import { Layout, Icon } from 'antd'
import SiderMenu from './components/siderMenu'
import './index.less';

const { Header, Sider, Content } = Layout;

const App = (props) => {

  const [ collapsed, setCollapsed ] = useState(false)

  return (
    <Layout id={'container'}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <SiderMenu />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => {setCollapsed(!collapsed)}}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
)}

export default App