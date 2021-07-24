<template>
  <b-container>
    <b-row align-h="start">
      <b-col>
        <div>
          <b-button-group vertical>
            <b-button @click="[method1()]" variant="layout-warning">BTC</b-button>
            <b-button @click="[method2()]" variant="dark">ETH</b-button>
            <!-- <b-button variant="layout-light" to="/home">XRP</b-button>
            <b-button variant="dark" to="/home">ETC</b-button>
            <b-button variant="layout-light" to="/home">DOGE</b-button> -->
          </b-button-group>
        </div>
      </b-col>

      <b-col fluid="md">
        <h1>Demo Coin-chart</h1>
        <div class="columns">
          <div class="column">
            <div class="chart-box">
              <div id="chart_btc" v-if="state_btc==1">
                <apexchart
                  type="candlestick"
                  height="700px"
                  width="700px"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
              <div id="chart_eth" v-if="state_eth==1">
                <apexchart
                  type="candlestick"
                  height="700"
                  width="700px"
                  :options="chartOptions_eth"
                  :series="series_eth"
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
              img-src="https://i.ibb.co/db00z1J/test.jpg"
            >
              <p>
                We can provide you qurilty information about Crypto Money. Join
                our website and take this beautiful Services. We Want You!
              </p>
            </b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide
              img-src="https://i.ibb.co/hgtGPjX/ezgif-com-gif-maker.gif"
            >
              <h1>Hello DOGE! Let's go to the Moon</h1>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import axios from "axios";

export default {
  name: "VueChartJS",
  components: {
    ApexCharts: VueApexCharts,
  },
  data: function() {
    return {
      state_btc : 1,
      state_eth : 0,
      series: [
        {
          data: [],
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
      series_eth: [
        {
          data: [],
        },
      ],
      chartOptions_eth: {
        chart: {
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "ETH/KRW Chart",
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
    this.getData_eth();
  },
  methods: {
    method1(){
      this.state_btc=1,
      this.state_eth=0
    },
    method2(){
      this.state_btc=0,
      this.state_eth=1
    },
    async getData() {
      const resp = await axios.get("http://localhost:8084/home/chart");
      const timestamps = resp.data.list.map(function(value) {
        var ret = {
          x: new Date(value.timestamp),
          y: [value.open, value.high, value.low, value.close],
        };
        return ret;
      });
      this.series[0].data = timestamps;
      // console.log(this.series[0].data);
    },
    async getData_eth() {
      const resp_eth = await axios.get("http://localhost:8084/home/chart_eth");
      const timestamps_eth = resp_eth.data.list.map(function(value_eth) {
        var ret_eth = {
          x: new Date(value_eth.timestamp),
          y: [value_eth.open, value_eth.high, value_eth.low, value_eth.close],
        };
        return ret_eth;
      });
      this.series_eth[0].data = timestamps_eth;
    },
  },
};
</script>

<style scoped>
.carousel {
  margin-left: 15px;
  max-height: 700px;
  max-width: 300px;
}
</style>
