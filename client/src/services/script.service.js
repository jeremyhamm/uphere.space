/**
 * Load external script
 *
 * @param  {String} url script to load
 * @return {Void}
 */
const loadScript = url => {
  let script = document.createElement("script");
  script.setAttribute("src", url);
  document.head.appendChild(script);
};

export default {
  loadScript
};
