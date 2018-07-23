import React from 'react';
import { Link } from 'react-router-dom';
import Routes from './Routes';

import { Layout, Menu, Icon } from 'antd';

export default function Content(){
    const { SubMenu } = Menu;
    const { Sider, Content } = Layout;
        return(
            <Content  style={{ padding: '0 50px', marginTop: 64 }}>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', display: (sessionStorage.getItem('loginRole') === 'visitor') ? 'none' : 'block'}}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />My Profile</span>}>
                                <Menu.Item key="1">Detail<Link to={`/${sessionStorage.getItem('loginRole')}/detail`} /></Menu.Item>
                                <Menu.Item key="2">Enrolment<Link to={`/enrolments`} /></Menu.Item>
                                <Menu.Item key="3">Other</Menu.Item>
                                <Menu.Item key="4">TBD</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                            <Routes />
                        </div>
                    </Content>
                </Layout>
            </Content>
        );
}