import React, { useState, useEffect, FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Dropdown, Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import * as actions from '@/store/actions'
import style from './Header.module.less'
import { fullScreen,exitScreen } from '@/utils/screen'; 

const Header = (props) => {
  const history = useHistory()  
  const [fullscreen, setFullscreen] = useState(false) 

  const logout = async () => {
    localStorage.setItem("MENU",null);
    localStorage.setItem("TOKEN",null);
    localStorage.setItem("USERNAME",null);
    localStorage.setItem("CURTAB","[]");
    history.replace({ pathname: '/login' })
  } 

  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  )
 

  const toggle = (): void => {
    let toggleCollapsed=localStorage.getItem('COLLAPSED')==='TRUE'?'FALSE':'TRUE'  
    localStorage.setItem('COLLAPSED',toggleCollapsed)

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

  const iconStyle={
    fontSize:24
  }

  const handleChangeScreen=()=>{
    if(fullscreen){
      exitScreen()
      setFullscreen(false)
    }else{
      fullScreen()
      setFullscreen(true)
    }
  }

  const collapsed=localStorage.getItem('COLLAPSED')=='TRUE'; 

  return (
    <Layout.Header className={style.header}  style={collapsed?{width:`calc(100% - 80px)`}:{width:`calc(100% - 240px)`}}>
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
            fullscreen ? <FullscreenExitOutlined style={iconStyle}/> :<FullscreenOutlined style={iconStyle}/>
          }
        </div>
 
        <Dropdown className={`fr ${style.content}`} overlay={menu}>
          <span className={style.user}> 
            <span className="avart">{'A'}</span>
            <span>{'Admin'}</span>
          </span>
        </Dropdown>
      </div>

    </Layout.Header>
  )
}
export default connect(
  (state) => state,
  actions
)(Header)
