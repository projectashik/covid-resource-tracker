import Head from 'next/head';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ResourceCard } from '../components/ResourceCard';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Covid Resource Tracker</title>
      </Head>
      <main>
        <div className='flex flex-col items-center'>
          <h1 className='text-6xl font-bold my-16 text-center'>
            Covid Resource Tracker
          </h1>
          <p className='text-gray-600 max-w-md text-center'>
            Get the information about the covid resources like ambulances,
            medicines, isolation centers, ICU, Oxygen cylinders / bed, Plasma,
            doctor consultation etc.
          </p>
          <a
            href='#resources'
            className='bg-red-500 hover:bg-red-600 text-white flex items-center px-4 py-3 my-16'
          >
            <span className='mr-2'>Get Started</span>{' '}
            <FontAwesomeIcon className='w-4 h-4' icon={faArrowDown} />
          </a>
        </div>
        <section id='resources'>
          <h2 className='text-center text-2xl mb-12'>Resources</h2>
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
            <ResourceCard
              image='plasma.jpg'
              title='Plasma'
              href='/resources/plasma'
            />
            <ResourceCard
              image='food.jpg'
              title='Food'
              href='/resources/food'
            />
            <ResourceCard
              image='ambulance.jpg'
              title='Ambulance'
              href='/resources/ambulance'
            />
            <ResourceCard
              image='doctor.jpg'
              title='Doctor Consultation'
              href='/resources/doctor'
            />
            <ResourceCard
              image='medicines.jpg'
              title='Medicines/Injections'
              href='/resources/medicines'
            />
            <ResourceCard
              image='icu.jpg'
              title='ICU / Beds / Ventilator'
              href='/resources/icu'
            />
            <ResourceCard
              image='oxygen.jpg'
              title='Oxygen'
              href='/resources/oxygen'
            />
            <ResourceCard
              image='oxygen.jpg'
              title='Oxygen Refill'
              href='/resources/oxygen-refill'
            />
            <ResourceCard
              image='hospital.jpg'
              title='Hospital Nearby'
              normalLink={true}
              href='https://www.google.com/maps/search/hospital+near+me'
            />
          </div>
        </section>
      </main>
    </div>
  );
}
