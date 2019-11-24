const earthRadius = 6371008;
export default {
  /**
   * Get lng, lat for current position of the sun
   *
   * @return {Array}
   */
  sunPosition() {
    const date = new Date();
    return this.calculatePositionOfSun(date);
  },
  /**
   * Calulate the julian date
   *
   * @param {Date}
   * @return {Float}
   */
  jday(date) {
    return date.getTime() / 86400000.0 + 2440587.5;
  },
  /**
   * Calculate curent location of the sun
   *
   * @param {Date}
   * @return {Object}
   */
  calculatePositionOfSun(date) {
    date = date instanceof Date ? date : new Date();
    const rad = 0.017453292519943295;
    const ms_past_midnight =
      ((date.getUTCHours() * 60 + date.getUTCMinutes()) * 60 +
        date.getUTCSeconds()) *
        1000 +
      date.getUTCMilliseconds();
    const jc = (this.jday(date) - 2451545) / 36525;
    const mean_long_sun =
      (280.46646 + jc * (36000.76983 + jc * 0.0003032)) % 360;
    const mean_anom_sun = 357.52911 + jc * (35999.05029 - 0.0001537 * jc);
    const sun_eq =
      Math.sin(rad * mean_anom_sun) *
        (1.914602 - jc * (0.004817 + 0.000014 * jc)) +
      Math.sin(rad * 2 * mean_anom_sun) * (0.019993 - 0.000101 * jc) +
      Math.sin(rad * 3 * mean_anom_sun) * 0.000289;
    const sun_true_long = mean_long_sun + sun_eq;
    const sun_app_long =
      sun_true_long -
      0.00569 -
      0.00478 * Math.sin(rad * 125.04 - 1934.136 * jc);
    const mean_obliq_ecliptic =
      23 +
      (26 + (21.448 - jc * (46.815 + jc * (0.00059 - jc * 0.001813))) / 60) /
        60;
    const obliq_corr =
      mean_obliq_ecliptic + 0.00256 * Math.cos(rad * 125.04 - 1934.136 * jc);
    const eccent = 0.016708634 - jc * (0.000042037 + 0.0000001267 * jc);
    const y =
      Math.tan(rad * (obliq_corr / 2)) * Math.tan(rad * (obliq_corr / 2));
    const rq_of_time =
      4 *
      ((y * Math.sin(2 * rad * mean_long_sun) -
        2 * eccent * Math.sin(rad * mean_anom_sun) +
        4 *
          eccent *
          y *
          Math.sin(rad * mean_anom_sun) *
          Math.cos(2 * rad * mean_long_sun) -
        0.5 * y * y * Math.sin(4 * rad * mean_long_sun) -
        1.25 * eccent * eccent * Math.sin(2 * rad * mean_anom_sun)) /
        rad);
    const true_solar_time_in_deg =
      ((ms_past_midnight + rq_of_time * 60000) % 86400000) / 240000;

    const lng = -(true_solar_time_in_deg < 0
      ? true_solar_time_in_deg + 180
      : true_solar_time_in_deg - 180);
    const lat =
      Math.asin(Math.sin(rad * obliq_corr) * Math.sin(rad * sun_app_long)) /
      rad;

    return { lng: lng, lat: lat };
  },

  /**
   * Get current shadow position
   *
   * @return {Array}
   */
  getShadowPosition() {
    return this.sunPosition()
      ? { lat: -this.sunPosition().lat, lng: this.sunPosition().lng + 180 }
      : null;
  },

  /**
   * Calculate earth shadow radius
   *
   * @param {Number}
   * @return {Number}
   */
  getShadowRadiusFromAngle(angle) {
    const shadowRadius = earthRadius * Math.PI * 0.5;
    const twlightDist = ((earthRadius * 2 * Math.PI) / 360) * angle;
    return shadowRadius - twlightDist;
  },

  /**
   * Add shadow layer map layer
   *
   * @param {Number}
   * @return {Object}
   */
  calculateShadowLocation(angle) {
    const coords = this.getShadowPosition();
    const radius = this.getShadowRadiusFromAngle(angle);
    return { radius: radius, coords: coords };
  }
};
