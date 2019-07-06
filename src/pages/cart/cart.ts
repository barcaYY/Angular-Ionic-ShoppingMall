import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  myList = [] //保存的是成功获取到的购物车列表

  constructor(
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');  
  }

  ionViewWillEnter(){
    //请求购物车列表
    var url = "http://localhost:8080/cart/list";

    this.myHttp
     .get(url,{withCredentials:true}).subscribe((result:any)=>{
       console.log(result)
       if(result.code == 300){
         this.navCtrl.push(LoginPage)
       }else if(result.code == 200){
         console.log('购物车列表获取成功',result)
        //  (:- 17:45)
         //保存result.data 到视图中显示（购物车中有数据和无数据，分为两种情况来显示）
         this.myList = result.data
       }
     })
  }

}
