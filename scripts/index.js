const calculatorForm = document.querySelector(".calculator__form"); // переменная формы
const formulaButtons = document.querySelectorAll(".formula__button[data-goto]"); // переменная кнопок
const countButton = document.querySelector(".calculator__button[data-goto]"); // переменная кнопки расчета
const formulas = document.querySelectorAll(
  ".calculator__radio-button_type_formula"
); // переменная радиокнопок выбора формул
const sources = document.querySelectorAll(
  ".calculator__radio-button_type_source"
); // переменная радиокнопок выбора цели
const genders = document.querySelectorAll(
  ".calculator__radio-button_type_gender"
); // переменная радиокнопок выбора пола
const coefs = document.querySelectorAll(".calculator__radio-button_type_coef"); // переменная радиокнопок выбора коэффициента
const weightInput = document.querySelector(".calculator__input_type_weight"); // переменная инпута веса
const heightInput = document.querySelector(".calculator__input_type_height"); // переменная инпута роста
const ageInput = document.querySelector(".calculator__input_type_age"); // переменная инпута возраста
const result = document.querySelector(".result__block"); // переменная блока с результатом

function getValuesFromRadioButtons(inputs) {
  for (let input of inputs) {
    if (input.checked) {
      return Number(input.value);
    }
  }
} // функция получения значений из радиокнопок

function countResult() {
  let result;
  const formula = getValuesFromRadioButtons(formulas);
  const source = getValuesFromRadioButtons(sources);
  const gender = getValuesFromRadioButtons(genders);
  const coef = getValuesFromRadioButtons(coefs);
  const height = Number(heightInput.value);
  const weight = Number(weightInput.value);
  const age = Number(ageInput.value);
  if (formula === 1 && gender === 1) {
    result = (66.5 + 13.7 * weight + 5 * height - 6.8 * age) * coef * source;
  } else if (formula === 1 && gender === 2) {
    result = (65.5 + 9.6 * weight + 1.8 * height - 4.7 * age) * coef * source;
  } else if (formula === 2 && gender === 1) {
    result = (10 * weight + 6.25 * height - 5 * age + 5) * coef * source;
  } else if (formula === 2 && gender === 2) {
    result = (10 * weight + 6.25 * height - 5 * age - 161) * coef * source;
  } else if (formula === 3 && gender === 1 && coef <= 1.5) {
    result = weight * 34 * source;
  } else if (formula === 3 && gender === 1 && coef >= 1.5) {
    result = weight * 35 * source;
  } else if (formula === 3 && gender === 2 && coef <= 1.5) {
    result = weight * 31 * source;
  } else if (formula === 3 && gender === 2 && coef >= 1.5) {
    result = weight * 32 * source;
  }
  document.querySelector(".result__value").innerHTML = `${Math.round(
    result
  )} ккал/день`;
} // функция расчета

function clickByFormulaButton(event) {
  const anotherFormulaButton = event.target;
  if (
    anotherFormulaButton.dataset.goto &&
    document.querySelector(anotherFormulaButton.dataset.goto)
  ) {
    const gotoBlock = document.querySelector(anotherFormulaButton.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    });
    event.preventDefault();
  }
} // функция прокрутки

function clickByCountButton(event) {
  const anotherCountButton = event.target;
  if (
    anotherCountButton.dataset.goto &&
    document.querySelector(anotherCountButton.dataset.goto)
  ) {
    const gotoBlock = document.querySelector(anotherCountButton.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    });
    event.preventDefault();
  }
} // функция прокрутки

function checkValidity(event) {
  const formNode = event.target.form;
  const isValid = formNode.checkValidity();
  formNode.querySelector(".calculator__button").disabled = !isValid;
} // функция валидации

function switchSpecialInputs() {
  const formula = getValuesFromRadioButtons(formulas);
  if (formula === 3) {
    heightInput.disabled = true;
    ageInput.disabled = true;
  } else {
    heightInput.disabled = false;
    ageInput.disabled = false;
  }
} // функция переключения инпутов

function getVisibleResult() {
  result.classList.add("result__block_active");
} // функция вывода результата

function getTotalResult() {
  countResult();
  getVisibleResult();
  clickByCountButton(event);
} // функция для расчета/видимости/сдвига

calculatorForm.addEventListener("input", checkValidity);
formulaButtons.forEach((formulaButton) => {
  formulaButton.addEventListener("click", clickByFormulaButton);
});
countButton.addEventListener("click", getTotalResult);
formulas.forEach((formula) => {
  formula.addEventListener("change", switchSpecialInputs);
});
