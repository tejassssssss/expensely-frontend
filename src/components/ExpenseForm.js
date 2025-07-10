import React from "react";
import { FaPlus, FaTrash, FaFileExport } from "react-icons/fa";
import "./ExpenseForm.css";

const ExpenseForm = ({
  date,
  category,
  amount,
  description,
  onDateChange,
  onCategoryChange,
  onAmountChange,
  onDescriptionChange,
  onAdd,
  onDelete,
  onExport,
}) => {
  return (
    <div className="expense-form">
      <div className="row">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={onDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={onCategoryChange}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Rent">Rent</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={onAmountChange}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={onDescriptionChange}
            placeholder="Enter description"
          />
        </div>
      </div>

      <div className="buttons">
        <button className="btn blue" onClick={onAdd}>
          <FaPlus /> Add
        </button>
        <button className="btn red" onClick={onDelete}>
          <FaTrash /> Delete
        </button>
        <button className="btn green" onClick={onExport}>
          <FaFileExport /> Export
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
