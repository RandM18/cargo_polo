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
const carViewName = document.getElementById("car-view-name");
const carImageContainer = document.getElementById("car-image-container");
const advancedChexboxs = document.getElementById("advanced-calculator-checkboxs");

let totalPrice = 0;
let carType = "";
let currentView = "left";
let svgDocument;


// DATA

// STANDART CALC
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

const standartExtraData = [
    { name: "Extra super long option1", price: 100, tooltip: "Lorem ipsum dol amor" },
    { name: "Extra 3", price: 100, tooltip: "Lorem ipsum dol amor" },
    { name: "Extra 5", price: 50, tooltip: "" },
    { name: "Extra 2", price: 75, tooltip: "" },
    { name: "Extra short option number4", price: 200, tooltip: "Lorem ipsum dol amor" },
    { name: "Extra 6", price: 125, tooltip: "Lorem ipsum dol amor" },
    { name: "Extra 7", price: 100, tooltip: "Lorem ipsum dol amor" },
    { name: "Extra 8", price: 10, tooltip: "" },
];

//ADVANCED CALC
const advancedViews = {
    sedan: {
        sedan_left: { name: "Left view", icon: "sedan-left" },
        sedan_top: { name: "Top view", icon: "sedan-top" },
        sedan_right: { name: "Right side view", icon: "sedan-right" },
        sedan_rear: { name: "Rear view", icon: "sedan-rear" },
        sedan_front: { name: "Front view", icon: "sedan-front" },
        sedan_underneath: { name: "Underneath", icon: "sedan-underneath" },
        sedan_interior: { name: "Interior", icon: "sedan-interior" },
    },
    suv: {
        suv_left: { name: "Left view", icon: "suv-left" },
        suv_top: { name: "Top view", icon: "suv-top" },
        suv_right: { name: "Right side view", icon: "suv-right" },
        suv_rear: { name: "Rear view", icon: "suv-rear" },
        suv_front: { name: "Front view", icon: "suv-front" },
        suv_underneath: { name: "Underneath", icon: "suv-underneath" },
        suv_interior: { name: "Interior", icon: "suv-interior" },
    },
};

const advancedCuts = [
    { id: "front", name: "Front cut", price: 2500, tooltip: "Lorem ipsum dol amor" },
    { id: "front-wheels", name: "Front wheels", price: 500, tooltip: "2 items" },
    { id: "rear-wheels", name: "Rear wheels", price: 500, tooltip: "2 items" },
    { id: "roof", name: "Roof", price: 1000.5, tooltip: "" },
    { id: "lights", name: "Ligths", price: 100, tooltip: "" },
    { id: "bumper", name: "Bumper", price: 100, tooltip: "" },
    { id: "trunk", name: "Trunk", price: 100, tooltip: "" },
    { id: "doors", name: "Doors", price: 100, tooltip: "" },
];

// Update total price
function setTotal() {
    totalPrice = parseFloat(document.querySelector('input[name="calculator_type"]:checked').value);
    totalPrice += allParts.checked ? parseFloat(allParts.value) : 0;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}
function updateTotal(priceChange) {
    totalPrice += priceChange;
    totalPriceElement.textContent = totalPrice.toFixed(2);
    getOrder();
}

// Change calc type
function setCalcType() {
    const type = document.querySelector('input[name="calculator_type"]:checked');
    const car = document.querySelector('input[name="car_type"]:checked');

    if (type != null && car != null) {
        const isStandard = standardRadio.checked;
        standardCalculator.style.display = isStandard ? "block" : "none";
        advancedCalculator.style.display = isStandard ? "none" : "block";
    }
}

function handleCalculatorTypeChange() {
    const isStandard = standardRadio.checked;

    setCalcType();

    sedanRadio.checked = false;
    suvRadio.checked = false;
    sedanRadio.disabled = false;
    suvRadio.disabled = false;
    allParts.disabled = false;
    allParts.checked = true;

    standardCalculator.style.display = "none";
    advancedCalculator.style.display = "none";

    document.querySelectorAll(".cartype.--active").forEach((item) => {
        item.classList.remove("--active");
    });

    document.querySelector(".types").classList.remove("disabled");
    const skeleton = document.querySelector(".skeletons");
    if (skeleton != null) {
        skeleton.classList.remove("disabled");
        skeleton.classList.remove("--remove");
    }
    setTotal();
    resetCalculator();
    getOrder();
}

