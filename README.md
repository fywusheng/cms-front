专题组件库
========== 


按需开启cotton和topic两个项目的本地服务器。


情景一：只需要修改content面板的交互，不涉及前台组件
--------------
```
//cotton
npm run dev
 
 
/*
 访问编辑页(page_id为test的页面)
 http://localhost:9090/#/topic/edit/test
 
 
 core数据：dev环境
 page模板：dev环境
*/
```


情景二：只需要修改前台组件样式，不涉及后台
--------------

```
//topic
npm run dev
 
 
/*
 访问前台页(page_id为test的页面)
 http://localhost:9091/?id=test
 
 core数据：dev环境
 page模板：本地环境
*/
```

情景三：新开发组件，前后台组件都要涉及，双开
--------------
```
//cotton
npm run dev-topic
 
//topic
npm run dev
 
 
/*
 访问编辑页(page_id为test的页面)
 http://localhost:9090/#/topic/edit/test
 
 访问前台页(page_id为test的页面)
 http://localhost:9091/?id=test
 
 core数据：dev环境
 page模板：本地环境
*/
```