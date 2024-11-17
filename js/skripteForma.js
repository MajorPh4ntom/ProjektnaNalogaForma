const telInput = document.getElementById('telInput');
const validationSms = document.getElementById('preverjanjeSms');
const imeInput = document.getElementById('imeInput');
const priimekInput = document.getElementById('priimekInput');
const krajInput = document.getElementById('krajInput');
const selectRoj = document.getElementById('selectRoj');
const emsoInput = document.getElementById('EMSOInput');
const naslovInput = document.getElementById('naslovInput');
const inputKoda = document.getElementById('inputKoda');
const emailInput = document.getElementById('mailInput');
const radioInputs = document.getElementsByName('zivi'); // For KJE STANUJETE
const datumInput = document.getElementById('datumInput'); // Date input

// formatira in validira
telInput.addEventListener('input', function () {
    const inputValue = telInput.value.replace(/\D/g, ''); // odstrani use crke
    const formattedValue = formatPhoneNumber(inputValue);
    telInput.value = formattedValue;

    if (validatePhoneNumber(formattedValue)) {
        validationSms.textContent = 'Veljavna številka';
        validationSms.style.color = 'green';
    } else {
        validationSms.textContent = 'Neveljavna številka';
        validationSms.style.color = 'red';
    }
});

// omeji EMSO sam na 13 znakov in sam na cifre
emsoInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 13);
});

// omeji ZIP na 4 cifre
inputKoda.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);
});

// samo crke na IME, PRIIMEK, KRAJ
[imeInput, priimekInput, krajInput].forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-ZčČžŽšŠ\s]/g, '');
    });
});

// samo cifre/crke/presledke na NASLOV
naslovInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9a-zA-Z ]/g, '');
});

// da max na datum tak da nemres zbrat u prihodnost
const today = new Date().toISOString().split('T')[0];
datumInput.setAttribute('max', today);

// formatira telefonsko kot 123-456-789
function formatPhoneNumber(value) {
    if (value.length < 4) return value;
    if (value.length < 7) {
        return value.slice(0, 3) + '-' + value.slice(3);
    }
    return value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 9);
}

// validira telefonsko
function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{3}-\d{3}-\d{3}$/;
    return phoneRegex.test(phone);
}

// validira celo formo
function validateForm() {
    const ime = imeInput.value.trim();
    const priimek = priimekInput.value.trim();
    const krajRojstva = selectRoj.value;
    const telefon = telInput.value.trim();
    const emso = emsoInput.value.trim();
    const naslov = naslovInput.value.trim();
    const kraj = krajInput.value.trim();
    const postnaStevilka = inputKoda.value.trim();
    const email = emailInput.value.trim();
    const datumRojstva = datumInput.value.trim();

    // validira ce je use izpolnjeno in pravilno
    if (!ime) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, vnesite ime!',
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
            text: 'Prosim, vnesite priimek!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (krajRojstva === "0") {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, izberite kraj rojstva!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!datumRojstva) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, izberite datum rojstva!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!emso || emso.length !== 13) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, vnesite veljaven EMŠO!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!naslov) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, vnesite naslov!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!kraj) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, vnesite prebivališče!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (postnaStevilka.length !== 4) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, vnesite veljavno poštno številko!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!validatePhoneNumber(telefon)) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, vnesite veljavno telefonsko številko!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (!email || !validateEmail(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, vnesite veljaven e-mail!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    if (![...radioInputs].some(input => input.checked)) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka!',
            text: 'Prosim, označite kje stanujete!',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-denied-button'
            }
        });
        return false;
    }

    // ce je use ok da en message
    Swal.fire({
        icon: 'success',
        title: 'Uspeh!',
        text: 'Prijavnica uspešno oddana!',
        confirmButtonText: 'OK',
            customClass: {
                title: 'my-title',
                htmlContainer: 'my-text',
                confirmButton: 'my-confirm-button'
            }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '../index.html'; // Redirect after success
        }
    });

    return true;
}

// validira se mail
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// use zalaufa ko kliknemo gumb
document.getElementById('oddajPrijavo').addEventListener('click', function () {
    validateForm();
});
