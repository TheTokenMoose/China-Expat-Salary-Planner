let previousCounter = 0;
let salaryAdjustmentCounter = 0;
let bonusCounter = 0;
let benefitCounter = 0;
// ==============================
// TAX BRACKETS
// ==============================
const taxBrackets = [
{
limit:36000,
rate:0.03,
deduction:0
},
{
limit:144000,
rate:0.10,
deduction:2520
},
{
limit:300000,
rate:0.20,
deduction:16920
},
{
limit:420000,
rate:0.25,
deduction:31920
},
{
limit:660000,
rate:0.30,
deduction:52920
},
{
limit:960000,
rate:0.35,
deduction:85920
},
{
limit:Infinity,
rate:0.45,
deduction:181920
}
];
// ==============================
// INSURANCE PRESETS
// ==============================
const insurancePresets = {
shanghai:{
pension:8,
medical:2,
unemployment:0.5,
housing:0
},
beijing:{
pension:8,
medical:2,
unemployment:0.5,
housing:5
},
shenzhen:{
pension:8,
medical:2,
unemployment:0.3,
housing:5
},
guangzhou:{
pension:8,
medical:2,
unemployment:0.2,
housing:5
}
};
// ==============================
// MODE SWITCH
// ==============================
function toggleMode(){
let mode =
document.querySelector(
'input[name="calcMode"]:checked'
)
.value;
let advanced =
document.querySelectorAll(
"#fullOnly,#fullOnlySection"
);
advanced.forEach(section=>{
if(mode==="quick"){
section.classList.add("hidden");
}
else{
section.classList.remove("hidden");
}
});
}
// ==============================
// SALARY DISPLAY
// ==============================
document
.addEventListener(
"DOMContentLoaded",
()=>{
let salary =
document.getElementById(
"salaryAmount"
);
let type =
document.getElementById(
"salaryType"
);
if(salary){
salary.addEventListener(
"input",
updateSalary
);
}
if(type){
type.addEventListener(
"change",
updateSalary
);
}
}
);
function updateSalary(){
let amount =
Number(
document.getElementById(
"salaryAmount"
).value
);
if(
document.getElementById(
"salaryType"
).value==="annual"
){
amount/=12;
}
document.getElementById(
"monthlyDisplay"
)
.innerHTML =
"¥"+amount.toFixed(0);
}
// ==============================
// SALARY ADJUSTMENTS
// ==============================
function addSalaryAdjustment(){
salaryAdjustmentCounter++;
let id =
"salaryAdjustment"+salaryAdjustmentCounter;
let div =
document.createElement("div");
div.className="dynamic-row";
div.id=id;
div.innerHTML=`
<label>
Effective Month
</label>
<input
type="month"
class="adjustmentDate">
<label class="adjustmentAmountLabel">
New Monthly Salary
</label>
<input
type="number"
class="adjustmentSalary"
value="0">
<label>
Adjustment Type
</label>
<select
class="adjustmentType"
onchange="updateAdjustmentLabel(this)">
<option value="ongoing">
From this month onwards
</option>
<option value="one_time">
One-time adjustment
</option>
</select>
<button onclick="removeRow('${id}')">
Remove
</button>
`;
document
.getElementById(
"salaryAdjustmentContainer"
)
.appendChild(div);
}
function updateAdjustmentLabel(select){
let row =
select.closest(".dynamic-row");
let label =
row.querySelector(
".adjustmentAmountLabel"
);
if(
select.value==="one_time"
){
label.innerHTML =
"Additional Payment";
}
else{
label.innerHTML =
"New Monthly Salary";
}
}
// ==============================
// PREVIOUS INCOME
// ==============================
function addPreviousIncome(){
previousCounter++;
let id =
"previous"+previousCounter;
let div =
document.createElement("div");
div.className="dynamic-row";
div.id=id;
div.innerHTML=`
<label>
Month
</label>
<input
type="month"
class="previousMonth">
<label>
Gross Income
</label>
<input
type="number"
class="previousIncome"
value="0">
<label>
Tax Paid
</label>
<input
type="number"
class="previousTax"
value="0">
<button onclick="removeRow('${id}')">
Remove
</button>
`;
document
.getElementById(
"previousContainer"
)
.appendChild(div);
}
// ==============================
// BONUS
// ==============================
function addBonus(){
bonusCounter++;
let id =
"bonus"+bonusCounter;
let div =
document.createElement("div");
div.className="dynamic-row";
div.id=id;
div.innerHTML=`
<label>
Bonus Month
</label>
<input
type="month"
class="bonusDate">
<label>
Bonus Amount
</label>
<input
type="number"
class="bonusAmount"
value="0">
<button onclick="removeRow('${id}')">
Remove
</button>
`;
document
.getElementById(
"bonusContainer"
)
.appendChild(div);
}
// ==============================
// BENEFITS
// ==============================
function addBenefit(){
benefitCounter++;
let id =
"benefit"+benefitCounter;
let div =
document.createElement("div");
div.className="dynamic-row";
div.id=id;
div.innerHTML=`
<label>
Benefit Name
</label>
<input
class="benefitName">
<label>
Monthly Value
</label>
<input
type="number"
class="benefitAmount"
value="0">
<button onclick="removeRow('${id}')">
Remove
</button>
`;
document
.getElementById(
"benefitContainer"
)
.appendChild(div);
}
function removeRow(id){
let row =
document.getElementById(id);
if(row){
row.remove();
}
}
// ==============================
// INSURANCE
// ==============================
function toggleInsurance(){
let value =
document.getElementById(
"insuranceEnabled"
)
.value;
let box =
document.getElementById(
"insuranceSettings"
);
if(value==="yes"){
box.classList.remove(
"hidden"
);
}
else{
box.classList.add(
"hidden"
);
}
}
function loadInsurancePreset(){
let location =
document.getElementById(
"insuranceLocation"
)
.value;
if(location==="manual")
return;
let preset =
insurancePresets[location];
document.getElementById(
"pensionRate"
)
.value =
preset.pension;
document.getElementById(
"medicalRate"
)
.value =
preset.medical;
document.getElementById(
"unemploymentRate"
)
.value =
preset.unemployment;
document.getElementById(
"housingRate"
)
.value =
preset.housing;
}
// ==============================
// TAX GUIDE
// ==============================
function toggleTaxGuide(){
document
.getElementById(
"taxGuide"
)
.classList
.toggle(
"hidden"
);
}
// ==============================
// DATE HELPERS
// ==============================
function getDate(prefix){
return new Date(
Number(
document.getElementById(prefix+"Year").value
),
Number(
document.getElementById(prefix+"Month").value
)-1,

Number(
document.getElementById(prefix+"Day").value
)

);


}







