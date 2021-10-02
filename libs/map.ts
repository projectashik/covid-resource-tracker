import mapboxgl from 'mapbox-gl';
export function zoomTo(map: any, long: number, lat: number) {
  map.flyTo({
    center: [long, lat],
    speed: 0.6,
    zoom: 3,
  });
}

export function addMarker(
  map: any,
  long: any,
  lat: any,
  country: any,
  code: any,
  callback: (country: string) => void
) {
  if (!(lat > 90 || lat < -90 || isNaN(long) || isNaN(lat))) {
    const el = document.createElement('div');
    el.className = 'marker mapboxgl-marker mapboxgl-marker-anchor-center';
    const flagUrl = `https://www.countryflags.io/${code}/shiny/64.png`;
    el.style.backgroundImage = `url(${flagUrl})`;
    el.style.width = '32px';
    el.style.height = '32px';
    el.style.backgroundSize = 'cover';
    el.style.backgroundRepeat = 'no-repeat';
    // @ts-ignore
    const marker = new mapboxgl.Marker(el).setLngLat([long, lat]).addTo(map);
    marker.getElement().addEventListener('click', () => {
      callback(country);
    });
  }
}

export async function getCovidData(country: string) {
  const data = await fetch(
    `https://disease.sh/v3/covid-19/countries/${country}`
  ).then((response) => response.json());
  return data;
}

export async function getVaccineData(country: string) {
  const data = await fetch(
    `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=8&fullData=true
    `
  ).then((response) => response.json());
  return data;
}

export function estimateVaccination(
  population: any,
  alreadyVaccinated: any,
  vaccineDay7: any,
  vaccineDay1: any
) {
  const averageVaccineDaily = (vaccineDay7 - vaccineDay1) / 7;
  if (averageVaccineDaily === 0) return [-1, -1];
  const estimation = Math.round(
    (2 * population - alreadyVaccinated) / (averageVaccineDaily * 30)
  );
  console.log(averageVaccineDaily, population, estimation);

  return [Math.floor(estimation / 12), estimation % 12];
}

export async function getDensityData(country: string) {
  const con = country.toLowerCase().replaceAll(' ', '-');
  const res = await fetch(
    `https://population-density-api.herokuapp.com?country=${con}`
  );
  const data = await res.json();
  return data;
}
