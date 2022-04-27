import { render, screen } from "@testing-library/react";
import Wishlists from "../components/WishLists";
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
    return { accessToken: "123" };
  },
}));

fetch.mockResponse(
  JSON.stringify([
    { id: 1, title: "recipe 1" },
    { id: 2, title: "recipe 2" },
    { id: 3, title: "recipe 3" },
  ])
);

test("renders recipe lists", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Wishlists />
    </MemoryRouter>
  );

  const recipelist1 = await screen.findByText("recipe 1");
  const recipelist2 = await screen.findByText("recipe 2");
  const recipelist3 = await screen.findByText("recipe 3");

  expect(recipelist1).toBeInTheDocument();
  expect(recipelist2).toBeInTheDocument();
  expect(recipelist3).toBeInTheDocument();
});
