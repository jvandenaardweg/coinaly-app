import Chart from 'chart.js'
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
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
          type: 'doughnut',
          label: null,
          data: this.data,
          backgroundColor: ['red', 'green', 'yellow', 'orange', 'blue', 'purple', 'gray', 'darkgray', 'black', 'brown'],
          borderColor: this.borderColor,
          borderWidth: this.borderWidth
        }
      ]
    },
    {
      height: this.height,
      legend: {
        display: true,
        position: 'bottom'
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
      animation: {
        animateScale: false,
        animateRotate: true
      },
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
