<template>
  <div>
    <b-list-group class="pt-3">
      <b-list-group-item v-for="satellite in satellites" :key="satellite">
        <b-button
          variant="danger"
          size="sm"
          v-b-modal.content-modal
          v-if="satellite === selectedSatelliteDetails.name"
        >
          Live {{ configureButtonText() }}
        </b-button>
      </b-list-group-item>
    </b-list-group>
    <b-modal
      id="content-modal"
      :title-sr-only="true"
      :hide-header="true"
      :hide-footer="true"
      :centered="true"
    >
      <iframe
        src="https://www.ustream.tv/embed/9408562?html5ui&amp;v=3&amp;wmode=direct&amp;autoplay=true"
        allowfullscreen=""
        webkitallowfullscreen=""
        scrolling="no"
        style="border: 0px none transparent;"
        width="100%"
        height="455"
        frameborder="0"
        v-if="selectedSatelliteDetails.name === 'ISS (ZARYA)'"
      />
      <img
        src="https://cdn.star.nesdis.noaa.gov/GOES17/ABI/FD/GEOCOLOR/678x678.jpg"
        alt="GOES 17 Image"
        class="img-fluid"
        v-if="selectedSatelliteDetails.name === 'GOES 17'"
      />
      <img
        src="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/20192722210_GOES16-ABI-FD-GEOCOLOR-678x678.jpg"
        alt="GOES 16 Image"
        class="img-fluid"
        v-if="selectedSatelliteDetails.name === 'GOES 16 [+]'"
      />
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Satellite-Card-Extra",
  props: {
    satellites: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    }
  },
  methods: {
    configureButtonText() {
      switch (this.selectedSatelliteDetails.name) {
        case "ISS (ZARYA)":
          return "video";
        case "GOES 17":
        case "GOES 16 [+]":
          return "image";
        default:
          return "image";
      }
    }
  }
};
</script>

<style lang="scss"></style>