// Обработчик изменения типа авто
function handleCarTypeChange(event) {
    setCalcType();

    const isStandard = standardRadio.checked;
    carType = event.target.value;
    currentView = carType + "_left";

    const cartype = document.querySelectorAll(".cartype.--active");
    if (cartype.length > 0) {
        cartype.forEach((el, index) => {
            el.classList.remove("--active");
        });
    }
    event.target.parentElement.classList.add("--active");

    const skeleton = document.querySelector(".skeletons");
    if (skeleton != null) {
        skeleton.classList.add("--remove");
    }

    detailsTable.innerHTML = "";
    if (isStandard) {
            detailsTable.innerHTML += `
        <tr><td>Standart cut</td><td>$${standardRadio.value}</td><td></td></tr>
        `;
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

        extraItems.innerHTML = "";
        standartExtraData.forEach((item, index)=>{
            const html = `
                <li>
                    <label class="extrasCheckbox">
                        <input type="checkbox" name="extras[]" value="${item.price}" data-id="e-${index}">
                        <span>${item.name}</span>
                        ${
                            item.tooltip.length > 0 ? `<div class="tooltip">
                                <div class="tooltip__icon"></div>
                                <div class="tooltip__text">${item.tooltip}</div>
                            </div>`
                            :``
                        }
                    </label>
                    <div class="extrasCheckbox__price">$${item.price}</div>
                </li>
            `;
            extraItems.insertAdjacentHTML("beforeEnd", html);
        });
    } else {
        detailsTable.innerHTML += `
            <tr><td>Advanced</td><td></td><td></td></tr>
        `;
        advancedCats.innerHTML = "";
        Object.entries(advancedViews[carType]).map((entry, index) => {
            let key = entry[0];
            let value = entry[1];
            const html = `
                    <label class="partsCheckbox ${index == 0 ? "--checked" : ""}">
                        <input type="radio" name="view" value="${key}">
                        <div class="partsCheckbox__title">${value.name}</div>
                        <div class="partsCheckbox__icon"><img src="assets/img/advanced/${value.icon}.svg" alt="icon"></div>
                    </label>
                `;
            advancedCats.insertAdjacentHTML("beforeEnd", html);
        });
        loadSVG(currentView);

        advancedChexboxs.innerHTML = '';
        Object.entries(advancedCuts).map((entry) => {
            let item = entry[1];
            let html = `
                <li>
                    <label class="extrasCheckbox">
                        <input type="checkbox" name="cuts" value="${item.price}" data-part="${item.id}">
                        <span>${item.name}</span>
                    ${item.tooltip.length > 0 ? 
                        `<div class="tooltip">
                            <div class="tooltip__icon"></div>
                            <div class="tooltip__text">${item.tooltip}</div>
                        </div>`
                        :``
                    }
                    </label>
                        <div class="extrasCheckbox__price">$${item.price}</div>
                    </li>
                `;
            advancedChexboxs.insertAdjacentHTML("beforeend", html);
        });
    }
    allParts.scrollIntoView({ behavior: "smooth" });
    resetCalculator();
    getOrder();
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

        detailsTable.innerHTML += `
            <tr data-side="${side}"><td>${service.name}</td><td>$${service.price}</td><td>
            <button class="order-close" data-type="standart-service" data-remove="${side}"></button></td></tr>
        `;
    } else {
        parent.classList.remove("--checked");
        const listItemToRemove = selectedServicesList.querySelector(`.standard-calculator__service[data-side="${side}"]`);
        if (listItemToRemove) {
            selectedServicesList.removeChild(listItemToRemove);
            updateTotal(-service.price);
            detailsTable.querySelector(`tr[data-side="${side}"]`).remove();
        }
    }

    if (document.querySelectorAll("#selected_services .standard-calculator__service").length == 0) {
        selectedServicesList.classList.add("isEmpty");
    } else {
        selectedServicesList.classList.remove("isEmpty");
    }
}

function handleAdvancedViewsChange(event) {
    const side = event.target.value;
    const isChecked = event.target.checked;
    const parent = event.target.parentElement;

    advancedCats.querySelectorAll(".partsCheckbox").forEach((item) => {
        item.classList.remove("--checked");
    });
    parent.classList.add("--checked");

    const view = event.target.value;
    if (view !== currentView) {
        event.target.classList.add("active-view");
        currentView = view;
        loadSVG(view);
    }
}

