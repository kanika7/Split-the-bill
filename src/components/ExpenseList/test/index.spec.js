import React from "react";
import { shallow } from "enzyme";
import ExpenseList from "../index";

describe("<ExpenseList /> Test Suits", () => {
  let wrapper;
  const props = {
    expenses: [
      {
        username: "test abc",
        amount: "20",
        description: "test dec"
      }
    ],
    splitExpense: jest.fn(),
    removeItem: jest.fn(),
    total: "200"
  };

  function renderShallow() {
    wrapper = shallow(<ExpenseList {...props} />);
  }

  it("renders snapshot", () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("handles removeItem prop method on click of remove", () => {
    const spy = jest.spyOn(props, "removeItem");
    renderShallow();
    wrapper.find(".close").simulate("click");
    expect(spy).toBeCalled();
  });
});
