const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const salesTable = document.getElementById("salesTable");
const productForm = document.getElementById("productForm");

function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    salesTable.querySelectorAll("tr").forEach(function (row) {
        const name = row.cells[0].textContent.toLowerCase();
        const status = row.cells[2].textContent;

        const matchesSearch = name.includes(searchText);
        const matchesStatus =
            selectedStatus === "all" || status === selectedStatus;

        row.style.display =
            matchesSearch && matchesStatus ? "" : "none";
    });
}

searchInput.addEventListener("input", filterProducts);
statusFilter.addEventListener("change", filterProducts);

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const sales = Number(document.getElementById("productSales").value);
    const status = document.getElementById("productStatus").value;

    if (!name || sales < 0) return;

    const row = salesTable.insertRow();

    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent =
        "$" + sales.toLocaleString("en-US");
    row.insertCell(2).textContent = status;

    productForm.reset();
    filterProducts();
});