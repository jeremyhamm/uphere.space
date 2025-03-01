import L from "leaflet";
import "@/utils/Leaflet.greatCircle";
import "@/utils/Leaflet.Geodesic";
import MapService from "@/services/map.service";
import ShadowService from "@/services/shadow.service";
const satelliteMixin = {
  data() {
    return {
      config: process.env,
      realTimeData: null
    };
  },
  computed: {
    map: {
      get() {
        return this.$store.getters["map/getMap"];
      },
      set(val) {
        this.$store.commit("map/setMap", val);
      }
    },
    mapOptions: {
      get() {
        return this.$store.getters["map/getAllOptions"];
      },
      set({ name, value }) {
        this.options[name] = value;
      }
    },
    footprint: {
      get() {
        return this.$store.getters["map/getFootprint"];
      },
      set(val) {
        this.$store.commit("map/setFootprint", val);
      }
    },
    path: {
      get() {
        return this.$store.getters["map/getPath"];
      },
      set(val) {
        this.$store.commit("map/setPath", val);
      }
    },
    shadows: {
      get() {
        return this.$store.getters["map/getShadows"];
      },
      set({ name, value }) {
        this.shadows[name] = value;
      }
    },
    launchSites() {
      return this.$store.getters["map/getLaunchSites"];
    },
    userMarker: {
      get() {
        return this.$store.getters["user/getMarker"];
      },
      set(val) {
        return this.$store.commit("user/setMarker", val);
      }
    },
    userIcon() {
      return this.$store.getters["user/getIcon"];
    },
    userLocation() {
      return this.$store.getters["user/getLocation"];
    },
    interval: {
      get() {
        return this.$store.getters["satellite/getInterval"];
      },
      set(val) {
        this.$store.commit("satellite/setInterval", val);
      }
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    },
    selectedSatelliteOrbit() {
      return this.$store.getters["satellite/getSelectedSatelliteOrbit"];
    },
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    }
  },
  methods: {
    /**
     * Add launch site markers
     *
     * @param {Object}
     * @return {Void}
     */
    addLaunchSites() {
      const launchSiteIcon = new L.Icon({
        iconSize: [35, 35],
        iconUrl: `${
          this.config.VUE_APP_SPACES_URL
        }/images/icons/launch-sites.svg`
      });
      this.launchSites.forEach(site => {
        site.marker = L.marker([site.latitude, site.longitude], {
          icon: launchSiteIcon
        }).addTo(this.map);
        site.marker.bindPopup(`
          <p class="text-center">${site.abbreviation}</p>
          <p class="text-center">${site.name}</p>
        `);
      });
    },
    /**
     * Toggle visibility of launch sites
     */
    toggleLaunchSites() {
      if (this.mapOptions["launchSites"]) {
        this.addLaunchSites();
      } else {
        this.launchSites.forEach(key => {
          key.marker.remove();
        });
      }
    },
    /**
     * Add circle(s) representing phases of night
     *
     * @param {Object}
     * @return {Object}
     */
    addShadowCircle(phase) {
      return L.greatCircle([phase.coords.lat, phase.coords.lng], {
        radius: phase.radius,
        stroke: false,
        fillColor: "#000000",
        fillOpacity: 0.1
      });
    },
    /**
     * Add all shadow layers
     */
    addAllShadows() {
      // Civil Twilight
      const civilTwilight = ShadowService.calculateShadowLocation(0.566666);
      this.shadows.civilTwilight = this.addShadowCircle(civilTwilight);
      this.shadows.civilTwilight.addTo(this.map);
      // Nautical Twilight
      const nauticalTwilight = ShadowService.calculateShadowLocation(6);
      this.shadows.nauticalTwilight = this.addShadowCircle(nauticalTwilight);
      this.shadows.nauticalTwilight.addTo(this.map);
      // Astronomical Twilight
      const astronomicalTwilight = ShadowService.calculateShadowLocation(12);
      this.shadows.astronomicalTwilight = this.addShadowCircle(
        astronomicalTwilight
      );
      this.shadows.astronomicalTwilight.addTo(this.map);
      // Night
      const night = ShadowService.calculateShadowLocation(18);
      this.shadows.night = this.addShadowCircle(night);
      this.shadows.night.addTo(this.map);
    },
    /**
     * Toggle visibility of shadow layers
     */
    toggleShadows() {
      if (this.mapOptions["shadow"]) {
        this.addAllShadows();
      } else {
        Object.keys(this.shadows).forEach(key => {
          this.shadows[key].remove();
        });
      }
    },
    /**
     * Add satellite footprint
     */
    toggleViewFootprint() {
      if (this.mapOptions["footprint"]) {
        const coords = this.selectedSatelliteLocation.coordinates;
        this.footprint = L.greatCircle([coords[1], coords[0]], {
          radius: this.selectedSatelliteLocation.footprint_radius,
          stroke: false,
          fillColor: "#F2583E",
          fillOpacity: 0.25
        });
        this.footprint.addTo(this.map);
      } else {
        this.footprint.remove();
      }
    },
    /**
     * Format orbital path array
     */
    formatOrbitalPath() {
      const track = this.selectedSatelliteOrbit;
      const orbitalPath = [];
      track.forEach(val => {
        const latlng = new L.LatLng(val.lat, val.lng);
        orbitalPath.push(latlng);
        // Add orbital timestamps every 3rd
        // if (index % 3 === 0) {
        //   this.addOrbitalPathLabels(val);
        // }
      });
      return orbitalPath;
    },
    /**
     * Add orbital path
     */
    toggleOrbitalPath() {
      if (this.mapOptions["path"]) {
        this.path = L.geodesic([this.formatOrbitalPath()], {
          color: "yellow",
          weight: 4,
          opacity: 0.6,
          steps: 50
        }).addTo(this.map);
      } else {
        this.path.remove();
      }
    },
    /**
     * Add markers and labels for orbital path time frame
     */
    // addOrbitalPathLabels(location) {
    //   const myIcon = L.divIcon({
    //     iconSize: [37, 15],
    //     className: "orbital-path-label",
    //     html: `<p class="small">${location.date}</p>`
    //   });
    //   L.marker([location.lat, location.lng], { icon: myIcon })
    //     .addTo(this.map);
    // },
    /**
     * Toggle user location icon
     */
    toggleLocation() {
      if (!this.userMarker) {
        this.userMarker = MapService.getUserMarker(
          this.userIcon,
          this.userLocation
        ).addTo(this.map);
        this.userMarker
          .bindPopup(
            `
            <div>City: <span style="font-weight: bold">${
              this.userLocation.city
            }</span></div>
            <div>Region: <span style="font-weight: bold">${
              this.userLocation.region
            }</span></div>
            <div>Country: <span style="font-weight: bold">${
              this.userLocation.countryCode
            }</span></div>
            <div>Time Zone: <span style="font-weight: bold">${
              this.userLocation.timezone
            }</span></div>
          `
          )
          .openPopup();
        this.map.setView([this.userLocation.lat, this.userLocation.lon]);
      } else {
        this.userMarker.remove();
        this.userMarker = null;
      }
    }
  }
};

export default satelliteMixin;
