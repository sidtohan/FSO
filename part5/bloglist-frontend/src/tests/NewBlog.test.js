import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateNew from "../components/CreateNew";

describe("testing the new blog form", () => {
  test("details are passed properly", async () => {
    let component;
    const mockCreateBlog = jest.fn();
    component = render(<CreateNew createBlog={mockCreateBlog} />);

    const title = component.container.querySelector(".title");
    const author = component.container.querySelector(".author");
    const url = component.container.querySelector(".url");

    fireEvent.change(title, {
      target: {
        value: "Cuphead is a good game",
      },
    });
    fireEvent.change(author, {
      target: {
        value: "Markiplier",
      },
    });
    fireEvent.change(url, {
      target: {
        value: "https://fakeblogsite.com/4",
      },
    });
    const form = component.container.querySelector("form");
    fireEvent.submit(form);

    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
      title: "Cuphead is a good game",
      author: "Markiplier",
      url: "https://fakeblogsite.com/4",
    });
  });
});
