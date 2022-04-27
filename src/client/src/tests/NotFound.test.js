import { render, screen } from "@testing-library/react";
import NotFound from "../components/NotFound";
// import '@testing-library/jest-dom/extend-expect';

test("renders Not Found copy", () => {
    render( < NotFound / > );
    expect(screen.getByText("NotFound")).toBeInTheDocument();
});