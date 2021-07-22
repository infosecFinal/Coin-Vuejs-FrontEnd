<template>
  <b-container>
    <b-row align-h="start">
      <b-col>
        <div>
          <b-button-group vertical>
            <b-button variant="layout-warning" to="/home">BTC</b-button>
            <b-button variant="dark" to="/home">ETH</b-button>
            <b-button variant="layout-light" to="/home">XRP</b-button>
            <b-button variant="dark" to="/home">ETC</b-button>
            <b-button variant="layout-light" to="/home">DOGE</b-button>
          </b-button-group>
        </div>
      </b-col>

      <b-col fluid="md">
        <h1>Demo Coin-chart</h1>
        <div class="columns">
          <div class="column">
            <div class="chart-box">
              <div id="chart">
                <apexchart
                  type="candlestick"
                  height="700"
                  width="700px"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col fluid="sm">
        <div class="carousel">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="9"
            img-height="16"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- Text slides with image -->
            <b-carousel-slide
              caption="JOIN COINNET"
              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
              img-src="https://i.ibb.co/db00z1J/test.jpg">
              <p>
                We can provide you qurilty information about Crypto Money.
                Join our website and take this beautiful Services.
                We Want You!
              </p>
            </b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide
              img-src="https://i.ibb.co/hgtGPjX/ezgif-com-gif-maker.gif">
              <h1>Hello DOGE!
                Let's go to the Moon
              </h1>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import axios from 'axios';

export default {
  name: "VueChartJS",
  components: {
    ApexCharts: VueApexCharts,
  },
  data: function() {
    return {
      series: [
        {
          data: [
          ],
        },
      ],
      chartOptions: {
        chart: {
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "BTC/KRW Chart",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const resp = await axios.get("http://localhost:8084/home/chart");
      const timestamps = resp.data.list.map(function(value){
        var ret = {
        x: new Date(value.timestamp),
        y: [value.open, value.high, value.low, value.close] 
        };
        return ret;
      });
      this.series[0].data = timestamps;
      console.log(this.series[0].data);
    }
  }
};
</script>
<style scoped>
.carousel {
  margin-left: 15px;
  max-height: 700px;
  max-width: 300px;
}
</style>
