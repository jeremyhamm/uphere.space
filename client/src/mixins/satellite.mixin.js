import L from "leaflet";
import "@/utils/Leaflet.greatCircle";
import "@/utils/Leaflet.Geodesic";
import ShadowService from "@/services/shadow.service";
import MapService from "@/services/map.service";
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
    selectedSatelliteNumber() {
      return this.$store.getters["satellite/getSelectedSatelliteNumber"];
    },
    selectedSatelliteLocation() {
      return this.$store.getters["satellite/getSelectedSatelliteLocation"];
    },
    selectedSatelliteDetails() {
      return this.$store.getters["satellite/getSelectedSatelliteDetails"];
    }
  },
  methods: {
    /**
     * Get current satellite location
     */
    loadLocationData() {
      this.$store
        .dispatch("satellite/satelliteLocation", {
          number: this.selectedSatelliteNumber,
          period: this.selectedSatelliteDetails.orbital_period
        })
        .then(() => {
          this.setSatelliteSource();
          if (this.mapOptions.tracking) {
            this.setMapTracking();
          }
          if (this.mapOptions.footprint) {
            this.footprint.remove();
            this.toggleViewFootprint();
          }
        });
    },
    /**
     * Follow satellite toggle
     */
    setMapTracking() {
      const coords = this.selectedSatelliteLocation.coordinates;
      this.map.setView([coords[1], coords[0]]);
    },
    /**
     * Add satellite layer to map
     */
    setSatelliteSource() {
      this.realTimeData.remove();
      this.addSatelliteData();
    },
    determineIconSize(icon) {
      switch (icon) {
        case "AQUA":
          return [60, 30];
        case "DRAGON CRS-19":
          return [50, 40];
        case "GOES 17":
          return [60, 40];
        case "HST":
        case "ISS (ZARYA)":
        case "SWIFT":
          return [60, 60];
        case "TERRA":
          return [40, 60];
        default:
          return [40, 40];
      }
    },
    determineIconImage(icon) {
      switch (icon) {
        case "AQUA":
          return "aqua.svg";
        case "DRAGON CRS-20":
          return "spacex_dragon.svg";
        case "GOES 17":
          return "goes.svg";
        case "HST":
          return "hubble.svg";
        case "ISS (ZARYA)":
          return "iss.svg";
        case "SWIFT":
          return "swift.svg";
        case "TERRA":
          return "terra.svg";
        default:
          return this.selectSatelliteIcon(this.selectedSatelliteDetails.type);
      }
    },
    /**
     * Add satellite icon to map
     */
    addSatelliteData() {
      const iconSize = this.determineIconSize(
        this.selectedSatelliteDetails.name
      );
      const iconName = this.determineIconImage(
        this.selectedSatelliteDetails.name
      );
      const smallIcon = new L.Icon({
        iconSize: iconSize,
        iconUrl: `${this.config.VUE_APP_SPACES_URL}/images/icons/${iconName}`
      });
      const coords = this.selectedSatelliteLocation.coordinates;
      this.realTimeData = L.marker([coords[1], coords[0]], {
        icon: smallIcon
      }).addTo(this.map);
      this.realTimeData.on("click", () => {
        this.satelliteClickHandler();
      });
    },
    /**
     * Select icon by satellite type
     *
     * @param {String} satellite type
     */
    selectSatelliteIcon(type) {
      switch (type) {
        case "ROCKET BODY":
        case "DEBRIS":
          return "rocket.svg";
        default:
          return "default.svg";
      }
    },
    /**
     * Add launch site markers
     *
     * @param {Object}
     * @return {Void}
     */
    addLaunchSites() {
      const launchSiteIcon = new L.Icon({
        iconSize: [40, 40],
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
      const track = this.selectedSatelliteLocation.track;
      const orbitalPath = [];
      track.forEach(val => {
        const latlng = new L.LatLng(val.lat, val.lng);
        orbitalPath.push(latlng);
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
    toggleLocation() {
      if (!this.userMarker) {
        this.userMarker = MapService.toggleUserLocation(
          this.userIcon,
          this.userLocation
        ).addTo(this.map);
        this.userMarker
          .bindPopup(
            `
            <p class="text-center">${this.userLocation.city}, ${
              this.userLocation.region_code
            }</p>
            <p class="text-center"><img src="${
              this.userLocation.flag
            }" alt="country_flag" /></p>
          `
          )
          .openPopup();
        this.map.setView([
          this.userLocation.latitude,
          this.userLocation.longitude
        ]);
      } else {
        this.userMarker.remove();
        this.userMarker = null;
      }
    },
    /**
     * Toggle satellite visibility alert
     */
    showVisibilityAlert() {
      if (
        this.selectedSatelliteLocation.visibility &&
        this.selectedSatelliteLocation.visibility.elevation > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Show satellite card on xs
     */
    satelliteClickHandler() {
      this.$store.commit("satellite/setCardVisibility", true);
    },
    /**
     * Update location every 1 seconds
     */
    runInterval() {
      this.interval = setInterval(() => {
        this.loadLocationData();
      }, this.config.VUE_APP_REFRESH);
    }
  }
};

export default satelliteMixin;