function buildTimeline(start,end){


let months=[];


let current =
new Date(
start.getFullYear(),
start.getMonth(),
1
);



while(current<=end){


months.push({

year:
current.getFullYear(),

month:
current.getMonth()+1,

income:0,

bonus:0,

taxPaid:0

});


current.setMonth(
current.getMonth()+1
);


}



return months;

}









function calculateTax(amount){


for(let bracket of taxBrackets){


if(amount<=bracket.limit){


return (

amount *
bracket.rate
-
bracket.deduction

);


}

}


return 0;


}









// ==============================
// MAIN CALCULATOR
// ==============================
function calculate(){
let mode =
document.querySelector(
'input[name="calcMode"]:checked'
)
.value;
let start =
getDate("start");
let end =
getDate("end");
let timeline =
buildTimeline(
start,
end
);
let salary =
Number(
document.getElementById(
"salaryAmount"
).value
);
if(
document.getElementById(
"salaryType"
).value==="annual"
){
salary/=12;
}
timeline.forEach(month=>{
month.income =
salary;
});
// ==============================
// SALARY CHANGES
// ==============================
if(mode==="full"){
let changes=[];
document
.querySelectorAll(
"#salaryAdjustmentContainer .dynamic-row"
)
.forEach(row=>{
changes.push({
date:
row.querySelector(
".adjustmentDate"
).value,
amount:
Number(
row.querySelector(
".adjustmentSalary"
).value
),
type:
row.querySelector(
".adjustmentType"
).value
});
});
changes.sort(
(a,b)=>
new Date(a.date)
-
new Date(b.date)
);
timeline.forEach(month=>{
let currentSalary =
salary;
changes.forEach(change=>{
let parts =
change.date.split("-");
if(
Number(parts[0]) < month.year
||
(
Number(parts[0])===month.year
&&
Number(parts[1])<=month.month
)
){
if(change.type==="ongoing"){
currentSalary =
change.amount;
}
}
});
month.income =
currentSalary;
});
// one time payments
changes.forEach(change=>{
if(change.type==="one_time"){
let parts =
change.date.split("-");
let target =
timeline.find(month=>
month.year===Number(parts[0])
&&
month.month===Number(parts[1])
);
if(target){
target.income +=
change.amount;
}
}
});
}
// ==============================
// TAX
// ==============================
let resident =
document.getElementById(
"taxResidency"
)
.value !== "nonresident";
let cumulativeIncome=0;
let cumulativeTax=0;
let totalGross=0;
let totalTax=0;
let totalTakeHome=0;
let totalBonus=0;
let totalBonusTax=0;
let rows="";
timeline.forEach(month=>{
let tax=0;
if(resident){
if(month.month===1){
cumulativeIncome=0;
cumulativeTax=0;
}
cumulativeIncome +=
month.income;
let taxable =
Math.max(
0,
cumulativeIncome -
(month.month*5000)
);
let yearlyTax =
calculateTax(
taxable
);
tax =
yearlyTax -
cumulativeTax;
cumulativeTax =
yearlyTax;
}
else{
let taxable =
Math.max(
0,
month.income-5000
);
tax =
calculateTax(
taxable
);
}
let takeHome =
month.income-tax;
totalGross +=
month.income;
totalTax +=
tax;
totalTakeHome +=
takeHome;
rows +=`
<tr>
<td>
${month.month}/${month.year}
</td>
<td>
¥${month.income.toFixed(0)}
</td>
<td>
¥${tax.toFixed(0)}
</td>
<td>
¥${takeHome.toFixed(0)}
</td>
</tr>
`;
});
// ==============================
// DASHBOARD
// ==============================
let contractMonths =
timeline.length;
let averageTakeHome =
totalTakeHome /
contractMonths;
document.getElementById("results").innerHTML = `

<div class="hero-result">

    <div class="hero-title">
        Estimated Monthly Take Home
    </div>

    <div class="hero-value">
        ¥${averageTakeHome.toFixed(0)}
    </div>

    <div class="hero-subtitle">
        Average monthly amount over the contract period
    </div>

</div>

<div class="summary-grid">

    <div class="summary-card">
        <span>Contract Length</span>
        <strong>${contractMonths} months</strong>
    </div>

    <div class="summary-card">
        <span>Gross Income</span>
        <strong>¥${totalGross.toFixed(0)}</strong>
    </div>

    <div class="summary-card">
        <span>Estimated Tax</span>
        <strong>¥${totalTax.toFixed(0)}</strong>
    </div>

    <div class="summary-card">
        <span>Total Take Home</span>
        <strong>¥${totalTakeHome.toFixed(0)}</strong>
    </div>

</div>

<div class="results-section">

<h2>Monthly Breakdown</h2>

<table>

<tr>

<th>Month</th>

<th>Gross</th>

<th>Tax</th>

<th>Take Home</th>

</tr>

${rows}

</table>

</div>

`;
}
// ==============================
// PDF EXPORT
// ==============================

