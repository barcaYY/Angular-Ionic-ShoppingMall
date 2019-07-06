import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  detail = DetailPage
  cList = []//保存的是轮播图数据
  nList = []//保存是新品上市的数据newArrialItems
  rList = []//保存的是recommendedItems

  constructor(
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    // 发送请求
    var url = "http://localhost:8080/index"
    this.myHttp.get(url)
    .subscribe((result:any)=>{
      console.log(result)//result是一个对象
      // 保存数据：carouselItems
      this.cList = result.carouselItems
      this.nList = result.newArrialItems
      
      this.rList = result.recommendedItems
    })

    // 显示在视图
  }

}
