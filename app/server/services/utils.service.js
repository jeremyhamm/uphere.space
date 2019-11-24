/**
 * Format satellite list data with categories
 * 
 * @param {Array} satellites satellite list with categories
 * @return {Array}
 */
exports.formatSatelliteCategory = (satellites) => {
  let responseData = [];
  satellites.forEach(sat => {
    if (responseData.some(e => e.number === sat.number)) {
      if (sat.category_name) {
        let selected = responseData.filter(item => {
          return item.number === sat.number;
        });
        selected[0].categories.push(sat.category_name);
      }
    } else {
      sat.selected = true;
      if (sat.category_name) {
        sat.categories = [sat.category_name];
      } else {
        sat.categories = [];
      }
      responseData.push(sat);
    }
  });

  // Remove unneeded field
  responseData.forEach(sat => {
    delete sat.category_name;
  })

  return responseData;
}

/**
 * Format order by based on sort input selected
 * 
 * @param   {String} val  sort value
 * @return  {String}      order by query
 */
exports.formatSortQuery = (val) => {
  switch (val) {
    case 'asc':
      return ` ORDER BY s.name ASC`;
    case 'desc':
      return ` ORDER BY s.name DESC`;;
    case 'launch':
      return ` ORDER BY s.launch_date DESC`;
    case 'popular':
      return ` ORDER BY views.count DESC`;
    default:
      return ` ORDER BY s.id ASC`;
  }
}