import React from "react";
import { shallow } from "enzyme";
import Header from "../index";

describe("<Header /> Test Suits", () => {
  let wrapper;
  function renderShallow() {
    wrapper = shallow(<Header />);
  }

  it("renders snapshot", () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });
});
