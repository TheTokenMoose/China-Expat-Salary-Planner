let previousCounter = 0;
let salaryAdjustmentCounter = 0;
let bonusCounter = 0;
let benefitCounter = 0;

// ==============================
// TAX BRACKETS
// ==============================
const taxBrackets = [
    { limit: 36000,  rate: 0.03, deduction: 0 },
    { limit: 144000, rate: 0.10, deduction: 2520 },
    { limit: 300000, rate: 0.20, deduction: 16920 },
    { limit: 420000, rate: 0.25, deduction: 31920 },
    { limit: 660000, rate: 0.30, deduction: 52920 },
    { limit: 960000, rate: 0.35, deduction: 85920 },
    { limit: Infinity, rate: 0.45, deduction: 181920 }
];

// ==============================
// INSURANCE PRESETS
// ==============================
const insurancePresets = {
    shanghai:  { pension: 8, medical: 2, unemployment: 0.5, housing: 0 },
    beijing:   { pension: 8, medical: 2, unemployment: 0.5, housing: 5 },
    shenzhen:  { pension: 8, medical: 2, unemployment: 0.3, housing: 5 },
    guangzhou: { pension: 8, medical: 2, unemployment: 0.2, housing: 5 }
};

// ==============================
// MODE SWITCH
// ==============================
function toggleMode() {
    const mode = document.querySelector('input[name="calcMode"]:checked').value;
    const advanced = document.querySelectorAll("#fullOnly, #fullOnlySection");

    advanced.forEach(section => {
        if (mode === "quick") {
            section.classList.add("hidden");
        } else {
            section.classList.remove("hidden");
        }
    });
}

// ==============================
// SALARY DISPLAY
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const salary = document.getElementById("salaryAmount");
    const type = document.getElementById("salaryType");

    if (salary) salary.addEventListener("input", updateSalary);
    if (type) type.addEventListener("change", updateSalary);
});

function updateSalary() {
    let amount = Number(document.getElementById("salaryAmount").value) || 0;

    if (document.getElementById("salaryType").value === "annual") {
        amount = amount / 12;
    }

    document.getElementById("monthlyDisplay").innerHTML = "¥" + amount.toFixed(0);
}

// ==============================
// SALARY ADJUSTMENTS
// ==============================
function addSalaryAdjustment() {
    salaryAdjustmentCounter++;
    const id = "salaryAdjustment" + salaryAdjustmentCounter;
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.id = id;

    div.innerHTML = `
        <div>
            <label>Effective Month</label>
            <input type="month" class="adjustmentDate">
        </div>
        <div>
            <label class="adjustmentAmountLabel">New Monthly Salary</label>
            <input type="number" class="adjustmentSalary" value="0">
        </div>
        <div>
            <label>Adjustment Type</label>
            <select class="adjustmentType" onchange="updateAdjustmentLabel(this)">
                <option value="ongoing">From this month onwards</option>
                <option value="one_time">One-time adjustment</option>
            </select>
        </div>
        <div>
            <button onclick="removeRow('${id}')">Remove</button>
        </div>
    `;

    document.getElementById("salaryAdjustmentContainer").appendChild(div);
}

function updateAdjustmentLabel(select) {
    const row = select.closest(".dynamic-row");
    const label = row.querySelector(".adjustmentAmountLabel");

    if (select.value === "one_time") {
        label.innerHTML = "Additional Payment";
    } else {
        label.innerHTML = "New Monthly Salary";
    }
}

// ==============================
// PREVIOUS INCOME
// ==============================
function addPreviousIncome() {
    previousCounter++;
    const id = "previous" + previousCounter;
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.id = id;

    div.innerHTML = `
        <div>
            <label>Month</label>
            <input type="month" class="previousMonth">
        </div>
        <div>
            <label>Gross Income</label>
            <input type="number" class="previousIncome" value="0">
        </div>
        <div>
            <label>Tax Paid</label>
            <input type="number" class="previousTax" value="0">
        </div>
        <div>
            <button onclick="removeRow('${id}')">Remove</button>
        </div>
    `;

    document.getElementById("previousContainer").appendChild(div);
}

