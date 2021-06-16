import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "60bda5b43ef4cd56f4f72363" }) {
      name
      price
      description
    }
  }
`;

export default function singleProduct({ query }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);
  // wrapping console.log in {} returns an opject with parameters
  console.log({ data, loading, error });
  return <p>Hey im a single product {query.id}</p>;
}
