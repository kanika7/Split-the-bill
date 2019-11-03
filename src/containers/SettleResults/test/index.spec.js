import React from "react";
import { shallow } from "enzyme";
import SettleResults from "../index";

describe("<SettleResults /> Test Suit", () => {
  let wrapper;
  let instance;
  const props = {
    expenses: [
      {
        username: "test abc",
        amount: "20",
        description: "test dec"
      }
    ],
    totalAmount: "200"
  };

  function renderShallow() {
    wrapper = shallow(<SettleResults {...props} />);
  }

  it("renders snapshot", () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("handles calculateAverage to find the total and per head expense", () => {
    const props = {
      expenses: [
        {
          username: "jane",
          amount: "20",
          description: "test dec"
        },
        {
          username: "jane",
          amount: "40",
          description: "test dec"
        },
        {
          username: "john",
          amount: "10",
          description: "test dec"
        }
      ],
      totalAmount: "200"
    };
    wrapper = shallow(<SettleResults {...props} />);
    instance = wrapper.instance();
    instance.calculateAverage();
    // expect(instance.)
  });
});
