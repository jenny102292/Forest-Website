const allNavItems = document.querySelectorAll('.nav__link')
const allSections = document.querySelectorAll('section')
const main = document.querySelector('main-page')
const nav = document.querySelector('.nav__list')
const btn = document.querySelector('.burger-btn')
const navLogo = document.querySelector('.nav__brand')

const handleScrollspy = () => {
	if (document.body.classList.contains('main-page')) {
		const sections = []

		allSections.forEach(section => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 66) {
				sections.push(section)

				const activeSection = document.querySelector(`[href*="${sections[0].id}"]`)
				allNavItems.forEach(item => item.classList.remove('active'))
				activeSection.classList.add('active')
			}
		})
	}
}

const showNav = () => {
	nav.classList.toggle('show')
}

const closeNav = () => {
	nav.classList.remove('show')
}

window.addEventListener('scroll', handleScrollspy)
btn.addEventListener('click', showNav)
navLogo.addEventListener('click', closeNav)
nav.addEventListener('click', closeNav)

const name = document.querySelector('#username')
const email = document.querySelector('#email')
const textarea = document.querySelector('#msg')
const clearBtn = document.querySelector('.clear')
const sendBtn = document.querySelector('.send')
const popup = document.querySelector('.popup')
const popupClose = document.querySelector('.close')

const showError = (input, bug) => {
	const contactBox = input.parentElement
	const errorMsg = contactBox.querySelector('.error-text')

	contactBox.classList.add('error');
	errorMsg.textContent = bug;
}

const clearError = input => {
	const contactBox = input.parentElement;
	contactBox.classList.remove('error');
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el);
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się min. ${min} znaków.`);
	}
}

const checkMail = email => {
	const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny.')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact-box');

	let numberOfErrors = 0;

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			numberOfErrors++;
		}
	})
	if (numberOfErrors === 0) {
		popup.classList.add('show-popup');
	}
}

sendBtn.addEventListener('click', e => {
	e.preventDefault();

	checkForm([username, email, textarea])
	checkLength(username, 3)
	checkLength(textarea, 3)
	checkMail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault();
	;[username, email, textarea].forEach(el => {
		el.value = '';
		clearError(el);
	})
})
