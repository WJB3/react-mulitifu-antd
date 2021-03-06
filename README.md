<h1 align="center">Antd Multi Tabs Admin</h1>

<div align="center">ð ï¸Antdå¤æ ç­¾é¡µåå°ç®¡çæ¨¡æ¿ð ï¸</div>

<div align="center">
ç±äºä¸å¡ä¸æå¤é¡µç­¾éæ±ï¼ç½ä¸æ¾äºä¸åï¼é½æ¯åºäºantd proçæ¨¡æ¿ï¼å¤ªéäºï¼ä¸åæ¬¢ðã<br/>
äºæ¯èªå·±ä»ä»¥åçæ¡æ¶ä¸æ¹é ï¼æ­äºè¿ä¹ä¸ä¸ªç²¾ç®çæ¡æ¶ï¼ç¨å¾ä¹èæï¼ååð¤ªã

[é¢è§å°å](https://www.hongshaoli.com/antd-admin)
</div>
<br />

## ç¹æ§

- ð: **ä»£ç è§æ¨¡**ï¼ååç²¾ç®çèææ¶ï¼ä¸»å¼ æå°ï¼ä¸èè¿
- ð: **è¿½æ±åæ²¿**ï¼å¨ç«ä½¿ç¨ `React Hooks` å¼åï¼æå¼ `Class`
- ð: **ä¼éç¾è§**ï¼åºäº `Ant Design` ä½ç³»ç²¾å¿è®¾è®¡
- ð: **æµè¡ææ¯**ï¼ä½¿ç¨ `React/Redux/Antd` ç­åç«¯åæ²¿ææ¯å¼å
- ð¨: **ä¸»é¢æ ·å¼**ï¼ä½¿ç¨æµè¡ç`æé»æ¨¡å¼`ä¸»é¢ï¼æ¯æ`æ·±/æµè²`ä¸»é¢åæ¢

## ç¹ç¹

- å¤ tab é¡µç­¾âå³é®èåï¼æåæç
- Redux ç¶æç®¡çâæä¹å
- å°è£å®ç¨ axios è¯·æ±
- å¨æé¾å¼é¢åå±å¯¼èª
- èåé¡µé¢è·¯ç±æéæ§å¶
- lessâcss module æ ·å¼éç¦»
- åè¡¨âåé¡µâå¤éâæç´¢èå¨ç»ä»¶
- å¯èªå®ä¹ webpack éç½®âä¼åæå

## è¿æè§å

- éæååæµè¯ jest + enzymeï¼äºåè¦çç100%ðªð»ðªð»ï¼å­¦ä¹ ä¸­ð¤«ï¼
<br />

### é¢è§å¾

![](https://github.com/hsl947/hsl947.github.io/raw/master/images/antd-admin-1.png)
![](https://github.com/hsl947/hsl947.github.io/raw/master/images/antd-admin-2.png)
![](https://github.com/hsl947/hsl947.github.io/raw/master/images/antd-admin-3.png)
![](https://github.com/hsl947/hsl947.github.io/raw/master/images/antd-admin-4.png)
![](https://github.com/hsl947/hsl947.github.io/raw/master/images/antd-admin-5.png)
<br />

## ä½¿ç¨

### ä½¿ç¨å½ä»¤è¡
```bash
$ npm install -g typescript
$ git clone https://github.com/hsl947/react-antd-multi-tabs-admin.git
$ yarn install
$ yarn start         # è®¿é® http://localhost:666
```

### æéæ§å¶
<p>å¦æä¸éè¦æéæ§å¶ï¼å¯èªè¡æ³¨éå»ææéåè½ã</p>

```
# src/components/common/menu/index.tsx

// åå»ºå¯å±å¼çç¬¬ä¸çº§å­èå
const creatSubMenu = (data: any): JSX.Element => {
  // const menuItemList = []
  // data.routes.map((item: any) => {
  //   const arr = permission.filter((ele: any) => item.key === ele.code)
  //   if (arr.length > 0) {
  //     menuItemList.push(renderMenu(item))
  //   }
  //  return arr
  // })

  const menuItemList = data.routes.reduce(
    (prev: any, next: any) => [...prev, renderMenu(next)],
    []
  )

  return menuItemList.length > 0 ? (
    <SubMenu key={data.key} title={subMenuTitle(data)}>
      {menuItemList}
    </SubMenu>
  ) : null
}
```

```
# src/pages/container/index.tsx

// æ£æ¥æé
const checkAuth = (newPathname: string): boolean => {
  // ä¸éè¦æ£æ¥æéç
  // if (noCheckAuth.includes(newPathname)) {
  //   return true
  // }
  // const { tabKey: currentKey } = getKeyName(newPathname)
  // return isAuthorized(currentKey)

  // ä¸å®è¿å true
  return !!newPathname
}

```

### Redux çä½¿ç¨è¯´æ
```
# å¨/src/store/actionTypes/index.tsx å®ä¹æ°å­æ®µï¼æ ¼å¼å¦ä¸
export default {
  ...,
  SET_ACTION: {
    name: 'SET_ACTION',
    field: 'action'
  }
}

# å¨/src/store/state/index.tsx ä¹å®ä¹æ°å­æ®µï¼æ ¼å¼å¦ä¸
interface StoreState {
  ...;
  action: string;
}
const initState: StoreState = {
  ...,
  action: ''
}

# å¨è¦ä½¿ç¨çç»ä»¶ä¸­
import { connect } from 'react-redux'
import * as actions from '@/store/actions'
export default connect(
  (state) => state,
  actions
)(ComponentName)

# ç¶åå¨ props å°±æ setStoreData å±æ§ï¼å¯ç¨æ¥ dispatch
setStoreData('SET_ACTION', '')

# åªéè¦å®ä¹ type å stateï¼ä¸éè¦åæ¯ä¸ªactionï¼æçæé«äºæ¨ææï¼ï¼ï¼
```

### è·¯ç±/èåéç½®
```
# ææè·¯ç±åå¨ /src/route/routes.ts ï¼åæ¬èåæ çè·¯ç±ï¼
  ç¨äºè·¯ç±æéæ§å¶

# å·¦ä¾§èåè·¯ç±åå¨ /src/config/menu.ts
  ä»ç¨äºèåæ å±ç¤º

# åä¸¤å¥çåå æ¯ï¼æ¹ä¾¿ç»´æ¤ï¼å¦æä¸å«éº»ç¦ï¼å¯ä»¥é½åå¨ routes éï¼ç¨ä¸ä¸ªå­æ®µæ è¯èåè·¯ç±å³å¯
```

### å³äºæ¢è¤éç½®
> æ¬æ¡æ¶æ¯ä½¿ç¨ less.js å®ç°å¨æåæ¢ä¸»é¢ï¼jsæä»¶å¨ /public/less.min.js
```
# ä¸»é¢éç½®æä»¶å¨ /public/color.less

å¼ç¨äº antd ç»ä»¶åï¼åºæ¬ä¸éè¦èªå·±é¢å¤èªå®ä¹ä¸»é¢æ ·å¼ï¼å ä¸ºä¸»é¢æä»¶éé½æã
ä½æ¯ï¼ï¼ï¼
å¦æèªå·±åäºèªå®ä¹ç»ä»¶ï¼åæ¢ä¸»é¢åæ ·å¼æ¾ç¤ºä¸æ­£å¸¸ï¼
åéè¦èªå·±å¨ color.less åºé¨æ·»å æ·±æµä¸»é¢å¯¹åºçæ ·å¼ï¼å·ä½åèä¸»é¢æä»¶åé¢å¤éç½®ã

```

## æ¯æç¯å¢

ç°ä»£æµè§å¨å IE11ã

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## åä¸è´¡ç®

æä»¬éå¸¸æ¬¢è¿ä½ çè´¡ç®ï¼ä½ å¯ä»¥éè¿ä»¥ä¸æ¹å¼åæä»¬ä¸èµ·å±å»º :smiley:ï¼

- éè¿ [Issue](https://github.com/hsl947/react-antd-multi-tabs-admin/issues) æ¥å bugã
- æäº¤ [Pull Request](https://github.com/hsl947/react-antd-multi-tabs-admin/pulls) ä¸èµ·æ¹è¿ã
