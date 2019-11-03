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
          name: "jane",
          amount: 20,
          description: "test dec"
        },
        {
          name: "john",
          amount: 10,
          description: "test dec"
        },
        {
          name: "john",
          amount: 20,
          description: "test dec"
        }
      ],
      totalAmount: "50"
    };
    const expectedObj = {
      nameAndAmountSpent: {
        jane: 20,
        john: 30
      },
      perHeadAmount: 25
    };
    wrapper = shallow(<SettleResults {...props} />);
    instance = wrapper.instance();
    const spy = jest.spyOn(instance, "calculateAverage");
    instance.calculateAverage([...props.expenses]);
    expect(spy).toHaveReturnedWith(expectedObj);
  });

  it("handles settleUp to handle a user with 0 expense", () => {
    const props = {
      expenses: [
        {
          name: "jane",
          amount: 20,
          description: "test dec"
        },
        {
          name: "dave",
          amount: 0,
          description: "test dec"
        },
        {
          name: "john",
          amount: 70,
          description: "test dec"
        }
      ],
      totalAmount: "90"
    };
    wrapper = shallow(<SettleResults {...props} />);
    instance = wrapper.instance();
    jest.spyOn(instance, "settleUp");
    instance.settleUp([...props.expenses]);
    expect(wrapper.state()).toEqual({
      expenseArr: ["jane owes john 10", "dave owes john 30"],
      avgAmount: 30
    });
  });

  it("handles settleUp to handle a user where his expense is already paid as per Average amount to be shared", () => {
    const props = {
      expenses: [
        {
          name: "jane",
          amount: 30,
          description: "test dec"
        },
        {
          name: "dave",
          amount: 5,
          description: "test dec"
        },
        {
          name: "john",
          amount: 55,
          description: "test dec"
        }
      ],
      totalAmount: "90"
    };
    wrapper = shallow(<SettleResults {...props} />);
    instance = wrapper.instance();
    jest.spyOn(instance, "settleUp");
    instance.settleUp([...props.expenses]);
    expect(wrapper.state()).toEqual({
      expenseArr: ["dave owes john 25.00"],
      avgAmount: 30
    });
  });

  it("handles settleUp condition where the person A has money which can fullfill one debter's complete owned amount and A is still left with some more amout to give", () => {
    const props = {
      expenses: [
        {
          name: "jane",
          amount: 100,
          description: "test dec"
        },
        {
          name: "dave",
          amount: 100,
          description: "test dec"
        },
        {
          name: "john",
          amount: 50,
          description: "test dec"
        }
      ],
      totalAmount: "250"
    };
    wrapper = shallow(<SettleResults {...props} />);
    instance = wrapper.instance();
    jest.spyOn(instance, "settleUp");
    instance.settleUp([...props.expenses]);
    expect(wrapper.state()).toEqual({
      expenseArr: ["john owes jane 16.67", "john owes dave 16.67"],
      avgAmount: 83.33333333333333
    });
  });
});
