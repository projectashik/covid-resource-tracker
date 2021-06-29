import { ResourceType } from "../../shared/types/ResourceType";
import { Card } from "../Corona/Card";

export const SearchCard = ({ resource }: { resource: ResourceType }) => {
  return (
    <>
      <Card>
        <p className="text-xl font-bold text-red-500">
          {resource.organization}
        </p>
        <span className="text-gray-600 text-sm">
          {resource.adderssTwo} {resource.addressOne}, {resource.city},
          {resource.state}, {resource.country}
        </span>
        <p className="text-sm text-gray-900 my-4">{resource.description}</p>
        <div className="text-sm">
          <a
            href={"tel:" + resource.contactNo}
            className="bg-red-400 p-1 text-white"
          >
            {resource.contactNo}
          </a>
          <a
            href={"mailto:" + resource.contactEmail}
            className="bg-red-400 p-1 text-white ml-2"
          >
            {resource.contactEmail}
          </a>
        </div>
      </Card>
    </>
  );
};
