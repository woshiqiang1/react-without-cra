import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';

function SiderMenu () {

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to={'counter'}>
          <Icon type="user" />
          <span>nav 1</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={'list'}>
          <Icon type="video-camera" />
          <span>nav 2</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="upload" />
        <span>nav 3</span>
      </Menu.Item>
    </Menu>
  )
}

export default SiderMenu