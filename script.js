document.querySelector('#convertButton').addEventListener('click', () => {
	const amount = document.querySelector('#amount').value;
	const currency = document.querySelector('#currency').value;
	const loader = document.querySelector('#loader');
	const result = document.querySelector('#result');

	loader.style.display = 'block';
	result.textContent = '';

	fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`)
		.then(response => response.json())
		.then(data => {
			const rate = data.rates[0].mid;
			const convertedAmount = (amount * rate).toFixed(2);
			result.textContent = `${amount} ${currency} TO ${convertedAmount} PLN`;
			loader.style.display = 'none';
		})
		.catch(() => {
			result.textContent = 'Wystąpił błąd. Spróbuj ponownie.';
			loader.style.display = 'none';
		});
});
