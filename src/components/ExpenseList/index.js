import React from "react";
import PropTypes from "prop-types";
import { PAGE_TITLE, TOTAL_EXPENSE, SERIALNO, WHOPAID, AMOUNTPAID, DESC } from "../../constants";
import "./styles/index.scss";

const ExpenseList = ({ expenses, total, splitExpense, removeItem }) => (
  <div className="expense-list">
    <ul className="list-wrap">
      <li className="list-item headings">
        <span className="col-xs-12 col-lg-2 d-none d-md-block">{SERIALNO}</span>
        <span className="col-xs-12 col-lg-2">{WHOPAID}</span>
        <span className="col-xs-12 col-lg-2">{AMOUNTPAID}</span>
        <span className="col-xs-12 col-lg-2">{DESC}</span>
      </li>
      {expenses.map((exp, index) => (
        <li className="list-item" key={index}>
          <span className="col-xs-12 col-lg-2 d-none d-md-block">{index + 1}</span>
          <span className="col-xs-12 col-lg-2">{exp.name}</span>
          <span className="col-xs-12 col-lg-2">{exp.amount}</span>
          <span className="col-xs-12 col-lg-2">{exp.description}</span>
          <button type="button" className="close" aria-label="Close" onClick={() => removeItem(index)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </li>
      ))}
      <li className="list-item">
        <span className="col-xs-12 col-lg-3">
          {TOTAL_EXPENSE} : {total}
        </span>
      </li>
    </ul>
    <button type="submit" className="btn btn-primary action-wrapper btn-primary" onClick={splitExpense}>
      {PAGE_TITLE}
    </button>
  </div>
);

ExpenseList.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  splitExpense: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

export default ExpenseList;
