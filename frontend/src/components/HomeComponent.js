import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const HomeComponent = ({ children }) => {
  const location = useLocation();
  let key;
  if (location.pathname.includes('admin')) {
    key = '2';
  } else {
    key = '1';
  }
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[key]}>
          <Menu.Item key="1">
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin">Admin Panel</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        </Breadcrumb>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©2023 Created by Shotx
      </Footer>
    </Layout>
  );
};

export default HomeComponent;
