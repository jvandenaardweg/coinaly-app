import Chart from 'chart.js'
import { generateChart } from 'vue-chartjs'

Chart.defaults.LineWithLine = Chart.defaults.line
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function (ease) {
    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      var activePoint = this.chart.tooltip._active[0]
      var ctx = this.chart.ctx
      var x = activePoint.tooltipPosition().x
      var topY = this.chart.scales['y-axis-0'].top
      var bottomY = this.chart.scales['y-axis-0'].bottom

      // draw line
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, topY)
      ctx.lineTo(x, bottomY)
      ctx.lineWidth = 2
      ctx.strokeStyle = '#212529'
      ctx.stroke()

      // Upper tooltip
      var value = this.chart.data.datasets[activePoint._datasetIndex].data[activePoint._index]
      ctx.font = `${this.chart.options.tooltips.titleFontStyle} ${this.chart.options.tooltips.titleFontSize}px Arial`
      var xPad = this.chart.options.tooltips.xPadding
      var yPad = this.chart.options.tooltips.yPadding
      var width = ctx.measureText(value).width + xPad * 2
      var height = this.chart.options.tooltips.titleFontSize + yPad * 2
      var radius = this.chart.options.tooltips.cornerRadius
      // console.log(activePoint, topY, xPad, yPad, ctx.font)
      ctx.fillStyle = this.chart.options.tooltips.backgroundColor
      ctx.lineWidth = this.chart.options.tooltips.borderWidth
      var y = topY
      x = x - width / 2

      // draw rect upper tooltip
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
      ctx.fill()

      // draw text
      ctx.textBaseline = 'top'
      ctx.fillStyle = this.chart.options.tooltips.titleFontColor
      ctx.fillText(value, x + xPad, topY + yPad)
    }

    // Leave this line here
    // So the vertical hover line is UNDER the dot
    Chart.controllers.line.prototype.draw.call(this, ease)
  }
})

// The bottom tooltip
Chart.Tooltip.positioners.custom = function (elements, eventPosition) {
  // var tooltip = this
  return {
    x: eventPosition.x,
    y: elements[0]._chart.height + 2
  }
}

const CustomLine = generateChart('ctx', 'LineWithLine')

export default {
  extends: CustomLine,
  props: {
    labels: {
      type: Array,
      required: false
    },
    data: {
      type: Array,
      required: true
    },
    backgroundColor: {
      type: String,
      required: false,
      default: '#2E63B1'
    },
    borderColor: {
      type: String,
      required: false,
      default: '#2E63B1'
    },
    borderWidth: {
      type: Number,
      required: false,
      default: 1
    },
    height: {
      type: Number,
      required: false,
      default: 200
    },
    tooltips: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    chartBackgroundColor () {
      if (this.backgroundColor === 'transparent' || this.backgroundColor.includes('rgba')) {
        return this.backgroundColor
      } else {
        return Chart.helpers.color(this.backgroundColor).alpha(0.15).rgbString()
      }
    },
    max () {
      const highest = this.data.reduce((previousValue, currentValue) => {
        if (previousValue < currentValue) previousValue = currentValue
        return parseFloat(previousValue)
      })

      return highest * 1.05 // So we create some space on top of the chart for our top tooltip
    },
    chartData () {
      return {
        labels: this.labels,
        type: 'line',
        datasets: [
          {
            // type: 'line',
            label: null,
            data: this.data,
            backgroundColor: this.chartBackgroundColor,
            borderColor: this.borderColor,
            borderWidth: this.borderWidth,
            pointBorderWidth: 2,
            pointBackgroundColor: '#fff',
            pointBorderColor: this.borderColor,
            pointHoverBackgroundColor: '#fff',
            pointHoverRadius: 7
          }
        ]
      }
    },
    options () {
      return {
        height: this.height,
        legend: {
          display: false
        },
        tooltips: {
          // bottom tooltip
          position: 'custom',
          caretSize: 0,
          callbacks: {
            title: function (tooltipItem, data) {
              return data['labels'][tooltipItem[0]['index']]
            },
            label: function (tooltipItem, data) {
              return ''
            },
            afterLabel: function (tooltipItem, data) {
              // var dataset = data['datasets'][0]
              return ''
            }
          },
          // backgroundColor: '#2E63B1',
          backgroundColor: '#212529',
          titleFontSize: 14,
          titleFontColor: '#fff',
          bodyFontColor: '#fff',
          titleMarginBottom: 3,
          displayColors: false,
          xPadding: 15,
          yPadding: 12,
          mode: 'x-axis',
          intersect: true
        },
        hover: {
          mode: 'x-axis',
          intersect: true,
          animationDuration: 0
        },
        // tooltips: {
        //   enabled: this.tooltips,
        //   backgroundColor: '#2E63B1',
        //   xPadding: 12,
        //   yPadding: 8,
        //   displayColors: false,
        //   mode: 'x-axis'
        // },
        elements: {
          point: {
            radius: 0,
            hitRadius: 5,
            hoverRadius: 5
          }
        },
        animation: 0,
        scales: {
          xAxes: [{
            display: false,
            // ticks: {
            //   callback: function (dataLabel, index) {
            //     // Hide the label of every 2nd dataset. return null to hide the grid line too
            //     return index % 2 === 0 ? dataLabel : ''
            //   }
            // },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            ticks: {
              max: this.max,
              // min: 0,
              beginAtZero: false
            }
          }]
        }
      }
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options)
  }
}
