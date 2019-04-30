<!-- created by zhangming on 2019/4/30 -->
<template>
  <div
    class="line-chart"
    :chart_instance="`line-chart-${flag}`"
  >
  </div>
</template>

<script>
export default {
  name: 'LineChart',
  data () {
    return {
      flag: 0, // 标志位，用于保证图标唯一性（暂使用时间戳）
      svg: null, // 最终渲染的图表对象
      width: 0, // 图表宽度
      height: 0, // 图表高度
      margin: { // 图表外边距
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      dataPoints: 20, // 数据点个数
      xScale: null, // x轴
      yScale: null, // y轴
      line: null, // 曲线
      dataset: [] // 数据集
    }
  },
  methods: {
    // 图表创建
    handleChartMount () {
      this.flag = new Date().getTime()
      this.svg = d3.select('.line-chart').append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right) // 定宽
        .attr('height', this.height + this.margin.top + this.margin.bottom) // 定高
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')') // 位移
    },
    // 调整图表宽高
    handleChartSizeChange () {
      const el = document.getElementByAttr('div', 'chart_instance', `line-chart-${this.flag}`)
      const width = el.innerWidth - this.margin.left - this.margin.right
      const height = el.innerHeight - this.margin.top - this.margin.bottom
      this.width = width
      this.height = height
    },
    // 生成坐标轴
    handleAxisCreate () {
      this.xScale = d3.scaleLinear()
        .domain([0, this.dataPoints - 1])
        .range([0, this.width])
      this.yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([this.height, 0])
      this.svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(this.xScale))
      this.svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(this.yScale))
    },
    // 设置坐标轴和曲线样式
    handleLineSet () {
      this.line = d3.line()
        .x(function (d, i) {
          return this.xScale(i)
        }) // 设置x轴数据
        .y(function (d) {
          return this.yScale(d.y)
        }) // 设置y轴数据
        .curve(d3.curveMonotoneX) // 应用平滑曲线
    },
    // 数据集
    handleDatasetSet () {
      this.dataset = d3.range(this.dataPoints).map(function (d) {
        return { 'y': d3.randomUniform(1)() }
      })
    },
    // 画线
    handleLineDraw () {
      this.svg.append('path')
        .datum(this.dataset) // 绑定数据
        .attr('class', 'line') //
        .attr('d', this.line) // 画线
    }
  },
  mounted () {
    // 2. Use the margin convention practice
    const margin = { top: 100, right: 100, bottom: 100, left: 100 }
    const width = window.innerWidth - margin.left - margin.right // Use the window's width
    const height = window.innerHeight - margin.top - margin.bottom // Use the window's height

    // The number of datapoints
    const n = 21

    // 5. X scale will use the index of our data
    const xScale = d3.scaleLinear()
      .domain([0, n - 1]) // input
      .range([0, width]) // output

    // 6. Y scale will use the randomly generate number
    const yScale = d3.scaleLinear()
      .domain([0, 1]) // input
      .range([height, 0]) // output

    // 7. d3's line generator
    const line = d3.line()
      .x(function (d, i) {
        return xScale(i)
      }) // set the x values for the line generator
      .y(function (d) {
        return yScale(d.y)
      }) // set the y values for the line generator
      .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    const dataset = d3.range(n).map(function (d) {
      return { 'y': d3.randomUniform(1)() }
    })

    // 1. Add the SVG to the page and employ #2
    const svg = d3.select('.line-chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // 3. Call the x axis in a group tag
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale)) // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(yScale)) // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator
    svg.append('path')
      .datum(dataset) // 10. Binds data to the line
      .attr('class', 'line') // Assign a class for styling
      .attr('d', line) // 11. Calls the line generator

    // 12. Appends a circle for each datapoint
    svg.selectAll('.dot')
    svg.selectAll('.dot')
      .data(dataset)
      .enter().append('circle') // Uses the enter().append() method
      .attr('class', 'dot') // Assign a class for styling
      .attr('cx', function (d, i) {
        return xScale(i)
      })
      .attr('cy', function (d) {
        return yScale(d.y)
      })
      .attr('r', 5)
      .on('mouseover', function (a, b, c) {
        console.log(a)
        this.attr('class', 'focus')
      })
      .on('mouseout', function () {
      })
      .on('mousemove', mousemove)

    const focus = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none')

    focus.append('circle')
      .attr('r', 4.5)

    focus.append('text')
      .attr('x', 9)
      .attr('dy', '.35em')

    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', function () {
        focus.style('display', null)
      })
      .on('mouseout', function () {
        focus.style('display', 'none')
      })
      .on('mousemove', mousemove)

    function mousemove () {
      /* const x0 = x.invert(d3.mouse(this)[0])
      const i = bisectDate(data, x0, 1)
      const d0 = data[i - 1]
      const d1 = data[i]
      const d = x0 - d0.date > d1.date - x0 ? d1 : d0
      focus.attr('transform', 'translate(' + x(d.date) + ',' + y(d.close) + ')')
      focus.select('text').text(d) */
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
