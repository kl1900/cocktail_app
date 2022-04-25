import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import SearchResult from "./components/SearchResult";
import WishList from "./components/WishList";
import WishLists from "./components/WishLists";
import VerifyUser from "./components/VerifyUser";
import AuthDebugger from "./components/AuthDebugger";

import "./style/index.css";

const requestedScopes = [
  "read:user",
  "edit:user",
  "read:wishlists",
  "edit:wishlists",
];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(`is authenticated: ${isAuthenticated}`);
  console.log(`is loading: ${isLoading}`);
  console.log(children);
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function OptionalAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(`is authenticated: ${isAuthenticated}`);
  console.log(`is loading: ${isLoading}`);
  <Outlet></Outlet>;
  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={`${window.location.origin}/verify-user`}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope={requestedScopes.join(" ")}
    >
      <AuthTokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/verify-user" element={<VerifyUser />} />
            <Route
              path="app"
              element={
                <RequireAuth>
                  <AppLayout />
                </RequireAuth>
              }
            >
              <Route path="profile" element={<UserProfile />} />
              <Route path="debugger" element={<AuthDebugger />} />
              <Route path="wishlists" element={<WishLists />} />
              <Route path="wishlist/:wishlistId" element={<WishList />} />
              <Route path="search" element={<SearchResult />} />
              <Route path="products/:productId" element={<ProductDetail />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="foo" element={<OptionalAuth></OptionalAuth>}>
              <Route path="search" element={<SearchResult />} />
              <Route path="products/:productId" element={<ProductDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
