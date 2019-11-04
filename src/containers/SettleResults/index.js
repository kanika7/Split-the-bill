import React, { Component } from "react";
import PropTypes from "prop-types";
import { OWES, AVG_EXPENSE } from "../../constants";

import "./styles/index.scss";

class SettleResults extends Component {
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
    for (let creditorName in nameAndAmountSpent) {
      if (nameAndAmountSpent[creditorName] === 0) continue;
      // will only run for users who have to get money back
      if (nameAndAmountSpent[creditorName] > 0) {
        for (let debtorName in nameAndAmountSpent) {
          //will run for users who have to give the money to others
          if (nameAndAmountSpent[debtorName] < 0) {
            if (nameAndAmountSpent[creditorName] === -nameAndAmountSpent[debtorName]) {
              str = `${debtorName} ${OWES} ${creditorName} ${nameAndAmountSpent[creditorName].toFixed(2)}`;
              result.push(str);
              nameAndAmountSpent[creditorName] = 0;
              nameAndAmountSpent[debtorName] = 0;
            } else if (nameAndAmountSpent[creditorName] > -nameAndAmountSpent[debtorName]) {
              str = `${debtorName} ${OWES} ${creditorName} ${-nameAndAmountSpent[debtorName].toFixed(2)}`;
              result.push(str);
              nameAndAmountSpent[creditorName] -= nameAndAmountSpent[debtorName];
              nameAndAmountSpent[debtorName] = 0;
            } else {
              str = `${debtorName} ${OWES} ${creditorName} ${nameAndAmountSpent[creditorName].toFixed(2)}`;
              result.push(str);
              nameAndAmountSpent[debtorName] += nameAndAmountSpent[creditorName];
              nameAndAmountSpent[creditorName] = 0;
            }
          }
          if (nameAndAmountSpent[creditorName] === 0) break;
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
