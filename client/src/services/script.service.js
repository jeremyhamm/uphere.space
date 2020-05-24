/**
 * Load external script
 *
 * @param  {String} url script to load
 * @return {Void}
 */
const loadScript = attributes => {
  let script = document.createElement("script");
  for (const property in attributes) {
    script.setAttribute(property, attributes[property]);
  }
  document.head.appendChild(script);
};

export default {
  loadScript
};
