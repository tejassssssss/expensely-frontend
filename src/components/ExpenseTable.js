import React from "react";
import "./ExpenseTable.css";

const ExpenseTable = ({
  expenses,
  selectedId,
  onRowSelect,
  onSelectAll,
  selectedAll,
}) => {
  const handleSelectAll = () => {
    onSelectAll(); // parent should manage toggle logic
  };

  return (
    <div className="expense-table">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedAll}
              />
            </th>
            <th>No.</th>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty">
                No expenses found.
              </td>
            </tr>
          ) : (
            expenses.map((expense, index) => (
              <tr
                key={expense.id}
                className={selectedId === expense.id ? "selected" : ""}
                onClick={() => onRowSelect(expense.id)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedId === expense.id}
                    readOnly
                  />
                </td>
                <td>{index + 1}</td>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>₹{Number(expense.amount).toFixed(2)}</td>
                <td>{expense.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
