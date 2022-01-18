import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "../components/Blog";

describe("testing the blog component", () => {
  let component;
  const mockClick = jest.fn();
  beforeEach(() => {
    const newBlog = {
      author: "Mike",
      likes: 1,
      title: "Why testing is important",
      url: "whocares.com",
      id: "1",
      user: {
        username: "help me",
      },
    };
    component = render(<Blog blog={newBlog} updateLikes={mockClick} />);
  });

  test("only author and title by default", () => {
    const author = component.container.querySelector(".blog-author");
    const title = component.container.querySelector(".blog-title");
    const likes = component.container.querySelector(".blog-likes");
    const url = component.container.querySelector(".blog-url");

    expect(author).toBeDefined();
    expect(title).toBeDefined();
    expect(likes).toBeNull();
    expect(url).toBeNull();
  });

  test("likes and url is shown when details is clicked", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const author = component.container.querySelector(".blog-author");
    const title = component.container.querySelector(".blog-title");
    const likes = component.container.querySelector(".blog-likes");
    const url = component.container.querySelector(".blog-url");

    expect(author).toBeDefined();
    expect(title).toBeDefined();
    expect(likes).toBeDefined();
    expect(url).toBeDefined();
  });

  test("clicking like twice makes two calls", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockClick.mock.calls).toHaveLength(2);
  });
});
