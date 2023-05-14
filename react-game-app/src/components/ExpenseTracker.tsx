import { ChangeEvent, useState } from "react";
import Expense from "../models/expense";
import categories from "../models/categories";

interface props {
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
  onFilterCategory: (category: string) => void;
}
function ExpenseTracker({
  expenses,
  onDeleteExpense,
  onFilterCategory,
}: props) {
  return (
    <div className="m-5">
      <select
        className="form-select mb-3"
        onChange={(e) => onFilterCategory(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            return (
              <tr>
                <th scope="row">{expense.description}</th>
                <td>{`$${(Math.round(expense.amount * 100) / 100).toFixed(
                  2
                )}`}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <td>Total</td>
          <td>
            $
            {expenses
              .reduce((acc, expense) => acc + expense.amount, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tfoot>
      </table>
    </div>
  );
}

export default ExpenseTracker;
