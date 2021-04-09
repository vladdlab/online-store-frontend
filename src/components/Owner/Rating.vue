<template>
  <div class="datapicker">
    <label for="startDate">От:</label>
    <input
      id="startDate"
      type="date"
      v-model="startDate"
      @change="updateRating"
    />

    <label for="endDate">До:</label>
    <input id="endDate" type="date" v-model="endDate" @change="updateRating" />
  </div>
  <canvas class="chart" id="chart"></canvas>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Chart from 'chart.js'

let date = new Date()
let formatter = new Intl.DateTimeFormat('ru', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
})
let startDate = formatter
  .format(new Date(date.getFullYear(), date.getMonth(), 1))
  .split('.')
  .reverse()
  .join('-')
let endDate = formatter
  .format(new Date(date.getFullYear(), date.getMonth() + 1, 0))
  .split('.')
  .reverse()
  .join('-')

export default {
  name: 'Rating',
  components: {},
  data() {
    return {
      startDate: startDate,
      endDate: endDate,
      chart: null
    }
  },
  async mounted() {
    await this.getRating({ startDate, endDate })
    var ctx = document.getElementById('chart')
    const profits = this.rating.map(rate => rate.totalAmount)
    const dates = this.rating.map(rate => rate.good.name)
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Продано',
            data: profits,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      rating: 'stuff/rating'
    })
  },
  methods: {
    ...mapActions({
      getRating: 'stuff/getRating',
      getAGood: 'stuff/getAGood'
    }),
    async updateRating() {
      await this.getRating({
        startDate: this.startDate,
        endDate: this.endDate
      })
      const profits = this.rating.map(rate => rate.good_amount)
      const dates = this.rating.map(rate => rate.createdAt.slice(0, 10))
      this.updateChart(dates, profits)
    },
    updateChart(labels, dataset) {
      this.chart.data.labels = labels
      this.chart.data.datasets[0].data = dataset
      this.chart.update()
    }
  }
}
</script>

<style scoped lang="scss">
.datapicker {
  display: flex;
  align-items: flex-start;

  input {
    margin: 0 1em;
  }
}

.rating {
  width: 100%;
  height: 76.5vh;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.chart {
  width: 50%;
  height: 200px;
}
</style>
