const BASE_URL = "http://127.0.0.1:5000/api";

// Get all expenses
export async function getExpenses() {
  try {
    const res = await fetch(`${BASE_URL}/expenses`);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch expenses: ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getExpenses:", error.message);
    throw error;
  }
}

// Add a new expense
export async function addExpense(expense) {
  try {
    const res = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to add expense: ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in addExpense:", error.message);
    throw error;
  }
}

// Delete an expense
export async function deleteExpense(id) {
  try {
    const res = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to delete expense: ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in deleteExpense:", error.message);
    throw error;
  }
}

// Export expenses as CSV
export async function exportExpenses() {
  try {
    const res = await fetch(`${BASE_URL}/export`, {
      method: "GET",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to export CSV: ${errorText}`);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error in exportExpenses:", error.message);
    throw error;
  }
}

// Edit an existing expense
export async function editExpense(id, updatedExpense) {
  try {
    const res = await fetch(`${BASE_URL}/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExpense),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update expense: ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in editExpense:", error.message);
    throw error;
  }
}
