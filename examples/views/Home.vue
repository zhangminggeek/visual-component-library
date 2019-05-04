<template>
  <div class="home">
    <line-chart
      class="chart"
      :dataset="dataset">
    </line-chart>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      dataset: [
        { y: 0.12312412413 },
        { y: 0.45345345323 },
        { y: 0.14353412413 },
        { y: 0.98843735372 },
        { y: 0.56438234723 },
        { y: 0.88882342912 },
        { y: 0.53453435234 },
        { y: 0.23424234467 },
        { y: 0.48983792384 },
        { y: 0.79823842034 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .chart{
    width: 500px;
    height: 500px;
  }
</style>
