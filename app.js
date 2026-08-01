
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
// SCENARIO EXPORT
// ==============================


function exportScenario(){



let scenario = {


version:"0.7",



created:
new Date()
.toISOString(),




contract:{


startDay:
document.getElementById(
"startDay"
).value,


startMonth:
document.getElementById(
"startMonth"
).value,


startYear:
document.getElementById(
"startYear"
).value,


endDay:
document.getElementById(
"endDay"
).value,


endMonth:
document.getElementById(
"endMonth"
).value,


endYear:
document.getElementById(
"endYear"
).value


},





salary:{


type:
document.getElementById(
"salaryType"
).value,


amount:
document.getElementById(
"salaryAmount"
).value


},





taxResidency:
document.getElementById(
"taxResidency"
).value,




salaryChanges:[],


previousIncome:[],


bonuses:[],


benefits:[]


};








// Salary changes


document
.querySelectorAll(
"#salaryAdjustmentContainer .dynamic-row"
)
.forEach(row=>{


scenario.salaryChanges.push({


date:
row.querySelector(
".adjustmentDate"
).value,


amount:
row.querySelector(
".adjustmentSalary"
).value,


type:
row.querySelector(
".adjustmentType"
).value


});


});








// Previous income


document
.querySelectorAll(
"#previousContainer .dynamic-row"
)
.forEach(row=>{


scenario.previousIncome.push({


month:
row.querySelector(
".previousMonth"
).value,


income:
row.querySelector(
".previousIncome"
).value,


tax:
row.querySelector(
".previousTax"
).value


});


});









// Bonuses


document
.querySelectorAll(
"#bonusContainer .dynamic-row"
)
.forEach(row=>{


scenario.bonuses.push({


month:
row.querySelector(
".bonusDate"
).value,


amount:
row.querySelector(
".bonusAmount"
).value


});


});









// Benefits


document
.querySelectorAll(
"#benefitContainer .dynamic-row"
)
.forEach(row=>{


scenario.benefits.push({


name:
row.querySelector(
".benefitName"
).value,


amount:
row.querySelector(
".benefitAmount"
).value


});


});









let blob =
new Blob(

[
JSON.stringify(
scenario,
null,
2
)
],

{
type:"application/json"
}

);



let link =
document.createElement(
"a"
);



link.href =
URL.createObjectURL(blob);



link.download =
"china_salary_plan.json";



link.click();



}









// ==============================
// SCENARIO IMPORT
// ==============================


function importScenario(event){



let file =
event.target.files[0];



if(!file)
return;



let reader =
new FileReader();





reader.onload =
function(e){



let scenario =
JSON.parse(
e.target.result
);



loadScenario(
scenario
);



};




reader.readAsText(file);



}









function loadScenario(data){



// contract dates


document.getElementById(
"startDay"
)
.value =
data.contract.startDay;



document.getElementById(
"startMonth"
)
.value =
data.contract.startMonth;



document.getElementById(
"startYear"
)
.value =
data.contract.startYear;



document.getElementById(
"endDay"
)
.value =
data.contract.endDay;



document.getElementById(
"endMonth"
)
.value =
data.contract.endMonth;



document.getElementById(
"endYear"
)
.value =
data.contract.endYear;






// salary


document.getElementById(
"salaryType"
)
.value =
data.salary.type;



document.getElementById(
"salaryAmount"
)
.value =
data.salary.amount;



updateSalary();






// residency


document.getElementById(
"taxResidency"
)
.value =
data.taxResidency;









// salary changes


data.salaryChanges.forEach(
item=>{


addSalaryAdjustment();



let rows =
document.querySelectorAll(
"#salaryAdjustmentContainer .dynamic-row"
);



let row =
rows[
rows.length-1
];



row.querySelector(
".adjustmentDate"
)
.value =
item.date;



row.querySelector(
".adjustmentSalary"
)
.value =
item.amount;



row.querySelector(
".adjustmentType"
)
.value =
item.type;



}
);









// previous income


data.previousIncome.forEach(
item=>{


addPreviousIncome();



let rows =
document.querySelectorAll(
"#previousContainer .dynamic-row"
);



let row =
rows[
rows.length-1
];



row.querySelector(
".previousMonth"
)
.value =
item.month;



row.querySelector(
".previousIncome"
)
.value =
item.income;



row.querySelector(
".previousTax"
)
.value =
item.tax;



}
);








// bonuses


data.bonuses.forEach(
item=>{


addBonus();



let rows =
document.querySelectorAll(
"#bonusContainer .dynamic-row"
);



let row =
rows[
rows.length-1
];



row.querySelector(
".bonusDate"
)
.value =
item.month;



row.querySelector(
".bonusAmount"
)
.value =
item.amount;



}
);








// benefits


data.benefits.forEach(
item=>{


addBenefit();



let rows =
document.querySelectorAll(
"#benefitContainer .dynamic-row"
);



let row =
rows[
rows.length-1
];



row.querySelector(
".benefitName"
)
.value =
item.name;



row.querySelector(
".benefitAmount"
)
.value =
item.amount;



}
);



alert(
"Salary scenario imported successfully."
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



document
.getElementById(
"results"
)
.innerHTML = `



<div class="take-home-card">


<h2>

YOUR EXPECTED TAKE HOME

</h2>



<div class="take-home-value">

¥${averageTakeHome.toFixed(0)}

</div>



<p>

Average monthly amount received

</p>


</div>







<div class="summary-grid">



<div class="summary-card">

Contract Length

<strong>

${contractMonths} months

</strong>

</div>




<div class="summary-card">

Gross Income

<strong>

¥${totalGross.toFixed(0)}

</strong>

</div>





<div class="summary-card">

Estimated Tax

<strong>

¥${totalTax.toFixed(0)}

</strong>

</div>





<div class="summary-card">

Total Take Home

<strong>

¥${totalTakeHome.toFixed(0)}

</strong>

</div>



</div>







<h2>
Monthly Breakdown
</h2>




<table>


<tr>

<th>
Month
</th>


<th>
Gross
</th>


<th>
Tax
</th>


<th>
Take Home
</th>


</tr>



${rows}


</table>


`;



}