import { render, screen } from "@testing-library/react";
import WishList from "../components/WishList";
import { MemoryRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  Auth0Provider: ({ children }) => children,
  useAuth0: () => {
    return {
      isLoading: false,
      user: { sub: "foobar" },
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
    };
  },
}));

jest.mock("../AuthTokenContext", () => ({
  useAuthToken: () => {
    return { accessToken: "1234" };
  },
}));

fetch.mockResponse(
  JSON.stringify([
    { id: 1, productName: "recipe 1", imageURL: "1bar"},
    { id: 2, productName: "recipe 2", imageURL: "fowar"},
    { id: 3, productName: "recipe 3", imageURL: "f12bar"},
  ])
);

test("renders recipe lists", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <WishList />
    </MemoryRouter>
  );

  const recipelist1 = await screen.findByText("recipe 1");
  // const recipelist2 = await screen.findByText("recipe 2");
  // const recipelist3 = await screen.findByText("recipe 3");

  expect(recipelist1).toBeInTheDocument();
  // expect(recipelist2).toBeInTheDocument();
  // expect(recipelist3).toBeInTheDocument();
});
