import {
  getCovidData,
  getVaccineData,
  estimateVaccination,
  getDensityData,
} from 'libs/map';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Risk.module.css';
export default function RiskModal({
  modelView,
  setModalView,
  country,
  populationData,
  totalPopulationData,
  clickedCountry,
}: any) {
  const [covidData, setCovidData] = useState({});
  const [vaccineData, setVaccineData] = useState(null);
  const [estimatedYear, setEstimatedYear] = useState('Uncertain');
  const [estimatedMonth, setEstimatedMonth] = useState('Uncertain');
  const [estimatedVaccination, setEstimatedVaccination] = useState([]);
  const [crowdiness, setCrowdiness] = useState('0');
  const fillEstimatedTime = () => {
    if (vaccineData) {
      setEstimatedVaccination(
        // @ts-ignore
        estimateVaccination(
          totalPopulationData,
          // @ts-ignore
          vaccineData.timeline[7].total,
          // @ts-ignore
          vaccineData.timeline[6].total,
          // @ts-ignore
          vaccineData.timeline[0].total
        )
      );
    }
    if (estimatedVaccination[0] == -1 && estimatedVaccination[1] == -1)
      setEstimatedYear(`Uncertain`);
    else if (estimatedVaccination[0] >= 5) setEstimatedYear('5+ Years');
    else {
      if (estimatedVaccination[0] > 0)
        setEstimatedYear(
          `${estimatedVaccination[0]} Year${
            estimatedVaccination[0] > 1 ? 's' : ''
          }`
        );
      if (estimatedVaccination[1] > 0)
        setEstimatedMonth(
          `${estimatedVaccination[1]} Month${
            estimatedVaccination[1] > 1 ? 's' : ''
          }`
        );
    }
  };
  useEffect(() => {
    // alert(populationData);
    async function collectData() {
      setCovidData(await getCovidData(country));
      setVaccineData(await getVaccineData(country));
      const populationData = await getDensityData(clickedCountry);
      setCrowdiness(populationData.density);
      console.log({ covidData, vaccineData });
    }
    collectData();
    console.log(estimateVaccination);
    fillEstimatedTime();
  });
  return (
    <div id='myModal' className={styles.modal}>
      <div className={styles['modal-content']}>
        <span className={styles['close']} onClick={() => setModalView(false)}>
          &times;
        </span>
        <p id='risk-country' className={styles['risk-country']}>
          {/* @ts-ignore */}
          {covidData && covidData.country}
        </p>
        <hr />
        <div className={styles['modal-details']}>
          <div>
            Are you Vaccinated :
            <p
              className={
                styles['modal-sub'] + ' ' + styles['modal-sub-details']
              }
            >
              <input
                type='checkbox'
                className={styles['vaccinatedCheck']}
                id='vaccinatedCheck'
              />
            </p>
          </div>
          <div>
            Risk Level :
            <p
              id='country-status'
              className={
                styles['modal-sub'] + ' ' + styles['modal-sub-details']
              }
            ></p>
          </div>
          <div>
            Crowdiness :
            <p
              className={
                styles['modal-sub'] + ' ' + styles['modal-sub-details']
              }
              id='crowdiness'
            >
              {crowdiness}
            </p>
            <p
              className={
                styles['modal-sub'] + ' ' + styles['modal-sub-details']
              }
            >
              people/km <sup>2</sup>
            </p>
          </div>
          <div>
            Active Cases :
            <p
              className={
                styles['modal-sub'] + ' ' + styles['modal-sub-details']
              }
            >
              {/* @ts-ignore */}
              {covidData && covidData.active}
            </p>
          </div>
          <div>
            Doses Given :
            <p
              className={
                styles['modal-sub'] + ' ' + styles['modal-sub-details']
              }
              id='vaccinated'
            >
              {/* @ts-ignore */}
              {vaccineData && vaccineData.timeline[0].total}
            </p>
          </div>
          <div>
            Estimated Time :
            <p
              className={
                styles['modal-sub'] + ' ' + styles['modal-sub-details']
              }
              id='estimated-years'
            >
              {estimatedYear}
            </p>
            <p
              className={
                styles['modal-sub'] + ' ' + styles['modal-sub-details']
              }
              id='estimated-months'
            >
              {estimatedMonth}
            </p>
            <p className={styles['modal-sub-subscript']}>
              (*to be vaccinated at current rate)
            </p>
          </div>
        </div>
        <hr />
        <div className={styles['modal-guidelines']}>
          <p>
            <strong>Health Guidelines</strong>
          </p>
          <div>
            <div className={styles['modalContainer']}>
              <Image
                className={styles['logo'] + ' ' + styles['vaccine-logo']}
                src='/img/mask.png'
                width='200'
                height='100'
                alt='Vaccine'
              />

              <p className={styles['modal-guidelines-details']}>
                A study published in
                <a
                  href='https://www.healthaffairs.org/doi/10.1377/hlthaff.2020.00818'
                  target='_blank'
                  rel='noreferrer'
                >
                  Health Affairs
                </a>
                , has found that <strong>mask</strong> mandates led to a
                slowdown in daily COVID-19 growth rate.
              </p>
            </div>
            <hr />
            <div className={styles['modalContainer']}>
              <Image
                className={styles['logo']}
                src='/img/vaccine.png'
                width='180'
                height='130'
                alt='logo'
              />
              <p className={styles['modal-guidelines-details']}>
                <a
                  href='https://www.cdc.gov/vaccines/covid-19/effectiveness-research/protocols.html'
                  target='_blank'
                  rel='noreferrer'
                >
                  Vaccine effectiveness studies
                </a>
                provide evidence that current COVID-19
                <strong>vaccines</strong> reduce the risk of COVID-19, including
                severe illness, among people who are fully vaccinated by about
                90%.
              </p>
            </div>
            <hr />
            <div className={styles['modalContainer']}>
              <Image
                className={styles['logo'] + ' ' + styles['social-logo']}
                src='/img/social.png'
                width='180'
                height='100'
                alt='Maintain Social Distance'
              />
              <p className={styles['modal-guidelines-details']}>
                A
                <a
                  href='https://isfe.uky.edu/research/2020/did-social-distancing-measures-kentucky-help-flatten-covid-19-curve'
                  target='_blank'
                  rel='noreferrer'
                >
                  research study{' '}
                </a>
                in Kentucky showed that
                <strong>social distancing</strong> prevented over 90 percent of
                the COVID-19 cases that would have otherwise occurred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
