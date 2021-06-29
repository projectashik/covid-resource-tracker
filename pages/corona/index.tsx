import { coronaApi, ipApi } from "../../config/config";
import { countries } from "../../data/countries";

import { fetchData } from "../../libs/useFetch";
import { useEffect, useState } from "react";

import Head from "next/dist/next-server/lib/head";

import { Last24Hours } from "../../components/Corona/Last24Hours";
import { TopCountries } from "../../components/Corona/TopCountries";
import { CountryWiseData } from "../../components/Corona/CountryWiseData";
import { Card } from "../../components/Corona/Card";
import { StatsCard } from "../../components/Corona/StatsCard";
import { Divider } from "../../components/Divider";
import { WorldWideData } from "../../components/Corona/WorldWideData";

import NoSSR from "../../components/NoSSR";

import {
  faAngleLeft,
  faAngleRight,
  faCaretUp,
  faVirus,
} from "@fortawesome/free-solid-svg-icons";

import TimeAgo from "react-timeago";
import Select from "react-select";

import { CountryType } from "../../shared/types/CountryType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WorldwideType } from "../../shared/types/WorldwideType";

interface StatsComponentPropType {
  worldwide: WorldwideType;
  countryWise: CountryType;
  liveReport: any;
  topCountries: any;
}

export default function CoronaStats({
  worldwide,
  countryWise,
  liveReport,
  topCountries,
}: StatsComponentPropType) {
  let [country, setCountry] = useState(countryWise.countryInfo.iso2);
  const [countryData, setCountryData] = useState(countryWise);

  const onCountryChange = async (passedCountry: string) => {
    setCountry(passedCountry);
    setCountryData(await fetchData(coronaApi + "/countries/" + passedCountry));
  };

  return (
    <>
      <Head>
        <title>Covid Resource Tracker: Covid Data</title>
        <meta
          name="description"
          content="Covid resource tracker helps people to tracks the covid resources like Plasma, Oxygen, and others."
        />
      </Head>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className=" flex-1">
          <WorldWideData data={worldwide}></WorldWideData>
          <Divider></Divider>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="mb-4">
                <NoSSR>
                  <Select
                    options={countries}
                    value={countries.filter(
                      (option) => option.value === country
                    )}
                    onChange={(opt: any) => onCountryChange(opt.value)}
                  ></Select>
                </NoSSR>
              </div>
              <CountryWiseData data={countryData} />
            </div>
            <div className="lg:w-1/3">
              <TopCountries data={topCountries} />
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <Divider></Divider>
        </div>
        <div className="lg:w-1/4">
          <div className="flex flex-col gap-4">
            <Card>
              <div className="flex items-center">
                <p>Last Update</p>
                <p className="border-l border-gray-400 ml-3 pl-3 flex flex-col text-gray-600">
                  <NoSSR>
                    <TimeAgo date={worldwide.updated} />
                  </NoSSR>
                </p>
              </div>
            </Card>
            <Card>
              <div className="flex items-center">
                <p>Affected Countries</p>
                <p className="border-l border-gray-400 ml-3 pl-3 flex flex-col text-gray-600">
                  <NoSSR>{worldwide.affectedCountries}</NoSSR>
                </p>
              </div>
            </Card>
            <Last24Hours data={liveReport} />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ params }: any) => {
  const worldwide = await fetchData(coronaApi + "/all");
  const liveReport = await fetchData(coronaApi + "/countries?sort=todayCases");
  const topCountries = await fetchData(coronaApi + "/countries?sort=cases");
  const ipDetail = await fetchData(ipApi);

  const countryCode = ipDetail.countryCode;
  const countryWise = await fetchData(coronaApi + "/countries/" + countryCode);

  return {
    props: { worldwide, countryWise, liveReport, topCountries },
  };
};
