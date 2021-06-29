import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  const { type } = req.query;
  const request = await fetch(<any>process.env.DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic cHJvamVjdGFzaGlrOlRmYndqcT9AMzY5`
    },
    body: JSON.stringify({
      operation: "sql",
      sql: `SELECT * FROM resources.resources ORDER BY __createdtime__ DESC`
    })
  })


  const data = await request.json();

  res.status(200).json(data)
}