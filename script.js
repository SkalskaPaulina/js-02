document.addEventListener("DOMContentLoaded", () => {
  const amountElement = document.querySelector("#amount");
  const loaderElement = document.querySelector("#loader");
  const resultElement = document.querySelector("#result");

  amountElement.addEventListener("change", () =>
    amountElement.classList.remove("is-invalid")
  );

  amountElement.addEventListener("keydown", () =>
    amountElement.classList.remove("is-invalid")
  );

  document
    .querySelector("#form-currency")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.target).entries());

      if (!formData.amount || formData.amount <= 0) {
        amountElement.classList.add("is-invalid");
        return;
      }

      loaderElement.style.display = "block";
      resultElement.textContent = "";

      fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${formData.currency}/?format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          const rate = data.rates[0].mid;
          const convertedAmount = (formData.amount * rate).toFixed(2);
          resultElement.textContent = `${formData.amount} ${formData.currency} TO ${convertedAmount} PLN`;
        })
        .catch(() => {
          resultElement.textContent = "Wystąpił błąd. Spróbuj ponownie.";
        })
        .finally(() => {
          loaderElement.style.display = "none";
        });
    });
});
