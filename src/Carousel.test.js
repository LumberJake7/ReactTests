// Carousel.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Carousel from "./Carousel";

const TEST_IMAGES = [
  { src: "image1.jpg", caption: "Caption 1" },
  { src: "image2.jpg", caption: "Caption 2" },
  { src: "image3.jpg", caption: "Caption 3" },
];

// Smoke test
it("renders without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="Test Carousel" />
  );
  expect(asFragment()).toMatchSnapshot();
});

// Test for goBackwards function
it("goes to the previous image", () => {
  const { container, getByRole } = render(
    <Carousel photos={TEST_IMAGES} title="Test Carousel" />
  );

  const rightArrow = getByRole("button", { name: /right arrow/i });
  fireEvent.click(rightArrow);

  expect(container.querySelector('img[alt="Caption 2"]')).toBeInTheDocument();

  const leftArrow = getByRole("button", { name: /left arrow/i });
  fireEvent.click(leftArrow);

  expect(container.querySelector('img[alt="Caption 1"]')).toBeInTheDocument();
});

// Test for goForward function
it("goes to the next image", () => {
  const { container, getByRole } = render(
    <Carousel photos={TEST_IMAGES} title="Test Carousel" />
  );

  expect(container.querySelector('img[alt="Caption 1"]')).toBeInTheDocument();

  const rightArrow = getByRole("button", { name: /right arrow/i });
  fireEvent.click(rightArrow);

  expect(container.querySelector('img[alt="Caption 2"]')).toBeInTheDocument();
});

// Test to ensure left arrow is hidden on the first image
it("hides the left arrow on the first image", () => {
  const { queryByRole } = render(
    <Carousel photos={TEST_IMAGES} title="Test Carousel" />
  );

  expect(
    queryByRole("button", { name: /left arrow/i })
  ).not.toBeInTheDocument();

  expect(queryByRole("button", { name: /right arrow/i })).toBeInTheDocument();
});

// Test to ensure right arrow is hidden on the last image
it("hides the right arrow on the last image", () => {
  const { getByRole, queryByRole } = render(
    <Carousel photos={TEST_IMAGES} title="Test Carousel" />
  );

  const rightArrow = getByRole("button", { name: /right arrow/i });
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(
    queryByRole("button", { name: /right arrow/i })
  ).not.toBeInTheDocument();

  expect(getByRole("button", { name: /left arrow/i })).toBeInTheDocument();
});
