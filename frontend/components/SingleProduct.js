import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "60bda5b43ef4cd56f4f72363" }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <div>
      <h2>{data.Product.name}</h2>
    </div>
  );
}
