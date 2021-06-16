import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in and what type are they note bang is required
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  // Custom hook
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: "",
    name: "cool shoes",
    price: 12345,
    description: "i like these shoes",
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    }
  );
  // Use of fieldset will allow full form disablement
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        // submit the inputfields to the back end
        // note we could of set the variables here createProduct({variables}) instead of within the function declaration
        await createProduct();
        // since we get the {data} back
        // previously
        // const res = await createProduct();
        clearForm();
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Name
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Product</button>
      </fieldset>
    </Form>
  );
}
