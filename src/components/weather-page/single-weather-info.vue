<template>
  <div>
    <span>{{weatherInfo.date}} 星期{{weatherInfo.week === '7' ? '日' : chineseDigi[weatherInfo.week]}}</span>
    <section>
      <header>白天</header>
      <ul>
        <li>{{weatherInfo.dayweather}}</li>
        <li>{{weatherInfo.daytemp}}℃</li>
        <li>{{weatherInfo.daywind}}</li>
        <li>{{weatherInfo.daypower}}级</li>
      </ul>
    </section>
    <section>
      <header>夜间</header>
      <ul>
        <li>{{weatherInfo.nightweather}}</li>
        <li>{{weatherInfo.nighttemp}}℃</li>
        <li>{{weatherInfo.nightwind}}</li>
        <li>{{weatherInfo.nightpower}}级</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chineseDigi: [
        "〇",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十"
      ]
    };
  },
  props: {
    weatherInfo: Object
  }
};
</script>

<style>
li {
  margin: 0;
}
</style>