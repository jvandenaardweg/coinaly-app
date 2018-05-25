import Chart from 'chart.js'
import { generateChart } from 'vue-chartjs'

Chart.defaults.LineWithLine = Chart.defaults.line
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function (ease) {
    Chart.controllers.line.prototype.draw.call(this, ease)

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
      ctx.strokeStyle = '#07C'
      ctx.stroke()
      ctx.restore()
    }
  }
})

const CustomLine = generateChart('custom-line', 'LineWithLine')

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
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          type: 'line',
          label: null,
          data: this.data,
          backgroundColor: this.chartBackgroundColor,
          borderColor: this.borderColor,
          borderWidth: this.borderWidth
        }
      ]
    },
    {
      height: this.height,
      legend: {
        display: false
      },
      tooltips: {
        enabled: this.tooltips,
        backgroundColor: '#2E63B1',
        xPadding: 12,
        yPadding: 8,
        displayColors: false,
        mode: 'x-axis'
      },
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
          //     return index % 4 === 0 ? dataLabel : ''
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
          }
        }]
      }
    })
  }
}
