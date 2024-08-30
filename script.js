document.addEventListener('DOMContentLoaded', function() {
    const invoiceBody = document.getElementById('invoice-body');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const addItemButton = document.getElementById('add-item');
    const printButton = document.getElementById('print-invoice');

    // Function to update totals
    function updateTotals() {
        let subtotal = 0;
        const itemTotals = document.querySelectorAll('.item-total');

        itemTotals.forEach(itemTotal => {
            const totalValue = parseFloat(itemTotal.textContent.replace('Rs', '').trim()) || 0;
            subtotal += totalValue;
        });

        const total = subtotal; // No additional tax for subtotal in the footer

        subtotalElement.textContent = `Rs ${subtotal.toFixed(2)}`;
        totalElement.textContent = `Rs ${total.toFixed(2)}`;
    }

    // Function to handle input changes and calculate item total
    function handleInputChange(event) {
        const row = event.target.closest('tr');
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const taxRate = parseFloat(row.querySelector('.item-tax').value) || 0;

        // Calculate item total with tax
        const totalWithoutTax = qty * price;
        const taxAmount = totalWithoutTax * (taxRate / 100);
        const total = totalWithoutTax + taxAmount;

        row.querySelector('.item-total').textContent = `Rs ${total.toFixed(2)}`;
        updateTotals();
    }

    // Add event listeners for input fields
    invoiceBody.addEventListener('input', handleInputChange);

    // Add new row for item
    addItemButton.addEventListener('click', function() {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="item-desc" placeholder="Item Description"></td>
            <td><input type="number" class="item-qty" placeholder="0"></td>
            <td><input type="number" class="item-price" placeholder="0.00"></td>
            <td><input type="number" class="item-tax" placeholder="0.00"></td>
            <td class="item-total">Rs 0.00</td>
        `;
        invoiceBody.appendChild(newRow);
    });

    // Function to print the invoice
    function printInvoice() {
        window.print();
    }

    // Add event listener for the print button
    printButton.addEventListener('click', printInvoice);

    // Initial call to update totals if there are existing items
    updateTotals();
});


