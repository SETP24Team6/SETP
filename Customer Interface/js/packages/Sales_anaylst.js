document.getElementById('date-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    fetch('/get-sales-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `start_date=${startDate}&end_date=${endDate}`
    })
    .then(response => response.json())
    .then(data => {
        const tableContainer = document.getElementById('table-container');
        const tbody = document.getElementById('sales-table').querySelector('tbody');
        tbody.innerHTML = '';
        data.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order[0]}</td>
                <td>${order[1]}</td>
                <td>${order[2]}</td>
                <td>${order[3]}</td>
            `;
            tbody.appendChild(row);
        });
        tableContainer.classList.remove('hidden');
    });
});