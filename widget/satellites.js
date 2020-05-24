(() => {

  const height = document.currentScript.getAttribute('height');
  const width = document.currentScript.getAttribute('width');

  let iframe = document.createElement('iframe');
  iframe.src = 'satellite-widget.html';
  iframe.height = `${height}px`;
  iframe.width = `${width}px`;
  iframe.id = 'satelltie-frame';
  //iframe.style = 'border-style: none';
  document.body.appendChild(iframe);
})()