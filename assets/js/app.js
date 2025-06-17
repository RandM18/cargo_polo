// document.addEventListener("DOMContentLoaded", function () {
const standardRadio = document.getElementById("standard_radio");
const advancedRadio = document.getElementById("advanced_radio");

const carTypeSelector = document.getElementById("car_type_selector");

const standardCalculator = document.getElementById("standard_calculator");
const advancedCalculator = document.getElementById("advanced_calculator");
const checkboxes = document.querySelectorAll('input[name="side[]"]');
const selectedServicesList = document.getElementById("selected_services");
const sideButtons = document.querySelectorAll(".side-buttons button");

const totalPriceElement = document.getElementById("total_price");
const orderButton = document.getElementById("order_button");

const sedanRadio = document.getElementById("sedan_radio");
const suvRadio = document.getElementById("suv_radio");
const allParts = document.getElementById("allparts");

const carImage = document.getElementById("car_image");

const standartCats = document.querySelector("#standard-calculator-cats");
const extraItems = document.querySelector("#standard-calculator-extras");
const advancedCats = document.querySelector("#advanced-calculator-cats");



let totalPrice = 0;
let carType = "";

const services = {
    sedan: {
        front: { name: "Front cut", text: "<strong>Included:</strong> Engine, front bumper, headlights, Engine, front bumper, headlightsEngine, front bumper, headlightsEngine, front bumper, headlights.", price: 1500, icon: "sedan-front" },
        doors: { name: "Doors", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 1200, icon: "sedan-doors" },
        rims: { name: "Rims and tires", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 1800, icon: "sedan-rims" },
        rearBumper: { name: "Rear bumper", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 1800, icon: "sedan-rearBumper" },
        rearTrunks: { name: "Rear trunk", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 2000, icon: "sedan-rearTrunk" },
        rearLights: { name: "Rear lights", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 2000, icon: "sedan-rearLights" },
    },
    suv: {
        front: { name: "Front cut", text: "<strong>Included:</strong> Engine, front bumper, headlights, Engine, front bumper, headlightsEngine, front bumper, headlightsEngine, front bumper, headlights.", price: 1500, icon: "suv-front" },
        doors: { name: "Doors", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 1200, icon: "suv-doors" },
        rims: { name: "Rims and tires", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 1800, icon: "suv-rims" },
        rearBumper: { name: "Rear bumper", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 1800, icon: "suv-rearBumper" },
        rearTrunks: { name: "Rear trunk", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 2000, icon: "suv-rearTrunk" },
        rearLights: { name: "Rear lights", text: "<strong>Included:</strong> 4 complete doors, 2 complete mirrors, trunk, trunk hinges, battery.", price: 2000, icon: "suv-rearLights" },
    },
};

const advancedViews = {
    sedan: {
        top: { name: "Top view", icon: 'sedan-top'},
        right: { name: "Right side view", icon: 'sedan-right' },
        rear: { name: "Rear view", icon: 'sedan-rear'},
        front: { name: "Front view", icon: 'sedan-front'},
        underneath: { name: "Underneath", icon: 'sedan-underneath'},
        interior: { name: "Interior", icon: 'sedan-interior'}
    }
};

// Обновление итоговой суммы
function setTotal() {
    totalPrice = parseFloat(document.querySelector('input[name="calculator_type"]:checked').value);
    totalPrice += allParts.checked ? parseFloat(allParts.value) : 0;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}
