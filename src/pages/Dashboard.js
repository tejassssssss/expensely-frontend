// import React, { useState, useEffect } from "react";
// import {
//   getExpenses,
//   addExpense,
//   deleteExpense,
//   exportExpenses,
//   editExpense,
// } from "../services/expenseService";
// import {
//   FaPlus,
//   FaTrashAlt,
//   FaRegEdit,
//   FaDownload,
//   FaSun,
//   FaMoon,
// } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [filteredExpenses, setFilteredExpenses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRowId, setSelectedRowId] = useState(null);
//   const [theme, setTheme] = useState("dark");

//   const [formData, setFormData] = useState({
//     date: "",
//     category: "",
//     amount: "",
//     description: "",
//   });

//   useEffect(() => {
//     fetchAndSetExpenses();
//   }, []);

//   useEffect(() => {
//     const lower = searchTerm.toLowerCase();
//     const filtered = expenses.filter((e) => {
//       const category = typeof e.category === "string" ? e.category.toLowerCase() : "";
//       const description = typeof e.title === "string" ? e.title.toLowerCase() : "";
//       return category.includes(lower) || description.includes(lower);
//     });
//     setFilteredExpenses(filtered);
//   }, [searchTerm, expenses]);

//   const fetchAndSetExpenses = async () => {
//     try {
//       const data = await getExpenses();
//       setExpenses(data);
//       setFilteredExpenses(data);
//     } catch {
//       toast.error("Failed to fetch expenses.");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleThemeToggle = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   const handleRowClick = (id) => {
//     if (id === selectedRowId) {
//       setSelectedRowId(null);
//       setFormData({ date: "", category: "", amount: "", description: "" });
//     } else {
//       const selected = expenses.find((e) => e.id === id);
//       if (selected) {
//         setSelectedRowId(id);
//         setFormData({
//           date: selected.date,
//           category: selected.category,
//           amount: selected.amount,
//           description: selected.title,
//         });
//       }
//     }
//   };

//   const handleAdd = async () => {
//     if (selectedRowId) {
//       toast.warning("You're editing. Click Update instead.");
//       return;
//     }
//     if (!formData.date || !formData.category || !formData.amount) {
//       toast.warning("Please fill in all fields.");
//       return;
//     }
//     try {
//       const response = await addExpense({
//         title: formData.description,
//         amount: formData.amount,
//         category: formData.category,
//         date: formData.date,
//       });

//       if (response.success) {
//         await fetchAndSetExpenses();
//         setFormData({ date: "", category: "", amount: "", description: "" });
//         toast.success("Expense added!");
//       } else {
//         toast.error("Failed to add expense.");
//       }
//     } catch {
//       toast.error("Something went wrong while adding.");
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedRowId) return toast.warning("Select a row to delete.");
//     const response = await deleteExpense(selectedRowId);
//     if (response.success) {
//       await fetchAndSetExpenses();
//       setSelectedRowId(null);
//       toast.success("Deleted!");
//     } else {
//       toast.error("Delete failed.");
//     }
//   };

//   const handleUpdate = async () => {
//     if (!selectedRowId) return toast.warning("Select a row to update.");
//     const response = await editExpense(selectedRowId, {
//       title: formData.description,
//       amount: formData.amount,
//       category: formData.category,
//       date: formData.date,
//     });
//     if (response.success) {
//       await fetchAndSetExpenses();
//       setSelectedRowId(null);
//       toast.success("Updated!");
//     } else {
//       toast.error("Update failed.");
//     }
//   };

//   const handleExport = async () => {
//     try {
//       await exportExpenses();
//       toast.success("CSV downloaded!");
//     } catch {
//       toast.error("Export failed.");
//     }
//   };

//   return (
//     <div className={`dashboard-container ${theme}`}>
//       <ToastContainer position="top-center" autoClose={2000} theme="colored" />
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <h2>Expensely</h2>
//           <p className="tagline">Take charge of every rupee.</p>
//         </div>
//         <nav>
//           <button className="nav-link active">Dashboard</button>
//           <button className="nav-link">Reports</button>
//           <button className="nav-link">Settings</button>
//         </nav>
//         <div className="theme-toggle" onClick={handleThemeToggle}>
//           {theme === "dark" ? <FaSun /> : <FaMoon />}
//         </div>
//       </aside>

//       <main className="main-content">
//         <div className="top-bar">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={handleExport}>
//             <FaDownload />
//           </button>
//         </div>

//         <div className="form-section">
//           <input type="date" name="date" value={formData.date} onChange={handleChange} />
//           <select name="category" value={formData.category} onChange={handleChange}>
//             <option value="">Category</option>
//             <option value="Food">Food</option>
//             <option value="Transport">Transport</option>
//             <option value="Rent">Rent</option>
//             <option value="Bills">Bills</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Shopping">Shopping</option>
//             <option value="Other">Other</option>
//           </select>
//           <input
//             type="number"
//             name="amount"
//             placeholder="Amount"
//             value={formData.amount}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//           <button onClick={handleAdd}><FaPlus /></button>
//           <button disabled={!selectedRowId} onClick={handleUpdate}><FaRegEdit /></button>
//           <button disabled={!selectedRowId} onClick={handleDelete}><FaTrashAlt /></button>
//         </div>

