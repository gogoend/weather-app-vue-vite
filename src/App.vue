<!--
 * @Author: gogoend
 * @Date: 2020-07-07 22:06:19
 * @LastEditors: gogoend
 * @LastEditTime: 2020-07-09 20:56:44
 * @FilePath: \vite-test\src\App.vue
 * @Description: 
--> 
<template>
  <div className='app-wrap'>
    <nav>
      <h1>{{globalCurrentCity.city}}</h1>
      <section class='city-select'>
        <select @change="globalCityChange" :value="globalCurrentCity.code">
          <option v-for="item in cityCode" :key="item.code" :value="item.code">{{item.city}}</option>
        </select>
      </section>
    </nav>
    <WeatherPage :city="globalCurrentCity" />
  </div>
</template>

<script>
import WeatherPage from './pages/weather-page/index.vue'
const cityList = [
  {
    city: '北京',
    province: '北京',
    code: 110000
  },
  {
    city: '上海',
    province: '上海',
    code: 310000
  },
  {
    city: '成都',
    province: '四川',
    code: 510100
  },
  {
    city: '三沙',
    province: '海南',
    code: 460300
  },
  {
    city: '深圳',
    province: '广东',
    code: 440300
  },
  {
    city: '厦门',
    province: '福建',
    code: 350200
  },
  {
    city: '广州',
    province: '广东',
    code: 440100
  },
  {
    city: '重庆',
    province: '重庆',
    code: 500000
  },
  {
    city: '杭州',
    province: '浙江',
    code: 330100
  },
  {
    city: '拉萨',
    province: '西藏',
    code: 540100
  }
]
function getInfoById(dict, id, field) {
  let result = dict.filter(item => {
    return item[field] === id
  })

  return result
}
export default {
  name: "App",
  components: {},
  data(){
    return {
      cityCode:cityList,
      globalCurrentCity: getInfoById(cityList, 110000, 'code')[0]
    }
  },
  methods: {
    globalCityChange(e) {
      let cityCode = Number(e.target.value);
      this.globalCurrentCity = getInfoById(cityList, cityCode, "code")[0]
    }
  }
};
</script>
