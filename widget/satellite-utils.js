const loadMap = (satellite) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
      xhr.open('GET', `https://uphere-space1.p.rapidapi.com/satellite/${encodeURIComponent(satellite)}/location`);
      xhr.setRequestHeader('X-RapidAPI-Key', 'a474d7283amsh13c74547665ebd9p1d57dajsna2ffae84b118');
      xhr.send(null);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const location = JSON.parse(xhr.responseText);
            return resolve(location);
          }
        }
      };
  });
}

const loadOrbit = (satellite) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
      xhr.open('GET', `https://uphere-space1.p.rapidapi.com/satellite/${encodeURIComponent(satellite)}/orbit?period=90`);
      xhr.setRequestHeader('X-RapidAPI-Key', 'a474d7283amsh13c74547665ebd9p1d57dajsna2ffae84b118');
      xhr.send(null);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const orbit = JSON.parse(xhr.responseText);
            const orbitalPath = [];
            orbit.forEach(val => {
              const latlng = new L.LatLng(val.lat, val.lng);
              orbitalPath.push(latlng);
            });
            return resolve(orbitalPath);
          }
        }
      };
  });
}

const loadDetails = (satellite) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
      xhr.open('GET', `https://uphere-space1.p.rapidapi.com/satellite/${encodeURIComponent(satellite)}/orbit?period=90`);
      xhr.setRequestHeader('X-RapidAPI-Key', 'a474d7283amsh13c74547665ebd9p1d57dajsna2ffae84b118');
      xhr.send(null);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const orbit = JSON.parse(xhr.responseText);
            const orbitalPath = [];
            orbit.forEach(val => {
              const latlng = new L.LatLng(val.lat, val.lng);
              orbitalPath.push(latlng);
            });
            return resolve(orbitalPath);
          }
        }
      };
  });
}