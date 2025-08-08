// script.js

// Define your dropdown options as an array of objects
const options = [
    // NOTE: The second, third, and fourth values are placeholders.
    // Please replace them with the correct data.
    { label: "R-290 (propane)", values: [0.02, 3, 3, 0.02], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-717 (ammonia)", values: [0, 0, 0, 0], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-718 (water)", values: [0, 0, 0, 0], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-729 (air)", values: [0, 0, 0, 0], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-744 (CO2)", values: [1, 1, 1, 1], value_names: ["EU", "AR4", "AR5", "AR6"] },
    // { label: "R-1270 (propene)", values: [0, 0, 0, 0], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-23", values: [14800, 14800, 12400, 14600], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-32", values: [675, 675, 677, 771], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-125", values: [3500, 3500, 3170, 3740], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-134a", values: [1430, 1430, 1300, 1530], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-404A", values: [3922, 3922, 3943, 4728], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-407A", values: [2107, 2107, 1923, 2262], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-407C", values: [1774, 1774, 1624, 1908], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-407F", values: [1825, 1825, 1674, 1965], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-407H", values: [1495, 1495, 1378, 1615], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-410A", values: [2088, 2088, 1924, 2256], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-422D", values: [2729, 2729, 2473, 2917], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-507A", values: [3985, 3985, 3985, 4775], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-1234yf", values: [0.501, 4, 1, 0.501], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-1234ze(E)", values: [1.37, 7, 1, 1.37], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-448A", values: [1386, 1387, 1273, 1494], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-449A", values: [1396, 1397, 1282, 1504], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-450A", values: [601, 605, 547, 643], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-452A", values: [2139, 2140, 1945, 2292], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-452B", values: [697, 698, 676, 779], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-454A", values: [237, 239, 238, 270], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-45BA", values: [465, 466, 467, 531], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-454C", values: [146, 148, 146, 166], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-455A", values: [146, 148, 146, 166], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-513A", values: [629, 631, 573, 673], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-514A", values: [2, 7, 2, 2], value_names: ["EU", "AR4", "AR5", "AR6"] },
    { label: "R-515B", values: [288, 293, 299, 322], value_names: ["EU", "AR4", "AR5", "AR6"] },
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
let currentGwpIndex = 0;

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

function updateTextByDataId(id, text) {
    document.querySelectorAll(`[data-id='${id}']`).forEach(el => {
        el.textContent = text;
    });
}

function calculate() {
    const selectedIdx = dropdown.value;
    const amount = parseFloat(document.getElementById('numberInput').value);
    const primaryResult = document.getElementById('primary-result');
    const detailedResults = document.getElementById('detailed-results');

    if (selectedIdx !== "" && !isNaN(amount)) {
        const selectedOption = options[selectedIdx];
        const gwpValue = selectedOption.values[currentGwpIndex];
        const co2 = amount * gwpValue;
        const numberFormatOptions = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        };
        primaryResult.innerHTML = `GWP of refrigerant: ${gwpValue.toLocaleString(undefined, numberFormatOptions)} <br><br> This corresponds to a climate impact of ${co2.toLocaleString(undefined, numberFormatOptions)} kg CO<sub>2</sub> equivalents or`;

        const values = calculate_values(gwpValue, amount);

        const numberFormat = (val, options) => val.toLocaleString(undefined, options);

        // Update car values
        updateTextByDataId('calc_car_km_diesel', numberFormat(values.car_km_diesel, {maximumFractionDigits: 0}));
        updateTextByDataId('calc_car_earth_diesel', numberFormat(values.car_world_diesel, numberFormatOptions));
        updateTextByDataId('calc_car_km_benzin', numberFormat(values.car_km_benzin, {maximumFractionDigits: 0}));
        updateTextByDataId('calc_car_earth_benzin', numberFormat(values.car_world_benzin, numberFormatOptions));
        updateTextByDataId('calc_car_km_hybrid', numberFormat(values.car_km_hybrid, {maximumFractionDigits: 0}));
        updateTextByDataId('calc_car_earth_hybrid', numberFormat(values.car_world_hybrid, numberFormatOptions));
        updateTextByDataId('calc_car_km_elektro', numberFormat(values.car_km_elektro, {maximumFractionDigits: 0}));
        updateTextByDataId('calc_car_earth_elektro', numberFormat(values.car_world_elektro, numberFormatOptions));

        const passengers = 1.4;
        updateTextByDataId('passengers-text', `driving ${passengers.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} passengers in a German car`);

        // Update LED values
        updateTextByDataId('calc_led_hours', numberFormat(values.led_hours, {maximumFractionDigits: 0}));
        updateTextByDataId('calc_led_years', numberFormat(values.led_years, numberFormatOptions));

        // Update airplane values
        updateTextByDataId('calc_plane_km', numberFormat(values.plane_km, {maximumFractionDigits: 0}));
        updateTextByDataId('calc_plane_earth', numberFormat(values.plane_world, numberFormatOptions));
        updateTextByDataId('calc_plane_km_withinGermany', numberFormat(values.plane_km_withinGermany, {maximumFractionDigits: 0}));

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
}

toggleSwitch.addEventListener('change', switchTheme, false);

document.getElementById('logo-link-js').addEventListener('click', function() {
    window.open('https://www.oekorecherche.de', '_system');
});

document.getElementById('calc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  calculate();
});

const gwpButtons = document.querySelectorAll('.gwp-btn');
gwpButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        currentGwpIndex = index;
        gwpButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        calculate();
    });
});

function calculate_values(refrig_gwp, amount) {
    var vals = {};
    vals.co2 = refrig_gwp * amount;
    // vals.car_km = vals.co2 / 0.1423;
    // https://www.umweltbundesamt.de/bild/vergleich-der-durchschnittlichen-emissionen-0
    vals.car_km_benzin = vals.co2 / 0.164; // Benzin-Pkw
    vals.car_km_diesel = vals.co2 / 0.172; // Diesel-Pkw
    vals.car_km_elektro = vals.co2 / 0.072; // Elektro-Pkw
    vals.car_km_hybrid = vals.co2 / 0.114; // Hybrid-Pkw
    vals.car_world_benzin = vals.car_km_benzin / 40075;
    vals.car_world_diesel = vals.car_km_diesel / 40075;
    vals.car_world_elektro = vals.car_km_elektro / 40075;
    vals.car_world_hybrid = vals.car_km_hybrid / 40075;
    // vals.led_hours = vals.co2 / 0.00489;
    // vals.led_years = vals.co2 / 42.8364;
    vals.led_hours = vals.co2 / 0.00485;
    vals.led_years = vals.co2 / 42.486;
    // vals.plane_km = vals.co2 / 0.2307; // Zahl aus 2012
    vals.plane_km_withinGermany = vals.co2 / 0.297 / 433.65; // distance between FRA and BER = 433.65 km
    vals.plane_km = vals.co2 / 0.1411;
    vals.plane_world = vals.plane_km / 40075;
    return vals;
}
