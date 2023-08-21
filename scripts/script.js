const daysInput = document.getElementById('days')
const monthsInput = document.getElementById('months')
const yearsInput = document.getElementById('years')

const calculateButton = document.getElementById('calculate')

let currentDays = 0
let currentMonths = 0
let currentYears = 0


const validationEmptyMessage = {
	days: 'This field is required',
	months: 'This field is required',
	years: 'This field is required'
}

const validationErrorMessage = {
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

let isLeapYear = false

function toggleError(target, condition) {
	if (condition)
		calculateButton.classList.remove('active')
	condition ? target.previousElementSibling.classList.add('error') : target.previousElementSibling.classList.remove('error')
	condition ? target.classList.add('error') : target.classList.remove('error')
	condition ? target.nextElementSibling.classList.add('error') : target.nextElementSibling.classList.remove('error')
}

function getData() {
	const isValid = daysInput.value && monthsInput.value && yearsInput.value
	const checkErrors = daysInput.classList.contains('error')
		|| monthsInput.classList.contains('error')
		|| yearsInput.classList.contains('error')
	if (isValid && !checkErrors) {
		return {
			days: daysInput.value,
			months: monthsInput.value,
			years: yearsInput.value
		}
	}
	else {
		if (!daysInput.value) {
			daysInput.nextElementSibling.textContent = validationEmptyMessage.days
			toggleError(daysInput, true)
		}
		if (!monthsInput.value) {
			monthsInput.nextElementSibling.textContent = validationEmptyMessage.months
			toggleError(monthsInput, true)
		}
		if (!yearsInput.value) {
			yearsInput.nextElementSibling.textContent = validationEmptyMessage.years
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

	const value = daysInput.target.value

	if (currentMonths) {
		if (currentMonths === '02' && isLeapYear && value === '29') {
			toggleError(daysInput.target, false)
			currentDays = '0'.repeat(2 - value.length) + value
		}
		else if (value !== '' && value < 1 || value > daysInMonths[currentMonths]) {
			toggleError(daysInput.target, true)
			daysInput.target.nextElementSibling.textContent = validationErrorMessage.days
		}
		else {
			toggleError(daysInput.target, false)
			currentDays = '0'.repeat(2 - value.length) + value
		}
	}
	else {
		if (value !== '' && value < 1 || value > 31) {
			toggleError(daysInput.target, true)
			daysInput.target.nextElementSibling.textContent = validationErrorMessage.days
		}
		else {
			toggleError(daysInput.target, false)
			currentDays = '0'.repeat(2 - value.length) + value
		}
	}
}


function validateMonthsInput(monthsInput) {
	monthsInput.target.value = checkValidity(monthsInput)

	checkFilledInputs()

	const value = monthsInput.target.value

	if (value < 1 || value > 12) {
		toggleError(monthsInput.target, true)
		monthsInput.target.nextElementSibling.textContent = validationErrorMessage.months
	}
	else {
		toggleError(monthsInput.target, false)
		currentMonths = '0'.repeat(2 - value.length) + value

		if (currentMonths === '02' && isLeapYear && daysInput.value === '29') {
			toggleError(daysInput, false)
		}
		else if (daysInput.value !== '' && daysInput.value < 1 || daysInput.value > daysInMonths[currentMonths]) {
			toggleError(daysInput, true)
		}
		else {
			toggleError(daysInput, false)
		}
	}
}

function validateYearsInput(yearsInput) {
	yearsInput.target.value = checkValidity(yearsInput)

	checkFilledInputs()


	const year = new Date()
	if (yearsInput.target.value > year.getFullYear()) {
		toggleError(yearsInput.target, true)
		yearsInput.target.nextElementSibling.textContent = validationErrorMessage.years
	}
	else {
		toggleError(yearsInput.target, false)
		currentYears = yearsInput.target.value
		if (currentYears % 4 === 0)
			isLeapYear = true
		else
			isLeapYear = false

		if (isLeapYear) {
			if (currentMonths === '02' && currentDays === '29') {
				toggleError(daysInput, false)
			}
		}
		else {
			if (currentMonths === '02' && currentDays === '29') {
				toggleError(daysInput, true)
			}
		}
	}
}

function calculateAge() {
	const data = getData()
	console.log(data)
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
	}
	else {
		calculateButton.classList?.remove('active')
		return
	}
}

function checkInputLength(input) {
	const value = input.target.value
	if (!value) {
		toggleError(input.target, false)
		return
	}

	if (value === '0') {
		return
	}

	if (value.length === 1) {
		input.target.value = '0' + value
	}

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