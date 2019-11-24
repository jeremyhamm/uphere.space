import L from "leaflet";
export default {
  /**
   * Add scale controls to map
   *
   * @param {String}
   * @return {Object}
   */
  setScaleControls(units) {
    return L.control.scale({
      position: "bottomleft",
      metric: units === "metric" ? true : false,
      imperial: units === "imperial" ? true : false
    });
  },
  /**
   * Add geolocation controls to map
   *
   * @param {Boolean}
   * @param {Boolean}
   */
  //setGeolocationControls(track, location) {},
  /**
   * Set zoom controlls
   *
   * @return {Object}
   */
  setZoomContols() {
    return L.control.zoom();
  },
  /**
   * Set attribution controlls
   *
   * @return {Object}
   */
  setAttributionControls() {
    return L.control.attribution();
  },
  /**
   * Toggle basemap
   */
  getBasemapUrl(mode) {
    switch(mode) {
      case "night":
        return L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
          minZoom: 1,
          maxZoom: 8,
          format: 'jpg',
          time: '',
          tilematrixset: 'GoogleMapsCompatible_Level'
        });
      default:
        return L.tileLayer(
          "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
          {
            id: "mapbox.streets",
            accessToken: process.env.VUE_APP_MAPBOX_KEY
          }
        );
    }
  }
};
