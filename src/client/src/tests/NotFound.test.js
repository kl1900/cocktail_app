import { render, screen } from "@testing-library/react";
import React from "react";
import NotFound from "../components/NotFound";
import '@testing-library/jest-dom/extend-expect';

test("renders Not Found copy", () => {
    render( < NotFound /> );
    expect(screen.getByText("NotFound")).toBeInTheDocument();
});

// test('mock useState', () => {
//     const initial = 'Hello World'
//     React.useState = jest.fn().mockReturnValue([initial, {}]);
//     // const wrapper = shallow(<NotFound />)
//     render( < NotFound /> );
//     expect(screen.getByText("Hello World")).toBeInTheDocument();

// });