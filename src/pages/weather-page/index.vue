<template>
  <div>
    <section class="weather-app-container">
      <main>
        <main-weather-info
          :weather-info=" weatherInfo.forecasts.length? weatherInfo.forecasts[0].casts[0] :{}"
        ></main-weather-info>
      </main>
      <ul class="weather-info-list">
        <template
          v-for="(item,index) in weatherInfo.forecasts.length?weatherInfo.forecasts[0].casts:[]"
        >
          <li v-if="index !== 0" :key="index">
            <single-weather-info :weather-info="item"></single-weather-info>
          </li>
        </template>
      </ul>
    </section>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { get } from "../../api/index.js";

import SingleWeatherInfo from "../../components/weather-page/single-weather-info.vue";
import MainWeatherInfo from "../../components/weather-page/main-weather-info.vue";

// eslint-disable-next-line no-unused-vars
async function getWeather(cityCode) {
  // let { data } = await get("http://restapi.amap.com/v3/weather/weatherInfo", {
  //   key: "516786aa1da89347ad99cc19c24488ac",
  //   city: cityCode,
  //   extensions: "all",
  // });
  let data = {
    status: "1",
    count: "1",
    info: "OK",
    infocode: "10000",
    forecasts: [
      {
        city: "三沙市",
        adcode: "460300",
        province: "海南",
        reporttime: "2020-09-16 22:54:07",
        casts: [
          {
            date: "2020-09-16",
            week: "3",
            dayweather: "多云",
            nightweather: "雷阵雨",
            daytemp: (Math.random() * 100).toFixed(1),
            nighttemp: "27",
            daywind: "西北",
            nightwind: "西北",
            daypower: "5",
            nightpower: "5",
          },
          {
            date: "2020-09-17",
            week: "4",
            dayweather: "暴雨",
            nightweather: "雷阵雨",
            daytemp: "32",
            nighttemp: "27",
            daywind: "东北",
            nightwind: "东北",
            daypower: "8",
            nightpower: "8",
          },
          {
            date: "2020-09-18",
            week: "5",
            dayweather: "雷阵雨",
            nightweather: "雷阵雨",
            daytemp: "31",
            nighttemp: "27",
            daywind: "东南",
            nightwind: "东南",
            daypower: "7",
            nightpower: "7",
          },
          {
            date: "2020-09-19",
            week: "6",
            dayweather: "大雨",
            nightweather: "中雨",
            daytemp: "31",
            nighttemp: "27",
            daywind: "南",
            nightwind: "南",
            daypower: "4",
            nightpower: "4",
          },
        ],
      },
    ],
  };

  // eslint-disable-next-line no-debugger
  // debugger
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
}

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SingleWeatherInfo,
    MainWeatherInfo,
  },
  data() {
    return {
      weatherInfo: {
        forecasts: [],
      },
      cachedInfo: {},
    };
  },
  mounted() {
    // eslint-disable-next-line no-debugger
    // debugger
    this.cityChange(this.city.code);
    // console.log
  },
  props: {
    city: Object,
  },
  methods: {
    cacheInfo(city, info) {
      // eslint-disable-next-line no-debugger
      // debugger
      this.cachedInfo[city] = {
        updateTime: new Date().getTime(),
        info,
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

      this.weatherInfo = newInfo;
    },
  },
  watch: {
    city(nVal) {
      this.cityChange(nVal.code);
    },
  },
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
