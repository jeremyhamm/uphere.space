(() => {

  const satellite = document.currentScript.getAttribute('satellite');
  const height = document.currentScript.getAttribute('height');
  const width = document.currentScript.getAttribute('width');

  let iframe = document.createElement('iframe');
  iframe.src = satellite ? `satellite-widget.html?satellite=${satellite}` : `satellite-widget.html`;
  iframe.height = `${height}px`;
  iframe.width = `${width}px`;
  iframe.id = 'satelltie-frame';
  iframe.style = 'border-style: none';
  document.body.appendChild(iframe);
})()