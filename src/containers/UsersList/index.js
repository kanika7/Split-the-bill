import React, { Component } from "react";
import SettleResults from "../SettleResults";
import { ADD_EXPENSE } from "../../constants";
import "./styles/index.scss";
import ExpenseList from "../../components/ExpenseList";

class UsersList extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      amount: "",
      description: "",
      expenses: []
    };
  }

  //calculates total amount spent on each render
  calculateSum = () => {
    const { expenses } = this.state;
    const total = expenses.reduce((a, b) => a + (parseInt(b.amount) || 0), 0);
    return total;
  };

  // adds single row for an individual expense
  addExpense = event => {
    event.preventDefault();
    this.setState({
      expenses: [
        ...this.state.expenses,
        {
          name: this.state.name,
          amount: this.state.amount,
          description: this.state.description
        }
      ],
      name: "",
      amount: "",
      description: "",
      isResult: false
    });
  };

  // shows the SettleResults component with split Bill
  splitExpense = () => {
    this.setState({
      isResult: true
    });
  };

  //removes the row onClick of remove button
  removeItem = indx => {
    this.setState(prevState => {
      const { expenses } = prevState;
      expenses.splice(indx, 1);
      return { ...prevState, expenses, isResult: false };
    });
  };

  // handles input changes for user entered fields
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: target.type === "number" ? parseInt(value) : value
    });
  };

  render() {
    const total = this.calculateSum();
    const { isResult, expenses, name, amount, description } = this.state;
    return (
      <div className="content">
        <div className="container">
          <form className="row" onSubmit={this.addExpense}>
            <div className="col-xs-12 col-lg-3">
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                required
                placeholder="Who Paid"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-xs-12 col-lg-3">
              <input
                type="number"
                name="amount"
                value={amount}
                className="form-control"
                placeholder="Amount"
                required
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-xs-12 col-lg-3">
              <input
                type="text"
                name="description"
                value={description}
                className="form-control"
                placeholder="Description"
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary action-wrapper btn-primary" disabled={!name}>
              {ADD_EXPENSE}
            </button>
          </form>

          {expenses && expenses.length ? (
            <ExpenseList
              total={total}
              expenses={expenses}
              splitExpense={this.splitExpense}
              removeItem={this.removeItem}
            />
          ) : null}

          {isResult && <SettleResults expenses={expenses} totalAmount={total} />}
        </div>
      </div>
    );
  }
}

export default UsersList;
