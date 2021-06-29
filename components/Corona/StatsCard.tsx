import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "./Card";

export const StatsCard = (props: StatsCardPropType) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div>
          <p>{props.title}</p>
          <span className={"text-3xl " + props.colorClass}>
            {props.value || props.value === 0 ? props.value : "N/A"}
          </span>
        </div>
        <FontAwesomeIcon
          icon={props.icon}
          size="4x"
          className={props.colorClass}
        />
      </div>
    </Card>
  );
};

interface StatsCardPropType {
  title: string;
  value: number;
  icon: any;
  colorClass: string;
}
