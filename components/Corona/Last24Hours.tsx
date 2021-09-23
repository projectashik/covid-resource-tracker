import { Card } from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useState } from 'react';
import { CountryType } from '../../shared/types/CountryType';

export const Last24Hours = ({ data }: any) => {
  const [initialValue, setInitialValue] = useState(0);
  const [finalValue, setFinalValue] = useState(10);

  const changeLeft = () => {
    if (initialValue >= 10) {
      setInitialValue((previousInitialValue) => previousInitialValue - 10);
      setFinalValue((previousFinalValue) => previousFinalValue - 10);
    }
  };

  const changeRight = () => {
    if (finalValue < data.length) {
      setInitialValue((previousInitialValue) => previousInitialValue + 10);
      setFinalValue((previousFinalValue) => previousFinalValue + 10);
    }
  };
  return (
    <Card>
      <div className='flex justify-between items-center'>
        <strong>Last 24 hours</strong>
        <div className='flex items-center'>
          <button
            className='border py-1 px-2 focus:border-gray-900 disabled:opacity-30'
            disabled={initialValue <= 0}
            onClick={() => changeLeft()}
          >
            <FontAwesomeIcon className='w-4 h-4' icon={faAngleLeft} />
          </button>
          <button
            className='border py-1 px-2 focus:border-gray-900 disabled:opacity-30'
            onClick={() => changeRight()}
            disabled={finalValue >= data.length}
          >
            <FontAwesomeIcon className='w-4 h-4' icon={faAngleRight} />
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-8 mt-4'>
        {data.slice(initialValue, finalValue).map((country: CountryType) => {
          return (
            <div
              key={country.countryInfo._id}
              className='flex items-center justify-between'
            >
              <div className='flex items-center'>
                <Image
                  src={country.countryInfo.flag}
                  alt={country.country}
                  width='50px'
                  height='30px'
                  className='rounded shadow-xl'
                />
                <span className='ml-3 font-bold'>{country.country}</span>
              </div>
              <div className='flex items-center'>
                <span className='text-red-500 font-bold'>
                  {country.todayCases}
                </span>
                <span className='ml-2 text-red-500'>
                  <FontAwesomeIcon className='w-4 h-4' icon={faCaretUp} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
