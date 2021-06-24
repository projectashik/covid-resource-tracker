import { coronaApi, ipApi } from "../../config/config";
import { countries } from "../../data/countries";

import { useFetch } from "../../libs/useFetch";
import { useEffect, useState } from "react";

import Image from "next/image";

import { Card } from "../../components/Corona/Card";
import { StatsCard } from "../../components/Corona/StatsCard";
import { Divider } from "../../components/Divider";
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

export default function CoronaStats({
  worldwide,
  countryWise,
  all,
  allCountries,
}: any) {
  let [country, setCountry] = useState(countryWise.countryInfo.iso2);
  const [initialValue, setInitialValue] = useState(0);
  const [finalValue, setFinalValue] = useState(10);
  const [initialValueCountries, setInitialValueCountries] = useState(0);
  const [finalValueCountries, setFinalValueCountries] = useState(10);
  const [countryData, setCountryData] = useState(countryWise);

  const onCountryChange = async (passedCountry: string) => {
    setCountry(passedCountry);
    setCountryData(await useFetch(coronaApi + "/countries/" + passedCountry));
  };

  const changeLeft = () => {
    if (initialValue >= 10) {
      setInitialValue((previousInitialValue) => previousInitialValue - 10);
      setFinalValue((previousFinalValue) => previousFinalValue - 10);
    }
  };

  const changeRight = () => {
    if (finalValue < all.length) {
      setInitialValue((previousInitialValue) => previousInitialValue + 10);
      setFinalValue((previousFinalValue) => previousFinalValue + 10);
    }
  };

  const changeLeftCountries = () => {
    if (initialValueCountries >= 10) {
      setInitialValueCountries(
        (previousInitialValueCountries) => previousInitialValueCountries - 10
      );
      setFinalValueCountries(
        (previousFinalValueCountries) => previousFinalValueCountries - 10
      );
    }
  };

  const changeRightCountries = () => {
    if (finalValueCountries < allCountries.length) {
      setInitialValueCountries(
        (previousInitialValueCountries) => previousInitialValueCountries + 10
      );
      setFinalValueCountries(
        (previousFinalValueCountries) => previousFinalValueCountries + 10
      );
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className=" flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatsCard
              title="Total Cases"
              value={worldwide.cases}
              icon={faVirus}
              colorClass="text-yellow-400"
            ></StatsCard>
            <StatsCard
              title="Total Deaths"
              value={worldwide.deaths}
              icon={faVirus}
              colorClass="text-red-400"
            ></StatsCard>
            <StatsCard
              title="Total Covered"
              value={worldwide.recovered}
              icon={faVirus}
              colorClass="text-green-400"
            ></StatsCard>
          </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <StatsCard
                  title="Total Cases"
                  value={countryData.cases}
                  icon={faVirus}
                  colorClass="text-yellow-400"
                ></StatsCard>
                <StatsCard
                  title="Total Deaths"
                  value={countryData.deaths}
                  icon={faVirus}
                  colorClass="text-red-400"
                ></StatsCard>
                <StatsCard
                  title="Total Recovered"
                  value={countryData.recovered}
                  icon={faVirus}
                  colorClass="text-green-400"
                ></StatsCard>
                <StatsCard
                  title="Today Cases"
                  value={countryData.cases}
                  icon={faVirus}
                  colorClass="text-yellow-400"
                ></StatsCard>
                <StatsCard
                  title="Today's Deaths"
                  value={countryData.deaths}
                  icon={faVirus}
                  colorClass="text-red-400"
                ></StatsCard>
                <StatsCard
                  title="Today's Recovered"
                  value={countryData.recovered}
                  icon={faVirus}
                  colorClass="text-green-400"
                ></StatsCard>
                <StatsCard
                  title="Active Cases"
                  value={countryData.active}
                  icon={faVirus}
                  colorClass="text-blue-400"
                ></StatsCard>
                <StatsCard
                  title="Critical Cases"
                  value={countryData.critical}
                  icon={faVirus}
                  colorClass="text-red-600"
                ></StatsCard>
              </div>
            </div>
            <div className="lg:w-1/3">
              <Card>
                <div className="flex justify-between items-center">
                  <strong>Top Countries</strong>
                  <div className="flex items-center">
                    <button
                      className="border py-1 px-2 focus:border-gray-900 disabled:opacity-30"
                      disabled={initialValueCountries <= 0}
                      onClick={() => changeLeftCountries()}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button
                      className="border py-1 px-2 focus:border-gray-900 disabled:opacity-30"
                      onClick={() => changeRightCountries()}
                      disabled={finalValueCountries >= allCountries.length}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-8 mt-4">
                  {allCountries
                    .slice(initialValueCountries, finalValueCountries)
                    .map((country: CountryType) => {
                      return (
                        <div
                          key={country.countryInfo._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <Image
                              src={country.countryInfo.flag}
                              alt={country.country}
                              width="50px"
                              height="30px"
                              className="rounded shadow-xl"
                            />
                            <span className="ml-3 font-bold">
                              {country.country}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-500 font-bold">
                              {country.cases}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <Divider></Divider>
        </div>
        <div className="lg:w-1/4">
          <div>
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
            <div className="my-4"></div>
            <Card>
              <div className="flex justify-between items-center">
                <strong>Last 24 hours</strong>
                <div className="flex items-center">
                  <button
                    className="border py-1 px-2 focus:border-gray-900 disabled:opacity-30"
                    disabled={initialValue <= 0}
                    onClick={() => changeLeft()}
                  >
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </button>
                  <button
                    className="border py-1 px-2 focus:border-gray-900 disabled:opacity-30"
                    onClick={() => changeRight()}
                    disabled={finalValue >= all.length}
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-8 mt-4">
                {all
                  .slice(initialValue, finalValue)
                  .map((country: CountryType) => {
                    return (
                      <div
                        key={country.countryInfo._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Image
                            src={country.countryInfo.flag}
                            alt={country.country}
                            width="50px"
                            height="30px"
                            className="rounded shadow-xl"
                          />
                          <span className="ml-3 font-bold">
                            {country.country}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-red-500 font-bold">
                            {country.todayCases}
                          </span>
                          <span className="ml-2 text-red-500">
                            <FontAwesomeIcon icon={faCaretUp} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  const worldwide = await useFetch(coronaApi + "/all");
  const all = await useFetch(coronaApi + "/countries?sort=todayCases");
  const allCountries = await useFetch(coronaApi + "/countries?sort=cases");
  const ipDetail = await useFetch(ipApi);

  const countryCode = ipDetail.countryCode;
  const countryWise = await useFetch(coronaApi + "/countries/" + countryCode);

  return {
    props: { worldwide, countryWise, all, allCountries },
  };
}