function exportPDF(){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();


    let y = 20;


    function addLine(text, size = 12){

        pdf.setFontSize(size);

        pdf.text(
            text,
            20,
            y
        );

        y += 8;

    }


    // TITLE

    addLine(
        "China Expat Salary Planner",
        18
    );


    addLine(
        "Salary Estimate Report",
        12
    );


    y += 8;


    // MAIN RESULT

    addLine(
        "Estimated Monthly Take Home",
        14
    );


    addLine(
        document.querySelector(".hero-value").innerText,
        18
    );


    y += 8;


    // SUMMARY

    addLine(
        "Summary",
        14
    );


    const summaryCards =
    document.querySelectorAll(
        ".summary-card"
    );


    summaryCards.forEach(card => {

        addLine(
            card.innerText
            .replace(/\n/g," - ")
        );

    });


    y += 10;


    // MONTHLY TABLE
// MONTHLY TABLE

pdf.setFontSize(14);

pdf.text(
    "Monthly Breakdown",
    20,
    y
);


let tableData = [];


document
.querySelectorAll("#results table tr")
.forEach((row,index)=>{


    let cells =
    Array.from(
        row.querySelectorAll(
            "th, td"
        )
    )
    .map(cell =>
        cell.innerText
    );


    if(index > 0){

        tableData.push(cells);

    }


});


pdf.autoTable({

    startY: y + 5,

    head: [
        [
            "Month",
            "Gross",
            "Tax",
            "Take Home"
        ]
    ],

    body: tableData,

    margin:{
        left:20,
        right:20
    }

});


y =
pdf.lastAutoTable.finalY + 15;

    addLine(
        "Disclaimer",
        12
    );


    pdf.text(
        "This calculator provides estimates only. Actual salary payments may differ due to employer policies, government regulations and individual circumstances.",
        20,
        y,
        {
            maxWidth:170
        }
    );


    pdf.save(
        "China-Expat-Salary-Report.pdf"
    );

}