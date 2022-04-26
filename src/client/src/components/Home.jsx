import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, user } = useAuth0();

  function GuestHome() {
    return <div>Guest Home</div>;
  }

  function UserHome() {
    return <div>User Home</div>;
  }

  if (isAuthenticated) {
    return UserHome();
  } else {
    return GuestHome();
  }
}