function updateTotal(priceChange) {
    totalPrice += priceChange;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function setCalcType() {
    const type = document.querySelector('input[name="calculator_type"]:checked');
    const car = document.querySelector('input[name="car_type"]:checked');

    if (type != null && car != null) {
        const isStandard = standardRadio.checked;
        standardCalculator.style.display = isStandard ? "block" : "none";
        advancedCalculator.style.display = isStandard ? "none" : "block";
    }
}

// Обработчик изменения типа калькулятора
function handleCalculatorTypeChange() {
    const isStandard = standardRadio.checked;

    setCalcType();

    sedanRadio.disabled = false;
    suvRadio.disabled = false;
    allParts.disabled = false;

    document.querySelector(".types").classList.remove("disabled");
    const skeleton = document.querySelector(".skeletons");
    if (skeleton != null) {
        skeleton.classList.remove("disabled");
    }
    setTotal();
    resetCalculator();
}

// Обработчик изменения типа авто
function handleCarTypeChange(event) {
    setCalcType();


    const isStandard = standardRadio.checked;
    carType = event.target.value;

    const cartype = document.querySelectorAll(".cartype.--active");
    if (cartype.length > 0) {
        cartype.forEach((el, index) => {
            el.classList.remove("--active");
        });
    }
    event.target.parentElement.classList.add("--active");

    const skeleton = document.querySelector(".skeletons");
    if (skeleton != null) {
        skeleton.remove();
    }

    if(isStandard){
        standartCats.innerHTML = "";
        Object.entries(services[carType]).map((entry) => {
            let key = entry[0];
            let value = entry[1];

            const html = `
                    <label class="partsCheckbox">
                        <input type="checkbox" name="side[]" value="${key}">
                        <div class="partsCheckbox__title">${value.name}</div>
                        <div class="partsCheckbox__icon"><img src="assets/img/standart/${value.icon}.svg" alt="icon"></div>
                        <div class="partsCheckbox__status">Selected</div>
                    </label>
                `;

            standartCats.insertAdjacentHTML("beforeEnd", html);
        });
    }else{
        advancedCats.innerHTML = '';
        Object.entries(advancedViews[carType]).map((entry) => {
            let key = entry[0];
            let value = entry[1];
            const html = `
                    <label class="partsCheckbox">
                        <input type="radio" name="view" value="${key}">
                        <div class="partsCheckbox__title">${value.name}</div>
                        <div class="partsCheckbox__icon"><img src="assets/img/advanced/${value.icon}.svg" alt="icon"></div>
                    </label>
                `;
            advancedCats.insertAdjacentHTML("beforeEnd", html);
        });
    }

   

    resetCalculator();
}

// Обработчик для Standart калькулятора
function handleStandardCheckboxChange(event) {
    const side = event.target.value;
    const isChecked = event.target.checked;
    const parent = event.target.parentElement;

    const service = services[carType][side];

    if (isChecked) {
        const listItem = `
                <div class="standard-calculator__service" data-side="${side}">
                    <div class="partsCheckbox">
                        <div class="partsCheckbox__title">${service.name}</div>
                        <div class="partsCheckbox__icon"><img src="assets/img/standart/${service.icon}-more.svg" alt="icon"></div>
                    </div>
                    <div class="standard-calculator__service_body">
                        <div class="standard-calculator__service_name">${service.name}</div>
                        <div class="standard-calculator__service_text">${service.text}</div>
                    </div>
                </div>
            `;
        selectedServicesList.insertAdjacentHTML("beforeend", listItem);
        parent.classList.add("--checked");
        updateTotal(service.price);
    } else {
        parent.classList.remove("--checked");
        const listItemToRemove = selectedServicesList.querySelector(`.standard-calculator__service[data-side="${side}"]`);
        if (listItemToRemove) {
            selectedServicesList.removeChild(listItemToRemove);
            updateTotal(-service.price);
        }
    }

    if (document.querySelectorAll("#selected_services .standard-calculator__service").length == 0) {
        selectedServicesList.classList.add("isEmpty");
    } else {
        selectedServicesList.classList.remove("isEmpty");
    }
}

function handleAdvancedViewsChange(event){
    const side = event.target.value;
    const isChecked = event.target.checked;
    const parent = event.target.parentElement;

    if(isChecked){
        parent.classList.add("--checked");
    }else{
        parent.classList.remove("--checked");
    }

    selected_views.querySelector('.views')

}

function handleExtras(event){
    const price = event.target.value;
    const isChecked = event.target.checked;

    if(isChecked){
        updateTotal( parseFloat(price) );
    }else{
        updateTotal( -1*parseFloat(price) );
    }
}

// Обработчик для Advanced калькулятора
function handleAdvancedButtonClick(event) {
    const side = event.target.dataset.side;
    // carImage.src = `images/${carType}_${side}.png`;
}

// Сброс калькулятора (удаление выбранных элементов и обнуление суммы)
function resetCalculator() {
    standartCats.querySelectorAll(".partsCheckbox").forEach((item) => {
        item.classList.remove("--checked");
        item.querySelector("input").checked = false;
    });

    selectedServicesList.classList.add("isEmpty");
    selectedServicesList.querySelectorAll(".standard-calculator__service").forEach((item) => {
        item.remove();
    });

    const isStandard = standardRadio.checked;
    setTotal();

    //Сбрасываем изображение
    // carImage.src = `car.png`;
}

// Привязка обработчиков событий
standardRadio.addEventListener("change", handleCalculatorTypeChange);
advancedRadio.addEventListener("change", handleCalculatorTypeChange);

document.querySelectorAll('input[name="car_type"]').forEach((radio) => {
    radio.addEventListener("change", handleCarTypeChange);
});

allParts.addEventListener("change", () => {
    const isChecked = allParts.checked;
    const cost = parseFloat(allParts.value);
    updateTotal(isChecked ? cost : -1 * cost);
});

standartCats.addEventListener("change", function (event) {
    if (event.target && event.target.matches("input")) {
        handleStandardCheckboxChange(event);
    }
});

extraItems.addEventListener("change", function (event) {
    if (event.target && event.target.matches('input')) {
        const item = event.target.closest('li');
        item.classList.toggle('--active');
        handleExtras(event);
    }
});

advancedCats.addEventListener("change", function (event) {
    if (event.target && event.target.matches("input")) {
        handleAdvancedViewsChange(event);
    }
});


sideButtons.forEach((button) => {
    button.addEventListener("click", handleAdvancedButtonClick);
});

orderButton.addEventListener("click", function () {
    alert(`Вы сделали заказ на сумму $ ${totalPrice.toFixed(2)}`); // Просто пример
});

// });
