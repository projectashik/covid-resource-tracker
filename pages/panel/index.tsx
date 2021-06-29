import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { Divider } from "../../components/Divider";
import { ResourceType } from "../../shared/types/ResourceType";
import { SearchCard } from "../../components/Resources/SearchCard";
import { Loader } from "../../components/Loader";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export default function Panel({ user }: { user: UserProfile }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useAsyncEffect(async () => {
    setData([]);
    setLoading(true);

    const resources = await axios.get("/api/GET/resources");

    await setData(resources.data);
    setLoading(false);
  }, []);

  const filterData = (data: ResourceType[]) => {
    return data.filter((resource: ResourceType) => {
      if (user) {
        return user.name === resource.addedBy.email;
      }
    });
  };
  // console.log(data);
  const filteredData = filterData(data);
  console.log(filteredData);

  return (
    <>
      <div>
        <header>
          <Link href="/panel/resources/add">
            <a href="/panel/reources/add" className="bg-white px-4 py-2 shadow">
              Add Resource
            </a>
          </Link>
        </header>
        <Divider></Divider>
        <main>
          <h2 className="text-xl">Added Resources</h2>
          {filteredData && (
            <div className="mt-5 grid grid-cols-1 gap-4">
              {filteredData.map((resource) => {
                return (
                  <SearchCard
                    key={Math.random()}
                    resource={resource}
                  ></SearchCard>
                );
              })}
            </div>
          )}

          {loading && <Loader />}
        </main>
      </div>
    </>
  );
}
export const getServerSideProps = withPageAuthRequired();
