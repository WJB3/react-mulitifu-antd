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

      sessionStorage.setItem("CURRENTTYPEID",res.userTypeId)

    })
  }, [sessionStorage.getItem('TOKEN')]);

  const [form2] = Form.useForm();

  const logout = async () => {
    sessionStorage.removeItem("MENU");
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("USERNAME");
    sessionStorage.removeItem('COLLAPSED')
    sessionStorage.removeItem("CURTAB");
    sessionStorage.removeItem("Functions");
    sessionStorage.removeItem("CURRENTUSER");

    let is_admin_login=sessionStorage.getItem('IS_ADMIN_LOGIN');

    if(is_admin_login){
      sessionStorage.removeItem('IS_ADMIN_LOGIN');
      history.replace({ pathname: '/login' })
    }else{
      sessionStorage.removeItem('IS_ADMIN_LOGIN');
      window.location.href='http://mec-peugeot.haiminglan.cn/'
    }
 
  
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={() => setInfoVisible(true)}>
        <span>????????????</span>
      </Menu.Item>
      <Menu.Item onClick={() => setPasswordVisible(true)}>
        <span>????????????</span>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <span>????????????</span>
      </Menu.Item>
    </Menu>
  )

  useEffect(() => {
    if (sessionStorage.getItem('USERNAME')) {
      setUserName(sessionStorage.getItem('USERNAME'))
    }

  }, [sessionStorage.getItem('USERNAME')]);


  const toggle = (): void => {
    let toggleCollapsed = sessionStorage.getItem('COLLAPSED') === 'TRUE' ? 'FALSE' : 'TRUE'
    sessionStorage.setItem('COLLAPSED', toggleCollapsed)

    props?.forceUpdate()
  }

  // ????????????
  useEffect(() => {
    // const script = document.createElement('script')
    // script.id = 'themeJs'
    // script.src = '/less.min.js'
    // document.body.appendChild(script)

    // setTimeout(() => {
    //   const themeStyle = document.getElementById('less:color')
    //   if (themeStyle) sessionStorage.setItem('themeStyle', themeStyle.innerText)
    // }, 500)

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

  const collapsed = sessionStorage.getItem('COLLAPSED') == 'TRUE';


  const handleSubmit = (values) => { 
 
    Api2.updatereset(values).then(res => {
      message.success("??????????????????")
    }).catch((e) => {
      message.error("??????????????????")
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

      <CustomModal visible={infoVisible} customTitle={"????????????"} clickCancel={() => setInfoVisible(false)}>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>?????????</Col>
          <Col span={16}>{useInfo.username}</Col>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>????????????</Col>
          <Col span={16}>{useInfo.phone}</Col>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>???????????????</Col>
          <Col span={16}>{useInfo.loginCount}</Col>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>???????????????</Col>
          <Col span={16}>{useInfo.lastLoginTime}</Col>
        </Row>
        <Row style={{ padding: '10px 0' }}>
          <Col span={6} style={{ textAlign: 'right' }}>???????????????</Col>
          <Col span={16}>??????</Col>
        </Row>
      </CustomModal>

      <CustomModal size={'small'} visible={passwordVisible} customTitle={"????????????"} clickCancel={() => setPasswordVisible(false)}>
        <Form
          name="basic"
          onFinish={handleSubmit}
          form={form2}
          {...layout}
        >

<Form.Item
            label="?????????"
            name="oldPassword"
            rules={[{ required: true, message: '??????????????????' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="?????????"
            name="password"
            rules={[{ required: true, message: '??????????????????' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="????????????"
            name="rePassword"
            rules={[{ required: true, message: '?????????????????????' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space align="end" style={{ float: 'right' }}>
              <Button type="primary"   htmlType="submit" >
                ??????
                            </Button>
              <Button type="default" onClick={() => setPasswordVisible(false)} >
                ??????
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
