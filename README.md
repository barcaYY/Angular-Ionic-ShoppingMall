# ShoppingMall
1、准备开发环境
①启动apache和mysql/Nodejs(8.1.1)
②所有的服务器端php文件修改 
 php中设置：
 header('Access-Control-Allow-Origin:http://localhost:8100');
 header('Access-Control-Allow-Credentials:true');
 客户端请求时设置：
 this.http.get(myUrl, { withCredentials: true }) 
③新建一个工程将压缩包和nodeModules准备一下，目的是实现在vsCode中打开终端之后，可以通过ionic serve -l 来启动开发服务器；否则项目无法进行

2、搭建项目框架 
 步骤1 :创建公用服务
 在app目录下创建文件夹utility,
 在utility中创建service文件夹，在该文件夹下创建网络请求服务myhttp.service.ts
 步骤2：在pages目录下创建以下page（通过命令行 ionic g page ***）

home 根页面 (调用ionTabs)
index  首页
detail 详情
cart   购物车
login  登录
order-confirm 订单确认
pay    支付
user-center   用户中心
not-found     404页面
需求：根页面显示4个tab，第一个index，第二个cart ，第三个user-center，第四个not-found

所用到的图标
camera
chatboxes
cart
settings
person
home
heart
bookmark
pin
close
help

准备工作:
 ①node app.js 之前要记得将跨域访问4200-->8100
 ②mysql （压缩包见Mall_api,内附接口文档）
 ③给工程准备点图片

一、index
 ①向服务器端请求
  http://localhost:8080/index
 ②将数据保存
 ③显示 
  轮播图 ionSlides
   //读取服务器端返回carouselItems数组

  新品上市 newArrivalItems
   ①保存newArrivalItems
   ②newArrivalItems显示在ionScroll（支持横向滚动）

  recommendedItems
   显示在缩略图列表中
   ④在点击缩略图列表项时，以navPush跳转到详情页
   同时将商品的pid，发送给详情页
  
二、detail
  ①接收传来的商品的id （先打印出来。。。）
  ②请求给id对应的商品详情数据
   http://localhost:8080/product/detail?lid=1
  ③将请求到的详情数据 显示在视图
  ④点击页脚的按钮时的处理
    通过ion-footer来实现的，它会固定在页面的底部。
    注意事项：如果从tab中，点击页面跳转到下一个子页面，需要自动隐藏tabs，指定tabsHideOnSubPages='true'
	第一个图标--》404
	第二个图标--》购物车
	第三个图标--》404
	加入购物车按钮--》将当前的商品添加到购物车（无论成功还是失败，toast）
	http://localhost:8080/cart/add?lid=1&buyCount=1 如果code是300，通过toast来提示未登录；如code是200，通过toast提示‘添加购物车成功’

三、404页面
  ①倒计时
  ②页面离开时，做清理工作 ionViewWillLeave
  知识点：
	this.navCtrl.canGoBack()的返回值的真假，来决定是否可以返回上一页

四、登录页面
 ngModel
 双向数据绑定：
	方向1：将变量或者表达式的结果 绑定到视图
	方向2：将表单元素中 用户操作的结果 绑定到变量
	注意事项：框架中实现方向1的绑定的指令有很多，像*ngFor *ngIf...;但是方向2的绑定的指令只有一个ngModel
 ①搞定静态页面
 ②处理点击登录的行为
  获取用户名、密码；   
  http://localhost:8080/user/login 发送请求(提醒①post ②两个参数uname/upwd)
  this.myHttp.post(url,参数).subscribe()

  打印登录后的结果
  登录成功，返回上一页/登录失败，显示一个toast

五、购物车
  ①根据服务器端 获取到的购物车数据
    http://localhost:8080/cart/list （注意：在请求的时候，要记得携带凭证）
    如果code是300---》跳转到login
    如果code是200-->打印出来
  ②将购物车中的数据 渲染在视图
	  购物车中有数据和无数据，分为两种情况来显示
    Angular 管道/过滤器：本质就是由参数有返回值的方法，定位让数据进行刷选、过滤、格式化更好显示出来
    currency/slice/number...
  ③实现全选功能
    给购物车list中每个商品 添加一个isSelected属性，将该属性的值 通过双向数据绑定 绑定到复选框
    全选--》将list所有的复选框的isSelected
    list中复选框都选中--》全选自动被选中
    list中复选框有一个未选中--》全选自动取消选中
  ④计算总计的功能
    计算list中isSelected为true的产品：数量乘以单价的总和
  ⑤点击按钮时的处理
    - --》商品count-- （最小为1）
    + --》商品count++  
    去结算--》跳转到订单确认

六、订单确认页面 
 1、获取购物车列表
 2、通过一个缩略图列表显示
 3、点击在线支付 弹出一个模态窗（模态窗的内容是支付PayPage）
 4、实现支付页面静态页面
 5、实现支付页面动态功能
	点击支付-》显示一个3s中的loading--》跳转到首页
	点击x号--》关闭模态窗(ViewController)
  强调知识点：
	在模态窗关闭 如何进行参数的传递？？
	this.viewCtrl.dimiss({id:0})

七、实现个人中心
	1、显示静态页面
	2、实现退出登录的功能
