import Chart from 'chart.js'
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
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
      const total = this.data.reduce((previousValue, currentValue) => {
        // if (previousValue < currentValue) previousValue = currentValue
        return parseFloat(previousValue) + parseFloat(currentValue)
      })

      console.log(total)

      return parseFloat((total / this.data.length) * 5)
    }
  },
  mounted () {
    console.log(this.max)
    // Overwriting base render method with actual data.
    this.renderChart({
      type: 'bar',
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: this.borderColor,
          borderWidth: 0,
          label: 'Volume',
          yAxisID: 'Volume',
          borderSkipped: 'bottom'
        }
      ]
    },
    {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      tooltips: {
        enabled: this.tooltips,
        backgroundColor: '#2E63B1',
        xPadding: 12,
        yPadding: 8,
        displayColors: false,
        // mode: 'nearest',
        position: 'nearest',
        mode: 'index',
        intersect: false
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 5,
          hoverRadius: 5
        }
      },
      // animation: 0,
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              display: false,
              offsetGridLines: true
            }
          }
        ],
        yAxes: [
          {
            id: 'Volume',
            position: 'left',
            display: false,
            gridLines: {
              display: false
            },
            // ticks: {
            //   max: this.max,
            //   min: 0,
            //   beginAtZero: true,
            //   stepSize: (this.max / 20)
            // }
          }
        ]
      }
    })
  }
}
