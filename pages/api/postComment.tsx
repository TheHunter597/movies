import type { NextApiRequest, NextApiResponse } from "next";

import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";

const endpoint = process.env.ENDPOINT_API_KEY as string;

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.PERMENANT_AUTH_TOKEN}`,
    },
  });

  const query = gql`
    mutation AddMovie($name: String!, $email: String!, $comment: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment }) {
        createdAt
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);
    res.status(200).json({ message: "User created sucessfully" });
    console.log(result);

    return result;
  } catch (e) {
    res.status(400).json({ message: "User already exists" });
    console.log(e);

    return e;
  }
}
