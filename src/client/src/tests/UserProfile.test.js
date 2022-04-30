import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "../components/UserProfile";

let mockIsAuthenticated = false;

jest.mock("@auth0/auth0-react", () => ({
    ...jest.requireActual("@auth0/auth0-react"),
    Auth0Provider: ({ children }) => children,
    useAuth0: () => {
        return {
            isLoading: false,
            user: {
                sub: "subId",
                email: "liz@gmail.com",
                email_verified: true,
            },
            isAuthenticated: mockIsAuthenticated,
            loginWithRedirect: jest.fn(),
        };
    },
}));

fetch.mockResponse(
    JSON.stringify([
      { name: "liz"},
    ])
  );

test("renders Profile", () => {
    render( 
      <MemoryRouter initialEntries = {["/"]} >
          <Profile />
      </MemoryRouter>
    );

    expect(screen.getByText("Name: liz")).toBeInTheDocument();
    expect(screen.getByText("📧 Email: liz@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("🔑 Auth0Id: subId")).toBeInTheDocument();
    expect(screen.getByText("✅ Email verified: true")).toBeInTheDocument();
});