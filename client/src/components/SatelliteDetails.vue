<template>
  <div>
    <b-row class="pb-4">
      <!-- Stats -->
      <b-col cols="12" lg="6">
        <b-list-group class="d-flex justify-content-between text-uppercase">
          <b-list-group-item class="d-flex justify-content-between"
            >NORAD ID:
            <span class="float-right">{{
              selectedSatelliteDetails.number
            }}</span></b-list-group-item
          >
          <b-list-group-item
            >International ID:
            <span class="float-right">{{
              selectedSatelliteDetails.intldes
            }}</span></b-list-group-item
          >
          <b-list-group-item
            >Country:
            <span class="float-right">{{
              selectedSatelliteDetails.country
            }}</span></b-list-group-item
          >
          <b-list-group-item
            >Launch Date:
            <span class="float-right">{{
              formatLaunchDate(selectedSatelliteDetails.launch_date)
            }}</span></b-list-group-item
          >
        </b-list-group>
      </b-col>
      <b-col cols="12" lg="6" class="pt-3 pt-lg-0">
        <b-img-lazy
          ref="detailsImage"
          :src="
            satelliteImage(
              selectedSatelliteDetails.number,
              selectedSatelliteDetails.name
            )
          "
          fluid
          :alt="`${selectedSatelliteDetails.name} image`"
        >
        </b-img-lazy>
      </b-col>
    </b-row>
    <p>{{ selectedSatelliteDetails.description }}</p>
  </div>
</template>

<script>
import ImageMixin from "@/mixins/image.mixin";
import UtilsMixin from "@/mixins/utils.mixin";
export default {
  name: "Satellite-Details",
  mixins: [ImageMixin, UtilsMixin],
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
  mounted() {
    this.$refs.detailsImage.$el.onerror = this.showDefault;
  }
};
</script>

<style lang="scss"></style>
