import styles from "../../styles/Form.module.css";

import { Card } from "../../components/Corona/Card";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { SearchCard } from "../../components/Resources/SearchCard";
import { NoResources } from "../../components/Resources/NoResources";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useAsyncEffect } from "use-async-effect";
import { Loader } from "../../components/Loader";
import Head from "next/head";

import axios from "axios";
import { ResourceType } from "../../shared/types/ResourceType";

export default function ResourcesPage() {
  const router = useRouter(); // router

  const [data, setData] = useState([]);
  const [filteredResources, setFilteredResources] = useState<ResourceType[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useAsyncEffect(async () => {
    setData([]);
    setLoading(true);

    const resources = await await axios.get("/api/GET/resources");

    await setData(resources.data);
    setLoading(false);
  }, [isSearched === true]);

  const type = router.query.type;

  const filteredData = (
    data: ResourceType[],
    type: string | string[] | undefined
  ) => {
    return data.filter((resource: ResourceType) => {
      return resource.type === type;
    });
  };

  const searchFilter = (
    data: ResourceType[],
    country: string,
    state: string,
    city: string
  ) => {
    return data.filter((resource) => {
      return (
        // (resource.country.includes(country) &&
        //   resource.state.includes(state)) ||
        // resource.city.includes(city) ||
        // resource.postalCode.toString().includes(city)
        resource.country.toLowerCase().includes(country.toLowerCase()) &&
        resource.state.toLowerCase().includes(state.toLowerCase()) &&
        (resource.city.toLowerCase().includes(city.toLowerCase()) ||
          resource.postalCode.toString().includes(city))
      );
    });
  };

  // let filteredResources = searchFilter(data, country, state, city);
  const onSearch = (e: SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    setIsSearched(true);
    const resources = filteredData(data, type);
    setFilteredResources(searchFilter(resources, country, state, city));
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>{type} - Covid Resource Tracker</title>
      </Head>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <Link href="/panel/resources/add" passHref={true}>
            <button className="bg-red-400 px-3 py-2 text-white text-sm focus:ring-2 ring-offset-4 ring-red-400">
              Add Resource
            </button>
          </Link>
          <p className="capitalize font-bold text-4xl my-5 text-gray-900 border-b-4 border-dashed border-red-400">
            {type}
          </p>
          <form
            onSubmit={onSearch}
            className="bg-white rounded-md w-96 min-w-min shadow-md p-10"
          >
            <div className={styles.formGroup}>
              <label htmlFor="country" className={styles.formLabel}>
                Country
              </label>
              <input
                type="text"
                id="country"
                required
                className={styles.formInput}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter country name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="state" className={styles.formLabel + " mt-4"}>
                State
              </label>
              <input
                type="text"
                id="state"
                required
                className={styles.formInput}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.formLabel + " mt-4"}>
                City/Postal Code (Optional)
              </label>
              <input
                type="text"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                className={styles.formInput}
                placeholder="Enter city name / postal code"
              />
            </div>
            <button
              type="submit"
              className="bg-red-400 mt-4 block w-full text-white hover:bg-red-500 px-5 py-3"
            >
              {loading ? "Searching" : "Search"}
            </button>
          </form>
        </div>
        <section id="result" className="flex flex-col items-center mt-10">
          <div className="w-96 min-w-min">
            <h2 className="font-bold text-xl before:absolute relative before:-bottom-1 before:rounded-full before:bg-red-400 before:w-11 before:h-1">
              Fetched Resources
            </h2>
            {isSearched && (
              <div className="mt-6 grid gap-4 grid-cols-1">
                {filteredResources.map((r) => {
                  return (
                    <SearchCard resource={r} key={Math.random()}></SearchCard>
                  );
                })}

                {loading && (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                )}

                {filteredResources.length === 0 && !loading && <NoResources />}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
