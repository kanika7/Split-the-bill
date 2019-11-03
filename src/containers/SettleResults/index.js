import React, { Component } from "react";
import PropTypes from "prop-types";
import { OWES, AVG_EXPENSE } from "../../constants";

import "./styles/index.scss";

class SettleResults extends Component {
  static debtArr = [];
  constructor(props) {
    super(props);
    this.state = {
      expenseArr: [],
      avgAmount: ""
    };
  }

  componentDidMount() {
    this.settleUp(this.props.expenses);
  }

  // Calculating average amount for each user.
  calculateAverage = entries => {
    const nameAndAmountSpent = {};
    const { totalAmount } = this.props;
    let totalUsers = 0;
    entries.forEach(entry => {
      if (!nameAndAmountSpent[entry.name]) {
        nameAndAmountSpent[entry.name] = entry.amount;
        totalUsers++;
      } else {
        nameAndAmountSpent[entry.name] += entry.amount;
      }
    });
    const perHeadAmount = totalAmount / totalUsers;
    return { nameAndAmountSpent, perHeadAmount };
  };

  // called for executing split of bills
  settleUp = entries => {
    const { perHeadAmount, nameAndAmountSpent } = this.calculateAverage(entries);
    const result = [];
    let str = "";

    for (let name in nameAndAmountSpent) {
      nameAndAmountSpent[name] -= perHeadAmount;
    }
    for (let i in nameAndAmountSpent) {
      if (nameAndAmountSpent[i] === 0) continue;
      // will only run for users who have to get money back
      if (nameAndAmountSpent[i] > 0) {
        for (let j in nameAndAmountSpent) {
          //will run for users who have to give the money to others
          if (nameAndAmountSpent[j] < 0) {
            if (nameAndAmountSpent[i] === -nameAndAmountSpent[j]) {
              str = `${j} ${OWES} ${i} ${nameAndAmountSpent[i].toFixed(2)}`;
              result.push(str);
              nameAndAmountSpent[i] = 0;
              nameAndAmountSpent[j] = 0;
            } else if (nameAndAmountSpent[i] > -nameAndAmountSpent[j]) {
              str = `${j} ${OWES} ${i} ${-nameAndAmountSpent[j].toFixed(2)}`;
              result.push(str);
              nameAndAmountSpent[i] -= nameAndAmountSpent[j];
              nameAndAmountSpent[j] = 0;
            } else {
              str = `${j} ${OWES} ${i} ${nameAndAmountSpent[i].toFixed(2)}`;
              result.push(str);
              nameAndAmountSpent[j] += nameAndAmountSpent[i];
              nameAndAmountSpent[i] = 0;
            }
          }
          if (nameAndAmountSpent[i] === 0) break;
        }
      }
    }

    this.setState({
      expenseArr: [...result],
      avgAmount: perHeadAmount
    });
  };

  render() {
    const { expenseArr, avgAmount } = this.state;

    return (
      <ul className="results-container">
        {avgAmount && (
          <li className="list-item">
            <span className="col-xs-12 col-lg-4">{`${AVG_EXPENSE} ${avgAmount.toFixed(2)}`}</span>
          </li>
        )}
        {expenseArr.map((exp, index) => (
          <li key={index} className="list-item">
            <span className="col-xs-12 col-lg-4">{exp}</span>
          </li>
        ))}
      </ul>
    );
  }
}

SettleResults.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  totalAmount: PropTypes.number.isRequired
};

export default SettleResults;
