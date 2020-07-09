<template>
  <div>
    <span>{{item.date}} 星期{{item.week === '7' ? '日' : chineseDigi[item.week]}}</span>
    <section>
      <header>白天</header>
      <ul>
        <li>{{item.dayweather}}</li>
        <li>{{item.daytemp}}℃</li>
        <li>{{item.daywind}}</li>
        <li>{{item.daypower}}级</li>
      </ul>
    </section>
    <section>
      <header>夜间</header>
      <ul>
        <li>{{item.nightweather}}</li>
        <li>{{item.nighttemp}}℃</li>
        <li>{{item.nightwind}}</li>
        <li>{{item.nightpower}}级</li>
      </ul>
    </section>
  </div>
</template>

<script>
import { watch } from "vue";
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
      ],
      item: null
    };
  },
  props: {
    weatherInfo: Object
  },
  watch: {
    weatherInfo(nVal) {
      this.item = nVal;
    }
  }
};
</script>

<style>
li {
  margin: 0;
}
</style>