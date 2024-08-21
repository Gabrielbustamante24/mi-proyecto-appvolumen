document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('productForm');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    let productCount = 0;

    // Convierte la cantidad a la unidad base (cc o gr)
    function convertToBaseUnit(quantity, unit) {
        const conversionRates = {
            cc: 1,
            ml: 1,
            l: 1000,
            gr: 1,
            kg: 1000
        };
        return quantity * conversionRates[unit];
    }

    // Añade un producto a la tabla
    function addProduct() {
        const cost = parseFloat(document.getElementById('cost').value);
        const quantity = parseFloat(document.getElementById('quantity').value);
        const unit = document.getElementById('unit').value;

        if (isNaN(cost) || isNaN(quantity) || cost <= 0 || quantity <= 0) {
            alert("Por favor ingrese valores válidos mayores a cero.");
            return;
        }

        const baseQuantity = convertToBaseUnit(quantity, unit);
        const costPerUnit = cost / baseQuantity;

        productCount++;
        const row = productTable.insertRow();
        row.insertCell().textContent = productCount;
        row.insertCell().textContent = cost.toFixed(2);
        row.insertCell().textContent = quantity;
        row.insertCell().textContent = unit;
        row.insertCell().textContent = costPerUnit.toFixed(2);

        highlightCheapest();
    }

    // Destaca el producto más económico
    function highlightCheapest() {
        const rows = productTable.getElementsByTagName('tr');
        let minCost = Infinity;
        let minRowIndex = -1;

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const costPerUnit = parseFloat(cells[4].textContent);

            if (costPerUnit < minCost) {
                minCost = costPerUnit;
                minRowIndex = i;
            }
        }

        for (let i = 1; i < rows.length; i++) {
            rows[i].classList.remove('highlight');
        }

        if (minRowIndex !== -1) {
            rows[minRowIndex].classList.add('highlight');
        }
    }

    // Limpia la tabla
    function resetTable() {
        // Elimina todas las filas de la tabla, excepto el encabezado
        while (productTable.rows.length > 0) {
            productTable.deleteRow(0);
        }
        // Reinicia el contador de productos
        productCount = 0;
    }

    // Evento para agregar producto al hacer submit en el formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addProduct();
    });

    // Evento para limpiar la tabla al hacer clic en el botón
    document.getElementById('resetButton').addEventListener('click', resetTable);
});
