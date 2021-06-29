import { StatsCard } from "./StatsCard";
import { faVirus } from "@fortawesome/free-solid-svg-icons";
import { CountryType } from "../../shared/types/CountryType";

interface CountryWiseDataPropType {
  data: CountryType;
}

export const CountryWiseData = ({ data }: CountryWiseDataPropType) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <StatsCard
        title="Total Cases"
        value={data.cases}
        icon={faVirus}
        colorClass="text-yellow-400"
      ></StatsCard>
      <StatsCard
        title="Total Deaths"
        value={data.deaths}
        icon={faVirus}
        colorClass="text-red-400"
      ></StatsCard>
      <StatsCard
        title="Total Recovered"
        value={data.recovered}
        icon={faVirus}
        colorClass="text-green-400"
      ></StatsCard>
      <StatsCard
        title="Today Cases"
        value={data.todayCases}
        icon={faVirus}
        colorClass="text-yellow-400"
      ></StatsCard>
      <StatsCard
        title="Today's Deaths"
        value={data.todayDeaths}
        icon={faVirus}
        colorClass="text-red-400"
      ></StatsCard>
      <StatsCard
        title="Today's Recovered"
        value={data.todayRecovered}
        icon={faVirus}
        colorClass="text-green-400"
      ></StatsCard>
      <StatsCard
        title="Active Cases"
        value={data.active}
        icon={faVirus}
        colorClass="text-blue-400"
      ></StatsCard>
      <StatsCard
        title="Critical Cases"
        value={data.critical}
        icon={faVirus}
        colorClass="text-red-600"
      ></StatsCard>
    </div>
  );
};
