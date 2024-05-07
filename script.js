// script.js
function createTable() {
  const statements = [
    "I like to watch movies",
    "I like to listen to radio",
    "I like to eat out",
    "I like to watch TV"
  ];

  const tableContainer = document.getElementById("tableContainer");
  const table = document.createElement("table");
  table.setAttribute("border", "1");

  // Create header row
  const headerRow = table.insertRow();
  headerRow.appendChild(document.createElement("th"));

  const agreementLevels = [
    "Strongly Agree",
    "Agree",
    "Neutral",
    "Disagree",
    "Strongly Disagree"
  ];
  agreementLevels.forEach((level) => {
    const th = document.createElement("th");
    th.textContent = level;
    headerRow.appendChild(th);
  });

  // Create rows for each statement
  statements.forEach((statement) => {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.textContent = statement;

    for (let i = 5; i >= 1; i--) {
      const radioCell = row.insertCell();
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = statement.replace(/\s+/g, "_").toLowerCase(); // Convert statement to lowercase and replace spaces with underscores
      radio.value = i;
      radioCell.appendChild(radio);
    }
  });

  tableContainer.appendChild(table);
}

window.onload = createTable;

document.addEventListener("DOMContentLoaded", function () {
  const fillSurveyLink = document.getElementById("fillSurvey");
  const viewResultsLink = document.getElementById("viewResults");
  const fillSurveySection = document.getElementById("fillSurveySection");
  const viewResultsSection = document.getElementById("viewResultsSection");
  const surveyForm = document.getElementById("surveyForm");

  fillSurveyLink.addEventListener("click", function (event) {
    event.preventDefault();
    fillSurveySection.style.display = "block";
    viewResultsSection.style.display = "none";
  });

  viewResultsLink.addEventListener("click", function (event) {
    event.preventDefault();
    fillSurveySection.style.display = "none";
    viewResultsSection.style.display = "block";
    displayResults(); // Display results when switching to the "View Results" tab
  });

  surveyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Check if exactly 4 radio buttons are checked
    const checkedRadioButtons = document.querySelectorAll('input[type="radio"]:checked');
    if (checkedRadioButtons.length !== 4) {
      alert("Please answer all four questions.");
      return;
    }

    // Check if at least one checkbox is checked
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let atLeastOneChecked = false;
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        atLeastOneChecked = true;
      }
    });
    if (!atLeastOneChecked) {
      alert("Please select at least one favorite food.");
      return;
    }

    // Simulate saving data to a database
    const formData = new FormData(surveyForm);
    const surveyData = {};
    formData.forEach((value, key) => {
      surveyData[key] = value;
    });
    console.log("Survey data:", surveyData);
    alert("Survey submitted successfully!"); // Simulated alert, replace with actual database operation
    surveyForm.reset(); // Reset form after submission
    displayResults(); // Display results after submitting the survey
  });
});

// Display survey results
function displayResults() {
  const viewResultsSection = document.getElementById("viewResultsSection");
  // Results data, this is a display as if we were using a real database
  const resultsHTML = `
        <h1>Survey Results</h1>
        <br>
        <p>Total number of surveys: 10</p>
        <p>Average Age: 30</p>
        <p>Oldest person who participated in survey: 65</p>
        <p>Youngest person who participated in survey: 18</p>
        <br>
        <p>Percentage of people who like Pizza: 60%</p>
        <p>Percentage of people who like Pasta: 25%</p>
        <p>Percentage of people who like Pap and Wors: 10%</p>
        <br>
        <p>People who like to watch movies: 1.5</p>
        <p>People who like to listen to radio: 2.0</p>
        <p>People who like to eat out: 4.5</p>
        <p>People who like to watch TV: 2.0</p>
    `;
  viewResultsSection.innerHTML = resultsHTML;
}
//Function for reset button
document.addEventListener("DOMContentLoaded", function () {
  const resetButton = document.getElementById("resetResults");
  resetButton.addEventListener("click", resetSurveyResults);
});

//after submitting your results, you'll be able to reset them.
function resetSurveyResults() {
    fillSurveySection.style.display = "none";
    viewResultsSection.style.display = "block";
    viewResultsSection.innerHTML = "<p>No Surveys Available.</p>"; //
}
