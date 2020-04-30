<template>
  <div id="options">
    <b-row class="d-flex justify-content-center">
      <!-- Toggle Tools -->
      <b-col cols="12" md="6">
        <h2 class="mt-4 mb-3">Map Options</h2>
        <b-list-group>
          <!-- Tracking -->
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            @click="toggleOptions('tracking')"
          >
            Enable tracking
            <font-awesome-icon
              icon="toggle-on"
              size="lg"
              v-if="mapOptions.tracking"
            />
            <font-awesome-icon icon="toggle-off" size="lg" v-else />
          </b-list-group-item>
          <!-- Footprint -->
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            @click="toggleOptions('footprint')"
          >
            Show Visible Footprint
            <font-awesome-icon
              icon="toggle-on"
              size="lg"
              v-if="mapOptions.footprint"
            />
            <font-awesome-icon icon="toggle-off" size="lg" v-else />
          </b-list-group-item>
          <!-- Path -->
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            @click="toggleOptions('path')"
          >
            Show Orbital Path
            <font-awesome-icon
              icon="toggle-on"
              size="lg"
              v-if="mapOptions.path"
            />
            <font-awesome-icon icon="toggle-off" size="lg" v-else />
          </b-list-group-item>
          <!-- Night shadow -->
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            @click="toggleOptions('shadow')"
          >
            Show Night Shadow
            <font-awesome-icon
              icon="toggle-on"
              size="lg"
              v-if="mapOptions.shadow"
            />
            <font-awesome-icon icon="toggle-off" size="lg" v-else />
          </b-list-group-item>
          <!-- Launch Sites -->
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            @click="toggleOptions('launchSites')"
          >
            Show Launch Sites
            <font-awesome-icon
              icon="toggle-on"
              size="lg"
              v-if="mapOptions.launchSites"
            />
            <font-awesome-icon icon="toggle-off" size="lg" v-else />
          </b-list-group-item>
          <!-- User location -->
          <b-list-group-item
            v-if="userLocation"
            class="d-flex justify-content-between align-items-center"
            @click="toggleOptions('location')"
          >
            Show my location
            <font-awesome-icon icon="toggle-on" size="lg" v-if="userMarker" />
            <font-awesome-icon icon="toggle-off" size="lg" v-else />
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <!-- Toggle units -->
      <b-col cols="12" md="6">
        <h2 class="mt-4 mb-3">Toggle Units</h2>
        <b-list-group>
          <b-list-group-item class="text-left">
            <b-form-group>
              <b-form-radio-group
                id="units-toggle"
                v-model="units"
                name="units-toggle"
              >
                <b-form-radio name="toggle-units" value="imperial"
                  >Imperial</b-form-radio
                >
                <b-form-radio name="toggle-units" value="metric"
                  >Metric</b-form-radio
                >
              </b-form-radio-group>
            </b-form-group>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <!-- Basemap -->
    <h2 class="mt-4 mb-3">Select Basemap</h2>
    <b-row class="d-flex justify-content-center">
      <!-- Default -->
      <b-col
        class="text-center pt-4 pt-md-0"
        cols="12"
        md="3"
        @click="toggleBasemap('default')"
      >
        <b-img
          :src="
            `${this.config.VUE_APP_SPACES_URL}/images/basemaps/default.webp`
          "
          fluid
          thumbnail
          rounded="circle"
          alt="Default basemap"
          :class="
            this.basemap['default'] ? 'basemap active-basemap' : 'basemap'
          "
        >
        </b-img>
        <div class="small pt-2">Default</div>
      </b-col>
      <!-- Labeled Satellite -->
      <!-- Satellite -->
      <b-col
        class="text-center pt-4 pt-md-0"
        cols="12"
        md="3"
        @click="toggleBasemap('satellite')"
      >
        <b-img
          :src="
            `${
              this.config.VUE_APP_SPACES_URL
            }/images/basemaps/satellite-imagery.webp`
          "
          fluid
          thumbnail
          rounded="circle"
          alt="Default basemap"
          :class="
            this.basemap['satellite'] ? 'basemap active-basemap' : 'basemap'
          "
        >
        </b-img>
        <div class="small pt-2">Satellite Imagery</div>
      </b-col>
      <!-- Night -->
      <b-col
        class="text-center pt-4 pt-md-0"
        cols="12"
        md="3"
        @click="toggleBasemap('night')"
      >
        <b-img
          :src="`${this.config.VUE_APP_SPACES_URL}/images/basemaps/night.webp`"
          fluid
          thumbnail
          rounded="circle"
          alt="Default basemap"
          :class="this.basemap['night'] ? 'basemap active-basemap' : 'basemap'"
        >
        </b-img>
        <div class="small pt-2">Night Lights</div>
      </b-col>
      <!-- Nat Geo -->
      <b-col
        class="text-center pt-4 pt-md-0"
        cols="12"
        md="3"
        @click="toggleBasemap('national_geographic')"
      >
        <b-img
          :src="
            `${
              this.config.VUE_APP_SPACES_URL
            }/images/basemaps/national-geographic.webp`
          "
          fluid
          thumbnail
          rounded="circle"
          alt="Default basemap"
          :class="
            this.basemap['national_geographic']
              ? 'basemap active-basemap'
              : 'basemap'
          "
        >
        </b-img>
        <div class="small pt-2">National Geographic</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import L from "leaflet";
import SatelliteMixin from "@/mixins/satellite.mixin";
import MapService from "@/services/map.service";
export default {
  name: "Options",
  mixins: [SatelliteMixin],
  data() {
    return {
      config: process.env
    };
  },
  computed: {
    units: {
      get() {
        return this.$store.getters["user/getUnits"];
      },
      set(val) {
        this.$store.commit("user/setUnits", val);
      }
    },
    basemap: {
      get() {
        return this.$store.getters["map/getBasemap"];
      },
      set(val) {
        return this.$store.commit("map/setBasemap", val);
      }
    }
  },
  methods: {
    toggleOptions(name) {
      this.mapOptions[name] = !this.mapOptions[name];
      switch (name) {
        case "footprint":
          this.toggleViewFootprint();
          break;
        case "path":
          this.toggleOrbitalPath();
          break;
        case "shadow":
          this.toggleShadows();
          break;
        case "launchSites":
          this.toggleLaunchSites();
          break;
        case "location":
          this.toggleLocation();
          break;
        default:
          break;
      }
    },
    toggleBasemap(selected) {
      // Remove unselected layers
      for (const property in this.basemap) {
        if (this.basemap.hasOwnProperty(property) && property !== selected) {
          this.basemap[property] = false;
          this.map.eachLayer(layer => {
            if (layer instanceof L.TileLayer) {
              layer.removeFrom(this.map);
            }
          });
        }
      }
      // Add selected layer
      this.basemap[selected] = true;
      MapService.getBasemapUrl(selected).addTo(this.map);
    }
  }
};
</script>

<style lang="scss"></style>
