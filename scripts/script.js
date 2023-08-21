const daysInput = document.getElementById('days')
const monthsInput = document.getElementById('months')
const yearsInput = document.getElementById('years')

const calculateButton = document.getElementById('calculate')


const validationEmpty = {
	days: 'This field is required',
	months: 'This field is required',
	years: 'This field is required'
}

const validationError = {
	days: 'Must be a valid day',
	months: 'Must be a valid month',
	years: 'Must be in the past'
}

const yearsInputLength = Number(yearsInput.getAttribute('maxLength'))

const resultDays = document.getElementById('results__days')
const resultMonths = document.getElementById('result__months')
const resultYears = document.getElementById('results__years')

const daysInMonths = {
	'01': 31,
	'02': 28,
	'03': 31,
	'04': 30,
	'05': 31,
	'06': 30,
	'07': 31,
	'08': 31,
	'09': 30,
	'10': 31,
	'11': 30,
	'12': 31
}

function toggleError(target, condition) {
	condition ? target.previousElementSibling.classList.add('error') : target.previousElementSibling.classList.remove('error')
	condition ? target.classList.add('error') : target.classList.remove('error')
	condition ? target.nextElementSibling.classList.add('error') : target.nextElementSibling.classList.remove('error')
}

function getData() {
	const isValid = daysInput.value && monthsInput.value && yearsInput.value
	if (isValid) {
		return {
			days: daysInput.value,
			months: monthsInput.value,
			years: yearsInput.value
		}
	}
	else {
		if (!daysInput.value) {
			daysInput.nextElementSibling.textContent = validationEmpty.days
			toggleError(daysInput, true)
		}
		if (!monthsInput.value) {
			monthsInput.nextElementSibling.textContent = validationEmpty.months
			toggleError(monthsInput, true)
		}
		if (!yearsInput.value) {
			yearsInput.nextElementSibling.textContent = validationEmpty.years
			toggleError(yearsInput, true)
		}
		return null
	}
}

function checkValidity(inputValue) {
	const reg = /^\d*$/
	if (!reg.test(Number(inputValue.target.value))) {

		const clearValue = inputValue.target.value.split('')
		clearValue.splice(clearValue.length - 1, 1)

		return clearValue.join('')
	}

	return inputValue.target.value
}

function validateDaysInput(daysInput) {
	daysInput.target.value = checkValidity(daysInput)

	checkFilledInputs()

	const value = parseInt(daysInput.target.value)

	if (value < 1 || value > 31) {
		toggleError(daysInput.target, true)
		daysInput.target.nextElementSibling.textContent = validationError.days
	}
	else {
		toggleError(daysInput.target, false)
	}
}


function validateMonthsInput(monthsInput) {
	monthsInput.target.value = checkValidity(monthsInput)

	checkFilledInputs()

	const value = parseInt(monthsInput.target.value)

	if (value < 1 || value > 12) {
		toggleError(monthsInput.target, true)
		monthsInput.target.nextElementSibling.textContent = validationError.months
	}
	else {
		toggleError(monthsInput.target, false)
	}
}

function validateYearsInput(yearsInput) {
	yearsInput.target.value = checkValidity(yearsInput)

	checkFilledInputs()

	const value = parseInt(yearsInput.target.value)

	const year = new Date()
	if (value > year.getFullYear()) {
		toggleError(yearsInput.target, true)
		yearsInput.target.nextElementSibling.textContent = validationError.years
	}
	else {
		toggleError(yearsInput.target, false)
	}
}

function calculateAge() {
	const data = getData()

	if (data) {
		if (data.years.length < yearsInputLength)
			data.years = '0'.repeat(yearsInputLength - data.years.length) + data.years

		calculateButton.classList.add('active')

		const currentDate = new Date()
		const substractedDate = new Date(`${data.years}-${data.months}-${data.days}`)

		const differenceDate = new Date(currentDate - substractedDate);

		const differenceYears = differenceDate.getUTCFullYear() - 1970;
		const differenceMonths = differenceDate.getUTCMonth();
		const differenceDays = differenceDate.getUTCDate();

		resultYears.textContent = differenceYears
		resultMonths.textContent = differenceMonths
		resultDays.textContent = differenceDays

		console.log(differenceYears + " years, " + differenceMonths + " months, " + differenceDays + " days");
	}
	else {
		calculateButton.classList?.remove('active')
		return
	}
}

function checkInputLength(input) {
	const value = input.target.value

	if (value === '0')
		return

	if (value.length === 1)
		input.target.value = '0' + value
}

function checkFilledInputs() {
	if (daysInput.value.length && monthsInput.value.length && yearsInput.value.length)
		calculateButton.classList.add('active')
	else
		calculateButton.classList.remove('active')
}


daysInput.addEventListener('input', validateDaysInput)
daysInput.addEventListener('blur', checkInputLength)

monthsInput.addEventListener('input', validateMonthsInput)
monthsInput.addEventListener('blur', checkInputLength)

yearsInput.addEventListener('input', validateYearsInput)

calculateButton.addEventListener('click', calculateAge)