//         <div className="table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>No.</th>
//                 <th>Date</th>
//                 <th>Category</th>
//                 <th>Amount</th>
//                 <th>Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredExpenses.map((exp, idx) => (
//                 <tr
//                   key={exp.id}
//                   className={selectedRowId === exp.id ? "selected" : ""}
//                   onClick={() => handleRowClick(exp.id)}
//                 >
//                   <td data-label="No.">{idx + 1}</td>
//                   <td data-label="Date">{exp.date}</td>
//                   <td data-label="Category">{exp.category}</td>
//                   <td data-label="Amount">₹{exp.amount}</td>
//                   <td data-label="Description">{exp.title}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  exportExpenses,
  editExpense,
} from "../services/expenseService";
import {
  FaPlus,
  FaTrashAlt,
  FaRegEdit,
  FaDownload,
  FaSun,
  FaMoon,
  FaBars,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    fetchAndSetExpenses();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = expenses.filter((e) => {
      const category = typeof e.category === "string" ? e.category.toLowerCase() : "";
      const description = typeof e.title === "string" ? e.title.toLowerCase() : "";
      return category.includes(lower) || description.includes(lower);
    });
    setFilteredExpenses(filtered);
  }, [searchTerm, expenses]);

  const fetchAndSetExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
      setFilteredExpenses(data);
    } catch {
      toast.error("Failed to fetch expenses.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleRowClick = (id) => {
    if (id === selectedRowId) {
      setSelectedRowId(null);
      setFormData({ date: "", category: "", amount: "", description: "" });
    } else {
      const selected = expenses.find((e) => e.id === id);
      if (selected) {
        setSelectedRowId(id);
        setFormData({
          date: selected.date,
          category: selected.category,
          amount: selected.amount,
          description: selected.title,
        });
      }
    }
  };

  const handleAdd = async () => {
    if (selectedRowId) {
      toast.warning("You're editing. Click Update instead.");
      return;
    }
    if (!formData.date || !formData.category || !formData.amount) {
      toast.warning("Please fill in all fields.");
      return;
    }
    try {
      const response = await addExpense({
        title: formData.description,
        amount: formData.amount,
        category: formData.category,
        date: formData.date,
      });

      if (response.success) {
        await fetchAndSetExpenses();
        setFormData({ date: "", category: "", amount: "", description: "" });
        toast.success("Expense added!");
      } else {
        toast.error("Failed to add expense.");
      }
    } catch {
      toast.error("Something went wrong while adding.");
    }
  };

  const handleDelete = async () => {
    if (!selectedRowId) return toast.warning("Select a row to delete.");
    const response = await deleteExpense(selectedRowId);
    if (response.success) {
      await fetchAndSetExpenses();
      setSelectedRowId(null);
      toast.success("Deleted!");
    } else {
      toast.error("Delete failed.");
    }
  };

  const handleUpdate = async () => {
    if (!selectedRowId) return toast.warning("Select a row to update.");
    const response = await editExpense(selectedRowId, {
      title: formData.description,
      amount: formData.amount,
      category: formData.category,
      date: formData.date,
    });
    if (response.success) {
      await fetchAndSetExpenses();
      setSelectedRowId(null);
      toast.success("Updated!");
    } else {
      toast.error("Update failed.");
    }
  };

  const handleExport = async () => {
    try {
      await exportExpenses();
      toast.success("CSV downloaded!");
    } catch {
      toast.error("Export failed.");
    }
  };

  return (
    <div className={`dashboard-container ${theme}`}>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />

      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="left">
          <FaBars className="hamburger" onClick={() => setMenuOpen(!menuOpen)} />
          <div className="title-tagline">
            <h2>Expensely</h2>
            <p className="tagline">Take charge of every rupee.</p>
          </div>
        </div>
      </header>

      {/* Sidebar (Desktop + Mobile) */}
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        {/* Show title & tagline in desktop too */}
        <div className="sidebar-header-desktop">
          <h2>Expensely</h2>
          <p className="tagline">Take charge of every rupee.</p>
        </div>
        <nav>
          <button className="nav-link active">Dashboard</button>
          <button className="nav-link">Reports</button>
          <button className="nav-link">Settings</button>
          <div className="theme-toggle" onClick={handleThemeToggle}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </div>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="main-content">
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleExport}>
            <FaDownload />
          </button>
        </div>

        <div className="form-section">
          <div className="row">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{ colorScheme: "dark" }}
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Rent">Rent</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="button-row">
            <button onClick={handleAdd}><FaPlus /></button>
            <button disabled={!selectedRowId} onClick={handleUpdate}><FaRegEdit /></button>
            <button disabled={!selectedRowId} onClick={handleDelete}><FaTrashAlt /></button>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp, idx) => (
                <tr
                  key={exp.id}
                  className={selectedRowId === exp.id ? "selected" : ""}
                  onClick={() => handleRowClick(exp.id)}
                >
                  <td>{idx + 1}</td>
                  <td>{exp.date}</td>
                  <td>{exp.category}</td>
                  <td>₹{exp.amount}</td>
                  <td>{exp.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


