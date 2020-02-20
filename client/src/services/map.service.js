import L from "leaflet";

/**
 * Add scale controls to map
 *
 * @param  {String} units map units
 * @return {Object}
 */
const setScaleControls = units => {
  return L.control.scale({
    position: "bottomleft",
    metric: units === "metric" ? true : false,
    imperial: units === "imperial" ? true : false
  });
};

/**
 * Set zoom controlls
 *
 * @return {Object}
 */
const setZoomContols = () => {
  return L.control.zoom();
};

/**
 * Set attribution controlls
 *
 * @return {Object}
 */
const setAttributionControls = () => {
  return L.control.attribution();
};

/**
 * Toggle basemap
 *
 * @param  {String} mode basemap style
 * @return {Object}      basemap url
 */
const getBasemapUrl = mode => {
  switch (mode) {
    case "night":
      return L.tileLayer(
        "https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}",
        {
          minZoom: 1,
          maxZoom: 8,
          format: "jpg",
          time: "",
          tilematrixset: "GoogleMapsCompatible_Level"
        }
      );
    case "satellite":
      return L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 18
        }
      );
    case "national_geographic":
      return L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 16
        }
      );
    default:
      return L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          id: "mapbox.streets",
          accessToken: process.env.VUE_APP_MAPBOX_KEY
        }
      );
  }
};

/**
 * Toggle user location icon
 *
 * @param  {Number} lat latitude of user location
 * @param  {Number} lng longitude of user location
 * @return {Object}     leaflet marker
 */
const toggleUserLocation = (icon, location) => {
  const homeIcon = L.icon(icon);
  return L.marker([location.latitude, location.longitude], { icon: homeIcon });
};

export default {
  setScaleControls: setScaleControls,
  setZoomContols: setZoomContols,
  setAttributionControls: setAttributionControls,
  getBasemapUrl: getBasemapUrl,
  toggleUserLocation: toggleUserLocation
};
