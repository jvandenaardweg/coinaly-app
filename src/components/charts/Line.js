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
  props: ['labels', 'data'],
  mounted () {
    // const data = [ 10326.76, 10920, 11039, 11464.48, 11515, 11454, 10716.48, 9910, 9271.64, 9227, 8770.22, 9533.57, 9131.34, 9150, 8170, 8240.98, 8260, 7824.8, 8189.99, 8600, 8909.98, 8885, 8722.9, 8898.03, 8546.86, 8470.15, 8134.23, 7795.51, 7949.3, 7090.14, 6840.23, 6923.91, 6813.01, 7056, 7405.21, 6796.1, 6770.76, 6601.39, 6895.8, 7018, 6782.72, 6843.9, 6953.79, 7923, 7877.41, 7999.01, 8355, 8064.92, 7885.02, 8173, 8278, 8856.98, 8915.31, 8787.02, 8934.01, 9619.99, 8869.99, 9266, 8915.35, 9348, 9419, 9246.01, 9071.48, 9247.84, 9750, 9713.99, 9864, 9659.01, 9365, 9187.56, 9310, 9002.2, 8400, 8465.94, 8679.71, 8663.34, 8462, 8330, 8041.46, 7984.94 ]
    // Overwriting base render method with actual data.
    // console.log(this.labels, this.data)
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          type: 'line',
          label: null,
          // backgroundColor: '#2E63B1',
          data: this.data,
          backgroundColor: Chart.helpers.color('#2E63B1').alpha(0.15).rgbString(),
          borderColor: '#2E63B1',
          borderWidth: 1
        }
      ]
    }, {
      height: 200,
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
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
