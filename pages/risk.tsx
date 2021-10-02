import Head from 'next/head';
import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';
import RiskModal from '../components/RiskModal';
import { addMarker, zoomTo } from '../libs/map';
export default function Risk() {
  const [riskModalView, setRiskModalView] = useState(false);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [totalPopulationData, setTotalPopulationData] = useState({});
  const [populationData, setPopulationData] = useState({});
  const [clickedCountry, setClickedCountry] = useState('');
  // const [totalPopulationData, setTotalPopulationData] = useState(null);
  // const [populationData, setPopulationData] = useState({});
  const geoData = {};
  const countryCode = {};
  const [selectedCountry, setSelectedCountry] = useState('');
  // @ts-ignore
  mapboxgl.accessToken = mapboxToken;
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 1,
    });

    function triggerSearch(country: string) {
      // @ts-ignore
      if (populationData[country]) {
        // @ts-ignore
        console.log(populationData[country]);
        // @ts-ignore
        zoomTo(map, geoData[country].long, geoData[country].lan);
        // @ts-ignore
        setSelectedCountry(countryCode[country]);
        setClickedCountry(country);
        setRiskModalView(true);
      }
    }

    async function getPopulation() {
      const fetchedPopulationData = {};
      const fetchedTotalPopulationData = {};
      // await fetch('/population.json')
      await fetch('/api/population')
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          data.forEach((element: any) => {
            // @ts-ignore
            fetchedPopulationData[element.country] = element.density;
            // @ts-ignore
            console.log(populationData[element.country]);
            // @ts-ignore
            fetchedTotalPopulationData[element.country] =
              Number(element.pop2021) * 1000;
          });
          setPopulationData(fetchedPopulationData);
          setTotalPopulationData(fetchedTotalPopulationData);
        });
      console.log(fetchedPopulationData, fetchedTotalPopulationData);
      await fetch('/coordinates.json')
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element: any) => {
            const long = element.longitude;
            const lan = element.latitude;
            // @ts-ignore
            geoData[element.country] = { long, lan };
            // @ts-ignore
            countryCode[element.country] = element.alpha2;
            //addMarker(long, lan);
          });
        });

      // @ts-ignore
      for (const [country, { long, lan }] of Object.entries(geoData)) {
        // @ts-ignore
        if (populationData[country]) {
          // @ts-ignore
          populationData[country] = Math.ceil(populationData[country]);
          addMarker(
            map,
            long,
            lan,
            country, // @ts-ignore
            countryCode[country],
            (country) => {
              triggerSearch(country);
            }
          );
        }
      }
    }
    getPopulation();
    console.log('population data', populationData);
  }, []);

  return (
    <>
      <Head>
        <link
          href='https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.css'
          rel='stylesheet'
        />
        <title>Risk Calculator Page</title>
      </Head>
      <main>
        <div
          id='map'
          className='absolute top-14 w-full'
          style={{ height: 'calc(100vh - 56px)' }}
        ></div>
        {riskModalView && (
          <RiskModal
            modalView={riskModalView}
            setModalView={setRiskModalView}
            country={selectedCountry}
            // @ts-ignore
            populationData={populationData[selectedCountry]}
            // @ts-ignore
            totalPopulationData={totalPopulationData[selectedCountry]}
            // @ts-ignore
            clickedCountry={clickedCountry}
          ></RiskModal>
        )}
      </main>
    </>
  );
}
