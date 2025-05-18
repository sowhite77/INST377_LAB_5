window.addEventListener('DOMContentLoaded', function() {
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    const form = document.getElementById('currency-form');
    const resultDiv = document.getElementById('result');
    
    fetch('https://api.frankfurter.app/currencies')
        .then(response => response.json())
        .then(currencies => {
            for (const code in currencies) {
                const option1 = document.createElement('option');
                option1.value = code;
                option1.textContent = code + ' - ' + currencies[code];
                fromSelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = code;
                option2.textContent = code + ' - ' + currencies[code];
                toSelect.appendChild(option2);
            }
        });
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const from = fromSelect.value;
        const to = toSelect.value;
        const amount = document.getElementById('amount').value;
        if (from === to) {
            alert('Please select two different currencies.');
            return;
        }
        resultDiv.textContent = 'Loading...';
        fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
            .then(response => response.json())
            .then(data => {
                resultDiv.textContent = amount + ' ' + from + ' = ' + data.rates[to] + ' ' + to;
            })
            .catch(() => {
                resultDiv.textContent = 'Conversion failed.';
            });
    });
});
