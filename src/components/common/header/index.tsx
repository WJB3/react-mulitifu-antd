import React, { useLayoutEffect, useState, useEffect, FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Dropdown, Layout, Row, Col, Input, Form, message, Space, Button } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import * as actions from '@/store/actions'
import style from './Header.module.less'
import { fullScreen, exitScreen } from '@/utils/screen';
import Api from '@/api/auth/useInfo'
import CustomModal from '@/components/CustomModal';
import { layout, tailLayout } from '@/utils/layout'
import Api2 from '@/api/global/auth'; 

const Header = (props) => {
  const history = useHistory()
  const [fullscreen, setFullscreen] = useState(false)

  const [userName, setUserName] = useState('Admin');

  const [useInfo, setUserInfo]: [any, any] = useState({});

  const [infoVisible, setInfoVisible] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  useLayoutEffect(() => {
    Api.getInfo().then(res => {
      setUserInfo(res || {})
      setUserName(res.username)

      localStorage.setItem("CURRENTTYPEID",res.userTypeId)

    })
  }, [localStorage.getItem('TOKEN')]);

  const [form2] = Form.useForm();

  const logout = async () => {
    localStorage.removeItem("MENU");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem('COLLAPSED')
    localStorage.removeItem("CURTAB");
    localStorage.removeItem("Functions");
    localStorage.removeItem("CURRENTUSER");

    let is_admin_login=localStorage.getItem('IS_ADMIN_LOGIN');

    if(is_admin_login){
      localStorage.removeItem('IS_ADMIN_LOGIN');
      history.replace({ pathname: '/login' })
    }else{
      localStorage.removeItem('IS_ADMIN_LOGIN');
      window.location.href='http://mec-peugeot.haiminglan.cn/'
    }
 
  
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={() => setInfoVisible(true)}>
        <span>个人资料</span>
      </Menu.Item>
      <Menu.Item onClick={() => setPasswordVisible(true)}>
        <span>修改密码</span>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  )

  useEffect(() => {
    if (localStorage.getItem('USERNAME')) {
      setUserName(localStorage.getItem('USERNAME'))
    }

  }, [localStorage.getItem('USERNAME')]);


  const toggle = (): void => {
    let toggleCollapsed = localStorage.getItem('COLLAPSED') === 'TRUE' ? 'FALSE' : 'TRUE'
    localStorage.setItem('COLLAPSED', toggleCollapsed)

    props?.forceUpdate()
  }

  // 更换主题
  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'themeJs'
    script.src = '/less.min.js'
    document.body.appendChild(script)

    setTimeout(() => {
      const themeStyle = document.getElementById('less:color')
      if (themeStyle) localStorage.setItem('themeStyle', themeStyle.innerText)
    }, 500)

  }, [])

  const iconStyle = {
    fontSize: 24
  }

  const handleChangeScreen = () => {
    if (fullscreen) {
      exitScreen()
      setFullscreen(false)
    } else {
      fullScreen()
      setFullscreen(true)
    }
  }

  const collapsed = localStorage.getItem('COLLAPSED') == 'TRUE';


  const handleSubmit = (values) => { 
 
    Api2.updatereset(values).then(res => {
      message.success("密码修改成功")
    }).catch((e) => {
      message.error("密码输入有误")
    })
  }

  return (
    <Layout.Header className={style.header} style={collapsed ? { width: `calc(100% - 80px)` } : { width: `calc(100% - 240px)` }}>
      <div>
        <div className={style.toggleMenu} onClick={toggle}>
          {collapsed ? (
            <MenuUnfoldOutlined className={style.trigger} />
          ) : (
            <MenuFoldOutlined className={style.trigger} />
          )}
        </div>

      </div>

      <div className={style.headerRight}>

        <div className={style.fullScreen} onClick={handleChangeScreen}>
          {
            fullscreen ? <FullscreenExitOutlined style={iconStyle} /> : <FullscreenOutlined style={iconStyle} />
          }
        </div>

        <Dropdown className={`fr ${style.content}`} overlay={menu}>
          <span className={style.user}>
            <span className="avart">{userName.substr(0, 1).toUpperCase()}</span>
            <span>{userName}</span>
          </span>
        </Dropdown>
      </div>

      <CustomModal visible={infoVisible} customTitle={"个人资料"} clickCancel={() => setInfoVisible(false)}>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>姓名：</Col>
          <Col span={16}>{useInfo.username}</Col>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>手机号：</Col>
          <Col span={16}>{useInfo.phone}</Col>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>登录次数：</Col>
          <Col span={16}>{useInfo.loginCount}</Col>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>登录时间：</Col>
          <Col span={16}>{useInfo.lastLoginTime}</Col>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>帐户状态：</Col>
          <Col span={16}>正常</Col>
        </Row>
      </CustomModal>

      <CustomModal size={'small'} visible={passwordVisible} customTitle={"资料修改"} clickCancel={() => setPasswordVisible(false)}>
        <Form
          name="basic"
          onFinish={handleSubmit}
          form={form2}
          {...layout}
        >

<Form.Item
            label="原密码"
            name="oldPassword"
            rules={[{ required: true, message: '请输入原密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="password"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="rePassword"
            rules={[{ required: true, message: '请输入确认密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space align="end" style={{ float: 'right' }}>
              <Button type="primary"   htmlType="submit" >
                保存
                            </Button>
              <Button type="default" onClick={() => setPasswordVisible(false)} >
                取消
                            </Button>
            </Space>
          </Form.Item>
        </Form>
      </CustomModal>

    </Layout.Header>
  )
}
export default connect(
  (state) => state,
  actions
)(Header)
