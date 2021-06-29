import { NextApiRequest, NextApiResponse } from "next";
import { ResourceType } from "../../../shared/types/ResourceType";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.body = JSON.parse(req.body)
  const { organization, type, country, state, city, postalCode, addressOne, description, adderssTwo, contactEmail, contactNo, addedBy }: ResourceType = req.body;

  const request = await fetch(<any>process.env.DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.DB_AUTHORIZATION}`
    },
    body: JSON.stringify({
      operation: "insert",
      schema: "resources",
      table: "resources",
      records: [
        {
          organization,
          type, country, state, city, postalCode, addressOne, description, adderssTwo, contactEmail, contactNo, addedBy
        }
      ]
    })
  })

  const data = await request.json();

  res.status(200).json({ data })
}