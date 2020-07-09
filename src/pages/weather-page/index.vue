<template>
  <div>
    <section class="weather-app-container">
      <main>
        <main-weather-info :weather-info="todayForecast"></main-weather-info>
      </main>
      <ul class="weather-info-list">
        <li v-for="(item,index) in weatherInfo?weatherInfo.forecasts[0].casts:[]" :key="index">
          <single-weather-info :weather-info="item"></single-weather-info>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { get } from "../../api/index.js";

import SingleWeatherInfo from "../components/weather-page/single-weather-info.vue";
import MainWeatherInfo from "../components/weather-page/main-weather-info.vue";

async function getWeather(cityCode) {
  let { data } = await get("http://restapi.amap.com/v3/weather/weatherInfo", {
    key: "516786aa1da89347ad99cc19c24488ac",
    city: cityCode,
    extensions: "all"
  });
  console.log(JSON.parse(data));
  return JSON.parse(data);
}

export default {
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

      this.weatherInfo = newInfo;
    }
  },
  watch:{
      city(nVal){
        this.cityChange(nVal.city.code);
      }
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
