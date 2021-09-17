<template>
  <div>
    <div class="vx-row">
     <div class="vx-col w-1/2">

      <vs-input
        class="w-full inputx"
        type="file"
        accept=".json"
        ref="jsonFile"
        id="jsonFile"
        @change="fileUpload"
      />
    </div>
     <div class="vx-col w-1/2">
      <vx-input-group class="mb-base">
      <vs-input type="text" v-model="url" placeholder="JSON URL"  class="w-full" />
      <template slot="append">
        <div class="append-text btn-addon">
          <!-- https://api.jsonbin.io/b/614473ad9548541c29b3b720 -->
          <vs-button @click="fetchRemoteData" :disabled="loading" color="primary">
            <span v-if="!loading">Fetch</span>
            <span v-else>Fetching...</span>
          </vs-button>
        </div>
      </template>
    </vx-input-group>
    </div>
    </div>
    <div class="vx-row justify-center">
      <div class="vx-col hidden lg:block lg:w-full">
        <div class="vx-row">
          <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="InfoIcon"
              :statistic="mean"
              statisticTitle="Mean"
            />
          </div>
          <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="InfoIcon"
              :statistic="median"
              statisticTitle="Median"
            />
          </div>
          <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="InfoIcon"
              :statistic="standardDeviation"
              statisticTitle="Standard Deviation"
            />
          </div>
          <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="InfoIcon"
              :statistic="mode"
              statisticTitle="Mode"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import {mean,median,mode,standardDeviation} from '@/utils';
export default {
  name: "Dashboard",
  components: {
    StatisticsCardLine,
    // VueApexCharts
  },
  data() {
    return {
      mean:0,
      median:0,
      mode:0,
      standardDeviation:0,
      loading:false,
      url:"",
    };
  },
  computed: {

  },
  methods: {
    computeStats(payload){
      this.mean=mean(payload);
      this.median=median(payload),
      this.mode=mode(payload)
      this.standardDeviation = standardDeviation(payload);
    },
    async fetchRemoteData(){
      if(this.url.length){
      this.loading=true;
      await fetch(this.url)
          .then((response) => response.json())
          .then((data) => {
            this.computeStats(data);
          })
          .catch((err) => {
            alert(err.message);
          });
        this.loading = false;
      } else {
        alert("input URL to json data");
      }
    },
    fileUpload() {
      let files = document.getElementById('jsonFile').files;
      if(files.length>0){
        let file = files[0];
        let fr = new FileReader();
        fr.readAsText(file);
        fr.onload=(e)=>{
             const result=JSON.parse(e.target.result);
            this.computeStats(result);
         }
        }
      }
  }
};
</script>
