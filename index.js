import store from "./redux/store";
import { setValue, increment, decrement } from "./redux/counter";
import { getCoctails, getCoctailsById } from "./redux/coctail";

/**
 * COUNTERZONE
 */

// UITLEZEN DATA
function updateCounterValue() {
  const { counter } = store.getState().counterState;
  document.getElementById("counter").innerText = counter;
  document.getElementById("counterinput").value = counter;
  getCoctailsById(counter);
}

updateCounterValue();

// AANPASSINGEN BIJ VERANDERING STATE

store.subscribe(updateCounterValue);

//UITSTUREN ACTION

document.getElementById("inc").onclick = () => store.dispatch(increment());

document.getElementById("dec").onclick = () => store.dispatch(decrement());

document.getElementById("counterinput").oninput = (e) =>
  store.dispatch(setValue(e.target.value));

/**
 * COCTAILZONE
 */

document.getElementById("coctailform").onsubmit = (e) => {
  e.preventDefault();
  store.dispatch(
    getCoctails(document.querySelector("#coctailform input").value)
  );
  document.querySelector("#coctailform input").value = "";
};

function coctailRender() {
  const { ingredient, loading, coctails, id } = store.getState().coctailState;

  document.getElementById("ingredient").innerText = ingredient;

  if (loading) {
    document.getElementById("loading").style.display = "block";
  } else {
    document.getElementById("loading").style.display = "none";
  }

  if (coctails) {
    document.getElementById("coctailgrid").innerHTML = coctails
      .map(
        (coctail) =>
          `<li><a href="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctail.strDrink}" target="_blank">${coctail.strDrink}</a></li>`
      )
      .join("");
  } else {
    document.getElementById("coctailgrid").style.display = "none";
  }

  // if (id) {
  //   document.getElementById("coctailgrid").innerHTML = coctails
  //     .map(
  //       (coctail) =>
  //         `<li><a href="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctail.strDrink}" target="_blank">${coctail.strDrink}</a></li>`
  //     )
  //     .join("");
  // } else {
  //   document.getElementById("coctailgrid").style.display = "none";
  // }
}

coctailRender();

store.subscribe(coctailRender);
