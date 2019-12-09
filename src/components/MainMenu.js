import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'

class MainMenu extends React.Component {
  render() {
    const selectedKey = this.props.location.pathname === '/phoneBook' ? '2' : '1';
    return (
      <Menu
        style={{ width: 200 }}
        defaultSelectedKeys={['1']}
        selectedKeys={[selectedKey]}
        theme="dark"
        mode="inline"
      >
        <Menu.Item key="1">
          <Link to='/workPlaces'>Места работы</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to='/phoneBook'>Телефонная книга</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(MainMenu);