// ==============================
// BONUS
// ==============================
function addBonus() {
    bonusCounter++;
    const id = "bonus" + bonusCounter;
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.id = id;

    div.innerHTML = `
        <div>
            <label>Bonus Month</label>
            <input type="month" class="bonusDate">
        </div>
        <div>
            <label>Bonus Amount</label>
            <input type="number" class="bonusAmount" value="0">
        </div>
        <div>
            <button onclick="removeRow('${id}')">Remove</button>
        </div>
    `;

    document.getElementById("bonusContainer").appendChild(div);
}

// ==============================
// BENEFITS
// ==============================
function addBenefit() {
    benefitCounter++;
    const id = "benefit" + benefitCounter;
    const div = document.createElement("div");
    div.className = "dynamic-row";
    div.id = id;

    div.innerHTML = `
        <div>
            <label>Benefit Name</label>
            <input class="benefitName" placeholder="e.g. Housing">
        </div>
        <div>
            <label>Monthly Value</label>
            <input type="number" class="benefitAmount" value="0">
        </div>
        <div>
            <button onclick="removeRow('${id}')">Remove</button>
        </div>
    `;

    document.getElementById("benefitContainer").appendChild(div);
}

function removeRow(id) {
    const row = document.getElementById(id);
    if (row) row.remove();
}

// ==============================
// INSURANCE
// ==============================
function toggleInsurance() {
    const value = document.getElementById("insuranceEnabled").value;
    const box = document.getElementById("insuranceSettings");

    if (value === "yes") {
        box.classList.remove("hidden");
    } else {
        box.classList.add("hidden");
    }
}

function loadInsurancePreset() {
    const location = document.getElementById("insuranceLocation").value;
    if (location === "manual") return;

    const preset = insurancePresets[location];
    document.getElementById("pensionRate").value = preset.pension;
    document.getElementById("medicalRate").value = preset.medical;
    document.getElementById("unemploymentRate").value = preset.unemployment;
    document.getElementById("housingRate").value = preset.housing;
}

// ==============================
// TAX GUIDE
// ==============================
function toggleTaxGuide() {
    document.getElementById("taxGuide").classList.toggle("hidden");
}

// ==============================
// DATE HELPERS
// ==============================
function getDate(prefix) {
    if (prefix === "start") {
        const val = document.getElementById("startDate").value;
        return val ? new Date(val) : new Date(NaN);
    }
    if (prefix === "end") {
        const val = document.getElementById("endDate").value;
        return val ? new Date(val) : new Date(NaN);
    }
    return new Date(NaN);
}

function buildTimeline(start, end) {
    const months = [];
    let current = new Date(start.getFullYear(), start.getMonth(), 1);

    while (current <= end) {
        months.push({
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            income: 0,
            bonus: 0,
            benefits: 0,
            insurance: 0,
            tax: 0,
            takeHome: 0
        });
        current.setMonth(current.getMonth() + 1);
    }

    return months;
}

function calculateTax(amount) {
    for (const bracket of taxBrackets) {
        if (amount <= bracket.limit) {
            return amount * bracket.rate - bracket.deduction;
        }
    }
    return 0;
}

