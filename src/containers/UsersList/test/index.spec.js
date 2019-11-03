import React from "react";
import { shallow } from "enzyme";
import UsersList from "../index";
import SettleResults from "../../SettleResults";

describe("<UsersList /> Test Suits", () => {
  let wrapper;
  let instance;
  function renderShallow() {
    wrapper = shallow(<UsersList />);
    instance = wrapper.instance();
  }

  it("renders snapshot", () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("handle input values change by calling handleInputChange", () => {
    let event = {
      target: {
        name: "name",
        value: "abc"
      },
      preventDefault: () => {}
    };
    renderShallow();
    wrapper
      .find(".form-control")
      .first()
      .simulate("click");
    instance.handleInputChange(event);
    expect(wrapper.state()).toStrictEqual({
      amount: "",
      description: "",
      expenses: [],
      name: "abc"
    });

    event = {
      target: {
        name: "amount",
        value: "200"
      },
      preventDefault: () => {}
    };
    renderShallow();
    wrapper
      .find(".form-control")
      .at(2)
      .simulate("click");
    instance.handleInputChange(event);
    expect(wrapper.state()).toStrictEqual({
      amount: "200",
      description: "",
      expenses: [],
      name: ""
    });

    event = {
      target: {
        name: "description",
        value: "test description"
      },
      preventDefault: () => {}
    };
    renderShallow();
    wrapper
      .find(".form-control")
      .last()
      .simulate("click");
    instance.handleInputChange(event);
    expect(wrapper.state()).toStrictEqual({
      amount: "",
      description: "test description",
      expenses: [],
      name: ""
    });
  });

  it("handles addExpense to add individual expenses", () => {
    const event = {
      preventDefault: () => {}
    };
    wrapper.setState({
      name: "abc",
      amount: 20,
      description: "test desc"
    });
    wrapper.update();
    instance.addExpense(event);
    expect(wrapper.state()).toStrictEqual({
      expenses: [
        {
          name: "abc",
          amount: 20,
          description: "test desc"
        }
      ],
      name: "",
      amount: "",
      description: "",
      isResult: false
    });
  });

  it("handles removeItem and removes item from expenses array", () => {
    renderShallow();
    wrapper.setState({
      expenses: [
        {
          name: "abc",
          amount: 20,
          description: "test desc1"
        },
        {
          name: "def",
          amount: 50,
          description: "test desc2"
        }
      ]
    });
    // wrapper.update();
    jest.spyOn(instance, "removeItem");
    instance.removeItem(0);
    expect(wrapper.state()).toStrictEqual({
      expenses: [
        {
          name: "def",
          amount: 50,
          description: "test desc2"
        }
      ],
      isResult: false,
      name: "",
      amount: "",
      description: ""
    });
  });

  it("handles splitExpense and updates State to show Split Bill", () => {
    renderShallow();
    jest.spyOn(instance, "splitExpense");
    instance.splitExpense();
    expect(wrapper.state()).toStrictEqual({
      expenses: [],
      isResult: true,
      name: "",
      amount: "",
      description: ""
    });
    expect(<SettleResults />).toBeDefined();
  });
});
