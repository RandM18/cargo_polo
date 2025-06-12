document.addEventListener("DOMContentLoaded", function () {
    const standardRadio = document.getElementById("standard_radio");
    const advancedRadio = document.getElementById("advanced_radio");

    const carTypeSelector = document.getElementById("car_type_selector");

    const standardCalculator = document.getElementById("standard_calculator");
    const advancedCalculator = document.getElementById("advanced_calculator");
    const checkboxes = document.querySelectorAll('input[name="side"]');
    const selectedServicesList = document.getElementById("selected_services");
    const sideButtons = document.querySelectorAll(".side-buttons button");
    const highlightedArea = document.getElementById("highlighted_area");
    const totalPriceElement = document.getElementById("total_price");
    const orderButton = document.getElementById("order_button");

    const sedanRadio = document.getElementById("sedan_radio");
    const suvRadio = document.getElementById("suv_radio");

    const carImage = document.getElementById("car_image");

    let totalPrice = 0;
    let carType = ""; // По умолчанию седан

    // Данные об услугах (можете хранить в JSON файле)
    const services = {
        sedan: {
            front: { name: "Front cut", text:"<strong>Included:</strong> Engine, front bumper, headlights, Engine, front bumper, headlightsEngine, front bumper, headlightsEngine, front bumper, headlights.", price: 1500 },
            doors: { name: "Doors", text:"", price: 1200 },
            rims: { name: "Rims and tires", text:"", price: 1800 },
            rearBumper: { name: "Rear bumper", text:"", price: 1800 },
            rearTrunks: { name: "Rear trunk", text:"", price: 2000 },
            rearLights: { name: "Rear lights", text:"", price: 2000 },
        },
        suv: {
            front: { name: "Полировка передней части (SUV)", price: 1800 },
            rear: { name: "Полировка задней части (SUV)", price: 1500 },
            left: { name: "Полировка левой стороны (SUV)", price: 2200 },
            right: { name: "Полировка правой стороны (SUV)", price: 2200 },
            roof: { name: "Полировка крыши (SUV)", price: 2500 },
        },
    };

    // Обновление итоговой суммы
    function setTotal(priceChange) {
        totalPrice = priceChange;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
    function updateTotal(priceChange) {
        totalPrice += priceChange;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function setCalcType(){
      const isStandard = standardRadio.checked;
      const carSedan = sedanRadio.checked;
      const carSUV = suvRadio.checked;

      if((carSedan || carSUV)){
        standardCalculator.style.display = isStandard ? 'block' : 'none';
        advancedCalculator.style.display = isStandard ? 'none' : 'block';
      }
    }

    // Обработчик изменения типа калькулятора
    function handleCalculatorTypeChange() {
        const isStandard = standardRadio.checked;

        setCalcType();

        // Разблокируем радио-кнопки Sedan и SUV
        sedanRadio.disabled = false;
        suvRadio.disabled = false;

        document.querySelector(".types").classList.remove("disabled");
        const skeleton = document.querySelector(".skeletons");
        if(skeleton != null){
          skeleton.classList.remove("disabled");
        }

        setTotal(isStandard ? 250 : 0);

        // Сброс всего при смене типа
        resetCalculator();
    }

    // Обработчик изменения типа авто
    function handleCarTypeChange(event) {
        

        setCalcType();
        

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

        resetCalculator(); // Сброс и перерасчет при смене типа авто
    }

    // Обработчик для Standart калькулятора
    function handleStandardCheckboxChange(event) {
        const side = event.target.value;
        const isChecked = event.target.checked;

        const service = services[carType][side];

        if (isChecked) {
            const listItem = document.createElement("li");
            listItem.textContent = `${service.name} - - ${service.text} ${service.price} руб.`;
            listItem.dataset.side = side; // Сохраняем side для удаления
            selectedServicesList.appendChild(listItem);
            updateTotal(service.price);
        } else {
            // Находим и удаляем элемент списка
            const listItemToRemove = selectedServicesList.querySelector(`li[data-side="${side}"]`);
            if (listItemToRemove) {
                selectedServicesList.removeChild(listItemToRemove);
                updateTotal(-service.price);
            }
        }
    }

    // Обработчик для Advanced калькулятора
    function handleAdvancedButtonClick(event) {
        const side = event.target.dataset.side;
        highlightedArea.textContent = `Выбрана: ${side}`; // Просто текст, можно заменить на подсветку

        //Заменить изображение в зависимости от типа авто и выбранной стороны
        carImage.src = `images/${carType}_${side}.png`;
    }

    // Сброс калькулятора (удаление выбранных элементов и обнуление суммы)
    function resetCalculator() {
        // Сбрасываем выбранные стороны в Standart
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Удаляем все элементы из списка выбранных услуг

        while (selectedServicesList.firstChild) {
            selectedServicesList.removeChild(selectedServicesList.firstChild);
        }


        // Обнуляем итоговую сумму
        const isStandard = standardRadio.checked;
        setTotal(isStandard ? 250 : 0);

        //Сбрасываем изображение
        // carImage.src = `car.png`;
        // highlightedArea.textContent = "";
    }

    // Привязка обработчиков событий
    standardRadio.addEventListener("change", handleCalculatorTypeChange);
    advancedRadio.addEventListener("change", handleCalculatorTypeChange);

    document.querySelectorAll('input[name="car_type"]').forEach((radio) => {
        radio.addEventListener("change", handleCarTypeChange);
    });

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", handleStandardCheckboxChange);
    });

    sideButtons.forEach((button) => {
        button.addEventListener("click", handleAdvancedButtonClick);
    });

    orderButton.addEventListener("click", function () {
        alert(`Вы сделали заказ на сумму ${totalPrice} руб.`); // Просто пример
    });



    const swiperStandartCats = new Swiper('#swiper-standartCats',{
      slidesPerView:6,
      spaceBetween: 10
    });
});
