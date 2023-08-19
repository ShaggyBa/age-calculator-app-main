const daysInput = document.getElementById('days')
const monthsInput = document.getElementById('months')
const yearsInput = document.getElementById('years')

function getData() {
	const days = daysInput.value
	const months = monthsInput.value
	const years = yearsInput.value
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

	const value = parseInt(daysInput.target.value)

	if (value < 1 || value > 31) {
		daysInput.target.classList.add('error')
		daysInput.target.previousElementSibling.classList.add('error')

	}
	else {
		daysInput.target.classList?.remove('error')
		daysInput.target.previousElementSibling.classList?.remove('error')

	}
}


function validateMonthsInput(monthsInput) {
	monthsInput.target.value = checkValidity(monthsInput)

	const value = parseInt(monthsInput.target.value)

	if (value < 1 || value > 12) {
		monthsInput.target.classList.add('error')
		monthsInput.target.previousElementSibling.classList.add('error')

	}
	else {
		monthsInput.target.classList?.remove('error')
		monthsInput.target.previousElementSibling.classList?.remove('error')
	}
}

function validateYearsInput(yearsInput) {
	yearsInput.target.value = checkValidity(yearsInput)

	const value = parseInt(yearsInput.target.value)

	const year = new Date()
	if (value < 1900 || value > year.getFullYear()) {
		yearsInput.target.classList.add('error')
		yearsInput.target.previousElementSibling.classList.add('error')

	}
	else {
		yearsInput.target.classList?.remove('error')
		yearsInput.target.previousElementSibling.classList?.remove('error')
	}
}

function calculateAge(daysInput, monthsInput, yearsInput) {
	// Add calculation logic here
}

function checkInputLength(input) {
	const value = input.target.value

	if (value === '0')
		return

	if (value.length === 1)
		input.target.value = '0' + value
}

daysInput.addEventListener('input', validateDaysInput)
daysInput.addEventListener('blur', checkInputLength)

monthsInput.addEventListener('input', validateMonthsInput)
monthsInput.addEventListener('blur', checkInputLength)

yearsInput.addEventListener('input', validateYearsInput)
