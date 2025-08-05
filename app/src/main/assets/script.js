// script.js

// Define your dropdown options as an array of objects
const options = [
{ label: "R-290 (propane)"	, value: 	0.02 },
{ label: "R-717 (ammonia)"	, value: 	0 },
{ label: "R-718 (water)"	, value: 	0 },
{ label: "R-729 (air)"		, value: 	0 },
{ label: "R-744 (CO2)"		, value: 	1 },
{ label: "R-1270 (propene)"	, value: 	0 },
{ label: "R-23"				, value: 	14800 },
{ label: "R-32"				, value: 	675 },
{ label: "R-125"			, value: 	3500 },
{ label: "R-134a"			, value:  	1430 },
{ label: "R-404A"			, value: 	3922 },
{ label: "R-407A"			, value: 	2107 },
{ label: "R-407C"			, value: 	1774 },
{ label: "R-407F"			, value: 	1825 },
{ label: "R-407H"			, value: 	1495 },
{ label: "R-410A"			, value: 	2088 },
{ label: "R-422D"			, value: 	2729 },
{ label: "R-507A"			, value: 	3985 },
{ label: "R-1234yf"			, value: 	0.501 },
{ label: "R-1234ze(E)"		, value: 	1.37 },
{ label: "R-448A"			, value: 	1386 },
{ label: "R-449A"			, value: 	1396 },
{ label: "R-452A"			, value: 	2139 },
{ label: "R-450A"			, value: 	601 },
{ label: "R-454C"			, value: 	146 },
{ label: "R-513A"			, value: 	629 },
];

// Populate dropdown
const dropdown = document.getElementById('dropdown');
options.forEach((opt, idx) => {
  const optionElem = document.createElement('option');
  optionElem.value = idx; // Use index to reference the object
  optionElem.textContent = opt.label;
  dropdown.appendChild(optionElem);
});

// Handle calculation
const toggleSwitch = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.classList.add(currentTheme);
  
    if (currentTheme === 'dark-mode') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
    else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

document.getElementById('logo-link-js').addEventListener('click', function() {
    window.open('https://www.oekorecherche.de', '_system');
});

document.getElementById('calc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const selectedIdx = dropdown.value;
  const amount = parseFloat(document.getElementById('numberInput').value);
  const primaryResult = document.getElementById('primary-result');
  const detailedResults = document.getElementById('detailed-results');

  if (selectedIdx !== "" && !isNaN(amount)) {
    const selectedOption = options[selectedIdx];
    const co2 = amount * selectedOption.value;
    const numberFormatOptions = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    };
    primaryResult.innerHTML = `Result: ${co2.toLocaleString(undefined, numberFormatOptions)} kg CO<sub>2</sub> equivalents`;

    const values = calculate_values(selectedOption.value, amount);

    document.getElementById('calc_car_km').textContent = values.car_km.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById('calc_car_earth').textContent = values.car_world.toLocaleString(undefined, numberFormatOptions);
    document.getElementById('calc_led_hours').textContent = values.led_hours.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById('calc_led_years').textContent = values.led_years.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById('calc_plane_km').textContent = values.plane_km.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById('calc_plane_earth').textContent = values.plane_world.toLocaleString(undefined, numberFormatOptions);

    detailedResults.style.display = 'block';
    const outputField = document.getElementById('outputField');
    outputField.style.opacity = 0;
    let opacity = 0;
    const interval = setInterval(function() {
      if (opacity >= 1) {
        clearInterval(interval);
      }
      opacity += 0.1;
      outputField.style.opacity = opacity;
    }, 70);

  } else {
    primaryResult.innerHTML = 'Please fill in all fields.';
    detailedResults.style.display = 'none';
  }
});

function calculate_values(refrig_gwp, amount) {
    var vals = {};
    vals.co2 = refrig_gwp * amount;
    vals.car_km = vals.co2 / 0.1423;
    vals.car_world = vals.car_km / 40075;
    vals.led_hours = vals.co2 / 0.00489;
    vals.led_years = vals.co2 / 42.8364;
    vals.plane_km = vals.co2 / 0.2307;
    vals.plane_world = vals.plane_km / 40075;
    return vals;
}
