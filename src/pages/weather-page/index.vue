<template>
  <div>
    <section class="weather-app-container">
      <main>
        <main-weather-info :weather-info="todayForecast"></main-weather-info>
      </main>
      <!-- <ul class="weather-info-list">
        <li v-for="(item,index) in weatherInfo?weatherInfo.forecasts[0].casts:[]" :key="index">
          <single-weather-info :weather-info="item"></single-weather-info>
        </li>
      </ul> -->
    </section>
  </div>
</template>

<script>
import { get } from "../../api/index.js";

import SingleWeatherInfo from "../../components/weather-page/single-weather-info.vue";
import MainWeatherInfo from "../../components/weather-page/main-weather-info.vue";

async function getWeather(cityCode) {
  let { data } = await get("http://restapi.amap.com/v3/weather/weatherInfo", {
    key: "516786aa1da89347ad99cc19c24488ac",
    city: cityCode,
    extensions: "all"
  });
  data = `{"status":"1","count":"1","info":"OK","infocode":"10000","forecasts":[{"city":"\u4e09\u6c99\u5e02","adcode":"460300","province":"\u6d77\u5357","reporttime":"2020-09-16 22:54:07","casts":[{"date":"2020-09-16","week":"3","dayweather":"\u591a\u4e91","nightweather":"\u96f7\u9635\u96e8","daytemp":"33","nighttemp":"27","daywind":"\u897f\u5317","nightwind":"\u897f\u5317","daypower":"5","nightpower":"5"},{"date":"2020-09-17","week":"4","dayweather":"\u66b4\u96e8","nightweather":"\u96f7\u9635\u96e8","daytemp":"32","nighttemp":"27","daywind":"\u4e1c\u5317","nightwind":"\u4e1c\u5317","daypower":"8","nightpower":"8"},{"date":"2020-09-18","week":"5","dayweather":"\u96f7\u9635\u96e8","nightweather":"\u96f7\u9635\u96e8","daytemp":"31","nighttemp":"27","daywind":"\u4e1c\u5357","nightwind":"\u4e1c\u5357","daypower":"7","nightpower":"7"},{"date":"2020-09-19","week":"6","dayweather":"\u5927\u96e8","nightweather":"\u4e2d\u96e8","daytemp":"31","nighttemp":"27","daywind":"\u5357","nightwind":"\u5357","daypower":"4","nightpower":"4"}]}]}`
  console.log(JSON.parse(data));
  return JSON.parse(data);
}

export default {
  components:{
    SingleWeatherInfo,
    MainWeatherInfo
  },
  data() {
    return {
      weatherInfo: {
        forecasts: [[]]
      },
      cachedInfo: {}
    };
  },
  props:{
      city: Object
  },
  methods: {
    cacheInfo(city, info) {
      this.cachedInfo[city] = {
        updateTime: new Date().getTime(),
        info
      };
    },
    async cityChange(e) {
      let { cachedInfo } = this;
      // debugger
      let newCity = e.target ? e.target.value : e;
      let newInfo;

      if (
        cachedInfo[newCity] &&
        new Date().getTime() - cachedInfo[newCity].updateTime < 600000
      ) {
        newInfo = cachedInfo[newCity].info;
        // debugger
      } else {
        newInfo = await getWeather(newCity);
        this.cacheInfo(newCity, newInfo);
      }

console.log(newInfo)
      this.weatherInfo = newInfo;
      this.todayForecast = newInfo.forecasts[0]
    }
  },
  watch:{
      city(nVal){
         this.cityChange(nVal. code);
      }
  },
  mounted(){
    console.log(this.city)
  }
};
</script>
<style>
ul.weather-info-list {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  list-style: none;
}
ul.weather-info-list li {
  flex-basis: 33.33%;
}
</style>
