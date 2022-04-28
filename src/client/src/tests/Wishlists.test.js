import { render, screen } from "@testing-library/react";
import WishLists from "../components/WishLists";
import { MemoryRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";

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

//test create new recipe list func

// let mockCreateMode = jest.fn();

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   setCreateMode: () => {
//     return mockCreateMode;
//   },
// }));

// test("create new recipe list button", () => {
//   render(
//     <MemoryRouter initialEntries={["/"]}>
//       <WishLists />
//     </MemoryRouter>
//   );

//   const createButton = screen.getByText("New Recipe List");
//   userEvent.click(createButton);

//   expect(mockCreateMode).toHaveBeenCalled();
// });


jest.mock("../AuthTokenContext", () => ({
  useAuthToken: () => {
    return { accessToken: "1234" };
  },
}));

fetch.mockResponse(
  JSON.stringify([
    { id: 1, title: "recipe 1", imageURL: "1bar"},
    { id: 2, title: "recipe 2", imageURL: "fowar"},
    { id: 3, title: "recipe 3", imageURL: "f12bar"},
  ])
);

test("renders recipe lists", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <WishLists />
    </MemoryRouter>
  );

  const recipelist1 = await screen.findByText("recipe 1");
  const recipelist2 = await screen.findByText("recipe 2");
  const recipelist3 = await screen.findByText("recipe 3");

  expect(recipelist1).toBeInTheDocument();
  expect(recipelist2).toBeInTheDocument();
  expect(recipelist3).toBeInTheDocument();
});
