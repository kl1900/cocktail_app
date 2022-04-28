import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import { MemoryRouter } from "react-router-dom";
import { enableFetchMocks } from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";
enableFetchMocks();

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => {
    return mockUseNavigate;
  },
}));

fetch.mockResponse(
    ()=>{return JSON.stringify(["jokes are not fun!"])}   
  );

test("render joke text", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText("jokes are not fun!")).toBeInTheDocument();

});

test("enter Get a Random Recipe! button navigates to /app", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    );
  
    const enterAppButton = screen.getByText("Get a Random Recipe!");
    userEvent.click(enterAppButton);
  
    expect(mockUseNavigate).toHaveBeenCalledWith("/details/");
  });

// test("enter App button navigates to /app", () => {
//   mockIsAuthenticated = true;
//   render(
//     <MemoryRouter initialEntries={["/"]}>
//       <Home />
//     </MemoryRouter>
//   );

//   const enterAppButton = screen.getByText("Enter App");
//   userEvent.click(enterAppButton);

//   expect(mockUseNavigate).toHaveBeenCalledWith("/");
// });