// ==============================
// MAIN CALCULATOR - v0.9
// ==============================
function calculate() {
    const mode = document.querySelector('input[name="calcMode"]:checked').value;
    const start = getDate("start");
    const end = getDate("end");

    // Validation
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        alert("Please enter valid Start and End dates.");
        return;
    }
    if (end < start) {
        alert("End date must be after Start date.");
        return;
    }

    const timeline = buildTimeline(start, end);

    // Starting salary
    let salary = Number(document.getElementById("salaryAmount").value) || 0;
    if (document.getElementById("salaryType").value === "annual") {
        salary = salary / 12;
    }

    // Base fill
    timeline.forEach(month => {
        month.income = salary;
        month.bonus = 0;
        month.benefits = 0;
        month.insurance = 0;
        month.tax = 0;
        month.takeHome = 0;
    });

    // ---------- Full mode only ----------
    if (mode === "full") {

        // 1. Salary Adjustments
        const changes = [];
        document.querySelectorAll("#salaryAdjustmentContainer .dynamic-row").forEach(row => {
            const dateVal = row.querySelector(".adjustmentDate").value;
            if (!dateVal) return;
            changes.push({
                date: dateVal,
                amount: Number(row.querySelector(".adjustmentSalary").value) || 0,
                type: row.querySelector(".adjustmentType").value
            });
        });
        changes.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Ongoing changes
        timeline.forEach(month => {
            let currentSalary = salary;
            changes.forEach(change => {
                const parts = change.date.split("-");
                const changeYear = Number(parts[0]);
                const changeMonth = Number(parts[1]);
                if (changeYear < month.year || (changeYear === month.year && changeMonth <= month.month)) {
                    if (change.type === "ongoing") {
                        currentSalary = change.amount;
                    }
                }
            });
            month.income = currentSalary;
        });

        // One-time adjustments
        changes.forEach(change => {
            if (change.type === "one_time") {
                const parts = change.date.split("-");
                const target = timeline.find(m => m.year === Number(parts[0]) && m.month === Number(parts[1]));
                if (target) target.income += change.amount;
            }
        });

        // 2. Bonuses
        document.querySelectorAll("#bonusContainer .dynamic-row").forEach(row => {
            const dateVal = row.querySelector(".bonusDate").value;
            const amount = Number(row.querySelector(".bonusAmount").value) || 0;
            if (!dateVal || amount === 0) return;

            const parts = dateVal.split("-");
            const target = timeline.find(m => m.year === Number(parts[0]) && m.month === Number(parts[1]));
            if (target) target.bonus += amount;
        });

        // 3. Benefits (untaxed)
        let monthlyBenefits = 0;
        document.querySelectorAll("#benefitContainer .dynamic-row").forEach(row => {
            monthlyBenefits += Number(row.querySelector(".benefitAmount").value) || 0;
        });
        timeline.forEach(month => {
            month.benefits = monthlyBenefits;
        });

        // 4. Social Insurance
        const insuranceEnabled = document.getElementById("insuranceEnabled").value === "yes";
        let insuranceRate = 0;
        if (insuranceEnabled) {
            insuranceRate =
                (Number(document.getElementById("pensionRate").value) || 0) +
                (Number(document.getElementById("medicalRate").value) || 0) +
                (Number(document.getElementById("unemploymentRate").value) || 0) +
                (Number(document.getElementById("housingRate").value) || 0);
            insuranceRate = insuranceRate / 100;
        }
        timeline.forEach(month => {
            month.insurance = month.income * insuranceRate;
        });
    }

    // ---------- Tax Calculation ----------
    const resident = document.getElementById("taxResidency").value !== "nonresident";
    let cumulativeIncome = 0;
    let cumulativeTax = 0;

    // Previous income seed
    let previousIncomeTotal = 0;
    let previousTaxTotal = 0;

    if (mode === "full") {
        document.querySelectorAll("#previousContainer .dynamic-row").forEach(row => {
            previousIncomeTotal += Number(row.querySelector(".previousIncome").value) || 0;
            previousTaxTotal += Number(row.querySelector(".previousTax").value) || 0;
        });
    }

    if (resident && mode === "full") {
        cumulativeIncome = previousIncomeTotal;
        cumulativeTax = previousTaxTotal;
    }

    let totalGross = 0;
    let totalTax = 0;
    let totalInsurance = 0;
    let totalBenefits = 0;
    let totalTakeHome = 0;
    let rows = "";

    timeline.forEach(month => {
        let taxableThisMonth = month.income + month.bonus - month.insurance;
        if (taxableThisMonth < 0) taxableThisMonth = 0;

        let tax = 0;

        if (resident) {
            if (month.month === 1) {
                cumulativeIncome = 0;
                cumulativeTax = 0;
            }

            cumulativeIncome += taxableThisMonth;

            const monthsSoFar = month.month;
            const standardDeduction = monthsSoFar * 5000;
            const taxableYTD = Math.max(0, cumulativeIncome - standardDeduction);

            const yearlyTax = calculateTax(taxableYTD);
            tax = yearlyTax - cumulativeTax;
            if (tax < 0) tax = 0;
            cumulativeTax = yearlyTax;
        } else {
            const taxable = Math.max(0, taxableThisMonth - 5000);
            tax = calculateTax(taxable);
        }

        month.tax = tax;
        month.takeHome = month.income + month.bonus - month.insurance - tax + month.benefits;

        totalGross += month.income + month.bonus;
        totalTax += tax;
        totalInsurance += month.insurance;
        totalBenefits += month.benefits;
        totalTakeHome += month.takeHome;

        rows += `
        <tr>
            <td>${month.month}/${month.year}</td>
            <td>¥${(month.income + month.bonus).toFixed(0)}</td>
            <td>¥${month.insurance.toFixed(0)}</td>
            <td>¥${tax.toFixed(0)}</td>
            <td>¥${month.benefits.toFixed(0)}</td>
            <td>¥${month.takeHome.toFixed(0)}</td>
        </tr>`;
    });

    // ---------- Dashboard ----------
    const contractMonths = timeline.length;
    const averageTakeHome = contractMonths > 0 ? totalTakeHome / contractMonths : 0;

    document.getElementById("results").innerHTML = `
    <div class="hero-result">
        <div class="hero-title">Estimated Monthly Take Home</div>
        <div class="hero-value">¥${averageTakeHome.toFixed(0)}</div>
        <div class="hero-subtitle">Average monthly amount over the contract period</div>
    </div>

    <div class="summary-grid">
        <div class="summary-card">
            <span>Contract Length</span>
            <strong>${contractMonths} months</strong>
        </div>
        <div class="summary-card">
            <span>Total Gross</span>
            <strong>¥${totalGross.toFixed(0)}</strong>
        </div>
        <div class="summary-card">
            <span>Total Tax</span>
            <strong>¥${totalTax.toFixed(0)}</strong>
        </div>
        <div class="summary-card">
            <span>Total Insurance</span>
            <strong>¥${totalInsurance.toFixed(0)}</strong>
        </div>
        <div class="summary-card">
            <span>Total Benefits</span>
            <strong>¥${totalBenefits.toFixed(0)}</strong>
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
                <th>Insurance</th>
                <th>Tax</th>
                <th>Benefits</th>
                <th>Take Home</th>
            </tr>
            ${rows}
        </table>
    </div>
    `;
}