function handleExtras(event) {
    const price = event.target.value;
    const isChecked = event.target.checked;
    const name = event.target.nextElementSibling.textContent;
    const id = event.target.dataset.id;

    if (isChecked) {
        updateTotal(parseFloat(price));
        detailsTable.innerHTML += `
            <tr data-side="e-${id}"><td>${name}</td><td>$${price}</td><td>
            <button class="order-close" data-type="standart-extras" data-remove="${id}"></button></td></tr>
        `;
        
    } else {
        updateTotal(-1 * parseFloat(price));
        detailsTable.querySelector(`tr[data-side="e-${id}"]`).remove();
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

    setTotal();
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
    if (event.target && event.target.matches("input")) {
        const item = event.target.closest("li");
        item.classList.toggle("--active");
        handleExtras(event);
    }
});

advancedCats.addEventListener("change", function (event) {
    if (event.target && event.target.matches("input")) {
        handleAdvancedViewsChange(event);
    }
});

advancedChexboxs.addEventListener("change", function (event) {
    if (event.target && event.target.matches("input")) {
        const id = event.target.dataset.part;
        const item = event.target.closest("li");
        const name = event.target.nextElementSibling.textContent;
        const price = event.target.value;
        item.classList.toggle("--active");
        highlightParts();
        if (event.target.checked) {
            updateTotal(parseFloat(event.target.value));
            detailsTable.innerHTML += `
                <tr data-side="${id}"><td>${name}</td><td>$${price}</td><td>
                <button class="order-close" data-type="advanced-service" data-remove="${id}"></button></td></tr>
            `;
        } else {
            updateTotal(-1 * parseFloat(event.target.value));
            detailsTable.querySelector(`tr[data-side="${id}"]`).remove();
        }
    }
});

sideButtons.forEach((button) => {
    button.addEventListener("click", handleAdvancedButtonClick);
});

orderButton.addEventListener("click", function () {
    alert(`Вы сделали заказ на сумму $ ${totalPrice.toFixed(2)}`);
});

function loadSVG(view) {
    fetch(`assets/img/advanced/cars/${view}.svg`) // car_side.svg, car_top.svg
        .then((response) => response.text())
        .then((svgData) => {
            carImageContainer.innerHTML = svgData;
            svgDocument = carImageContainer.querySelector("svg");
            carViewName.innerText = advancedViews[carType][view].name;
            highlightParts();
        })
        .catch((error) => console.error("SVG download error:", error));
}

// Функция для подсветки выбранных запчастей
function highlightParts() {
    advancedChexboxs.querySelectorAll("input").forEach((checkbox) => {
        const partId = checkbox.dataset.part;
        const svgElement = svgDocument.getElementById(partId);

        if (svgElement) {
            if (checkbox.checked) {
                svgElement.classList.add("highlighted");
            } else {
                svgElement.classList.remove("highlighted");
            }
        }
    });
}

const details = document.querySelector("#orderDetails");
const detailsIcon = details.querySelector("#orderDetails-icon");
const detailsName = details.querySelector("#orderDetails-name");
const detailsTable = details.querySelector("#orderDetails-table");
document.querySelector("#details-popup").addEventListener("click", function () {
    // if (carType != "") {
        getOrder();
        details.classList.toggle("--active");
    // }
});

detailsTable.addEventListener('click', function(event){
    if(event.target && event.target.matches('button.order-close')){
        const type = event.target.dataset.type;
        const id = event.target.dataset.remove;

        if(type == 'standart-service'){
            standartCats.querySelector(`input[value="${id}"]`).click();
        } else if(type == 'standart-extras'){
            extraItems.querySelector(`input[data-id="${id}"`).click();
        } else if(type == 'advanced-service'){
            advancedChexboxs.querySelector(`input[data-part="${id}"]`).click();
        }

        

        getOrder();
    }
});

function getOrder() {
    detailsIcon.innerHTML = `
            <svg width="141" height="52">
                <use href="/assets/img/icons.svg#${carType}"></use>
            </svg>
        `;
    detailsName.innerText = carType;
}

// });
