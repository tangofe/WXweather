//index.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    weather:{
      wendu: 18,
      ganmao: '昼夜温差较大，较易发生感冒，请适当增减衣服。体质较弱的朋友请注意防护。',
      yesterday: {
        date: '17日星期四',
        type: '阴',
        fx: '南风',
        fl: '微风级',
        low: '低温 8°c',
        high: '高温 16°c',
      },
      forecast: [
        {
          date: '18日星期五',
          type: '阴',
          high: '高温 16°c',
          low: '低温 8°c',
          fengxiang: '南风',
          fengji: '微风级',
        },
        {
          date: '18日星期五',
          type: '阴',
          high: '高温 16°c',
          low: '低温 8°c',
          fengxiang: '南风',
          fengji: '微风级',
        },
        {
          date: '18日星期五',
          type: '阴',
          high: '高温 16°c',
          low: '低温 8°c',
          fengxiang: '南风',
          fengji: '微风级',
        },
        {
          date: '18日星期五',
          type: '阴',
          high: '高温 16°c',
          low: '低温 8°c',
          fengxiang: '南风',
          fengji: '微风级',
        },
        {
          date: '18日星期五',
          type: '阴',
          high: '高温 16°c',
          low: '低温 8°c',
          fengxiang: '南风',
          fengji: '微风级',
        },
        {
          date: '18日星期五',
          type: '阴',
          high: '高温 16°c',
          low: '低温 8°c',
          fengxiang: '南风',
          fengji: '微风级',
        }
      ]
    },
    today: '2016-11-18',
    city: '北京',
    inputCity: '',
  },
  onLoad: function (options) {
    this.setData({
      today: util.formatTime(new Date()).split(' ')[0],  //更新当前日
      city: '东莞',
    });
    var self = this;
   // console.log(this.data.city);
    this.searchWeather(this.data.city);
    /*wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        wx.request({
          url: 'http://api.map.baidu.com/geocoder/v2/' +
            '?ak=ASAT5N3tnHIa4APWOSNPeXN5&location=' +
            res.latitude+',' + res.longitude + '&output=json&pois=0',
          data:{},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            var city = res.data.result.addressComponent.city.replace('市',''); //城市名称
           // self.searchWeather(city);  //查询指定城市得天气信息
            console.log(city);
          }
        })
      },
    })*/
  },
  searchWeather: function(cityName) {
    var self = this;
    //console.log(cityName);
    wx.request({
      //天气预报查询接口
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + cityName,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if(res.data.status == 1002)  //无此城市
        {
          //显示错误信息
          wx.showModal({
            title: '提示',
            content: '输入的城市名称有误，请重新输入！',
            showCancel: false,
            success: function(res) {
              self.setData({inputCity: ''})
            }
          })
        }else {
          console.log(res);
          var weather = res.data.data; //获取天气数据
          for(var i=0; i<weather.forecast.length; i++)
          {
            var d= weather.forecast[i].date;
            weather.forecast[i].date = '　'+ d.replace('星期','　　星期');
          }
          self.setData({
            city: cityName,  //更新显示城市名称
            weather: weather,//更新天气信息
            inputCity: '',   //清空查询输入符
          })
        }
      }
    })
  },
  //输入事件
  inputing: function(e) {
    this.setData({
      inputCity: e.detail.value,
    });
  },
  //搜索按钮
  bindSearch: function(){
    this.searchWeather(this.data.inputCity);
  }
})
