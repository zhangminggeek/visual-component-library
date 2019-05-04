<!-- created by zhangming on 2019/4/30 -->
<template>
  <div class="line-chart"></div>
</template>

<script>
export default {
  name: 'LineChart',
  props: {
    margin: { // 图表外边距
      type: Object,
      default: () => {
        return {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        }
      }
    },
    dataset: { // 数据集
      type: Array,
      default: () => {
        return []
      }
    },
    /* xAxis: { // x轴相关配置
      type: Object,
      required: true
    }, */
    config: { // 对图表的配置
      type: Object,
      default: () => {
        return {
          smooth: false, // 是否使用曲线
          areaStyle: {}
        }
      }
    }
  },
  data () {
    return {
      svg: null, // 最终渲染的图表对象
      width: 0, // 图表宽度
      height: 0, // 图表高度
      dataPoints: 0, // 数据点个数
      xScale: null, // x轴
      yScale: null, // y轴
      line: null // 曲线
    }
  },
  mounted () {
    const el = document.getElementsByClassName(`line-chart`)[0]
    // 设置宽高
    this.width = el.clientWidth - this.margin.left - this.margin.right
    this.height = el.clientHeight - this.margin.top - this.margin.bottom

    // 设置数据点个数
    this.dataPoints = this.dataset.length

    // 设置x轴
    this.xScale = d3.scaleLinear()
      .domain([0, this.dataPoints - 1]) // 设置输入范围
      .range([0, this.width]) // 设置输出范围

    // 设置y轴
    this.yScale = d3.scaleLinear()
      .domain([0, 1]) // 设置输入范围
      .range([this.height, 0]) // 设置输出范围

    // 设置曲线
    this.line = d3.line()
      .x((d, i) => {
        return this.xScale(i)
      }) // 设置x轴的值
      .y((d) => {
        return this.yScale(d.y)
      }) // 设置y轴的值
      .curve(this.isSmooth ? d3.curveMonotoneX : d3.curveLinear) // 画线方式(curveMonotoneX: 保持 x 单调性的三次曲线, curveLinear: 折线)

    // 添加svg
    this.svg = d3.select('.line-chart').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')

    // 绑定x轴
    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.xScale).tickValues([1, 2, 3, 5, 8, 13, 21])) // 以底边作为x轴

    // 绑定y轴
    this.svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(this.yScale)) // 以左侧作为y轴

    // 绑定数据绘制路径
    this.svg.append('path')
      .datum(this.dataset) // 给路径绑定数据
      .attr('class', 'line')
      .attr('d', this.line) // 画线

    // 描点
    this.svg.selectAll('.dot')
      .data(this.dataset)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => {
        return this.xScale(i)
      })
      .attr('cy', (d) => {
        return this.yScale(d.y)
      })
      .attr('r', 5)

    const focus = this.svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none')

    focus.append('circle')
      .attr('r', 4.5)

    focus.append('text')
      .attr('x', 9)
      .attr('dy', '.35em')

    this.svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('mouseover', function () {
        focus.style('display', null)
      })
      .on('mouseout', function () {
        focus.style('display', 'none')
      })
  },
  computed: {
    isSmooth () {
      return !!this.config.smooth
    }
  }
}
</script>

<style scoped lang="scss">
  .line-chart {
    /deep/ .line {
      fill: none;
      stroke: #ffab00;
      stroke-width: 3;
    }
    /deep/ .overlay {
      fill: none;
      pointer-events: all;
    }
    /deep/ .dot {
      fill: #ffab00;
      stroke: #fff;
    }
    /deep/ .focus circle {
      fill: none;
      stroke: steelblue;
    }
  }

</style>
