import React from 'react';

import { Layout } from 'antd';

export default function Footer(){
        const{ Footer } = Layout;
        return(
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        );
}