// ==============================
// PDF EXPORT - v0.9
// ==============================
function exportPDF() {
    if (!document.querySelector(".hero-value")) {
        alert("Please calculate first before generating the PDF.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    let y = 20;

    function addLine(text, size = 12) {
        pdf.setFontSize(size);
        pdf.text(text, 20, y);
        y += 8;
    }

    // Title
    addLine("China Expat Salary Planner", 18);
    addLine("Salary Estimate Report", 13);
    addLine("Generated: " + new Date().toLocaleDateString(), 10);
    y += 6;

    // Main result
    addLine("Estimated Monthly Take Home", 14);
    addLine(document.querySelector(".hero-value").innerText, 20);
    y += 6;

    // Summary
    addLine("Summary", 14);
    document.querySelectorAll(".summary-card").forEach(card => {
        const text = card.innerText.replace(/\n/g, "  •  ");
        addLine(text, 11);
    });
    y += 8;

    // Table
    pdf.setFontSize(14);
    pdf.text("Monthly Breakdown", 20, y);
    y += 6;

    const tableData = [];
    document.querySelectorAll("#results table tr").forEach((row, index) => {
        const cells = Array.from(row.querySelectorAll("th, td")).map(cell => cell.innerText);
        if (index > 0) tableData.push(cells);
    });

    pdf.autoTable({
        startY: y,
        head: [["Month", "Gross", "Insurance", "Tax", "Benefits", "Take Home"]],
        body: tableData,
        margin: { left: 15, right: 15 },
        styles: { fontSize: 9 },
        headStyles: { fillColor: [37, 99, 235] }
    });

    y = pdf.lastAutoTable.finalY + 12;

    // Disclaimer
    addLine("Disclaimer", 12);
    pdf.setFontSize(9);
    pdf.text(
        "This calculator provides estimates only. Actual salary payments may differ due to employer policies, government regulations, social insurance rules, and individual circumstances. Always verify final figures with your employer and official sources.",
        20,
        y,
        { maxWidth: 170 }
    );

    pdf.save("China-Expat-Salary-Report.pdf");
}