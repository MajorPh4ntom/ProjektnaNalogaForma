// ime in priimek validator
const imeInput = document.getElementById('imeInput');
const priimekInput = document.getElementById('priimekInput');

function restrictToLetters(input) {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-ZčČžŽšŠ\s]/g, '');
    });
}

restrictToLetters(imeInput);
restrictToLetters(priimekInput);

// validiranje datuma
const datumInput = document.querySelector('input[name="lRoj"]');
const today = new Date().toISOString().split('T')[0];
datumInput.setAttribute('max', today);

// validiranje gesla
const passwordInput = document.getElementById('geslo1');
const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
const validationMessage = document.getElementById('preverjanjeSms');

function validatePassword(password) {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const uppercaseRegex = /[A-Z]/;

    if (password.length < minLength) {
        return 'Geslo mora biti dolgo vsaj 8 znakov.';
    }
    if (!specialCharRegex.test(password)) {
        return 'Geslo mora vsebovati vsaj eno posebno značko.';
    }
    if (!numberRegex.test(password)) {
        return 'Geslo mora vsebovati vsaj eno številko.';
    }
    if (!uppercaseRegex.test(password)) {
        return 'Geslo mora vsebovati vsaj eno veliko črko.';
    }
    return '';
}

passwordInput.addEventListener('input', function () {
    const password = passwordInput.value;
    const message = validatePassword(password);

    if (message) {
        validationMessage.textContent = message;
        validationMessage.style.color = 'red';
        passwordInput.style.borderColor = 'red';
    } else {
        validationMessage.textContent = 'Geslo je veljavno!';
        validationMessage.style.color = 'green';
        passwordInput.style.borderColor = 'green';
    }
});

// glvna forma validator
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // ne sme ce ni pogoj izpolnjen

    const ime = imeInput.value.trim();
    const priimek = priimekInput.value.trim();
    const datum = datumInput.value;
    const email = document.getElementById("mailInput").value.trim();
    const geslo1 = passwordInput.value.trim();
    const geslo2 = confirmPasswordInput.value.trim();
    const spol = document.querySelector('input[name="spol"]:checked');

    // alert za usak specificen field
    if (!ime) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosimo, vnesite ime!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!priimek) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosimo, vnesite priimek!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!datum) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosimo, vnesite datum rojstva!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosimo, vnesite e-poštni naslov!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!geslo1) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosimo, vnesite geslo!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!geslo2) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosimo, ponovno vnesite geslo!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!spol) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosimo, izberite spol!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    // se preveri gesla ce sta enaka
    if (geslo1 !== geslo2) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Gesli se ne ujemata!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    // preveri ce geslo ima izpolnjene pogoje
    const message = validatePassword(geslo1);
    if (message) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Geslo ni veljavno! Preverite zahteve.',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    // ce use stima dovoli
    Swal.fire({
        icon: 'success',
        title: 'Uspeh!',
        text: 'Račun uspešno ustvarjen!',
        customClass: {
            title: 'my-title',
            htmlContainer: 'my-text',
            confirmButton: 'my-confirm-button'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'forma.html'; // Redirect to the home page
        }
    });
});
