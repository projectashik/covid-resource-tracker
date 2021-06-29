import { WorldwideType } from "../../shared/types/WorldwideType";
import { StatsCard } from "./StatsCard";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

interface WorldWideDataComponentPropsType {
  data: WorldwideType;
}

export const WorldWideData = ({ data }: WorldWideDataComponentPropsType) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        title="Total Covered"
        value={data.recovered}
        icon={faVirus}
        colorClass="text-green-400"
      ></StatsCard>
    </div>
  );
};
