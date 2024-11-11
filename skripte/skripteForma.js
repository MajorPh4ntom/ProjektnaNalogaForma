const telInput = document.getElementById('telInput');
const validationSms = document.getElementById('preverjanjeSms');
const imeInput = document.getElementById('imeInput');
const priimekInput = document.getElementById('priimekInput');
const krajInput = document.getElementById('krajInput');
const selectRoj = document.getElementById('selectRoj');
const emsoInput = document.getElementById('EMSOInput');
const naslovInput = document.getElementById('naslovInput');
const inputKoda = document.getElementById('inputKoda');

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
        this.value = this.value.replace(/[0-9]/g, '');
    });
});

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

    // preveri ce use ok
    if (!ime || !priimek || krajRojstva === "0" || !validatePhoneNumber(telefon) ||
        !emso || emso.length !== 13 || !naslov || !kraj || postnaStevilka.length !== 4) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka',
            text: 'Prosim, izpolnite vsa polja pravilno!'
        });
        return false;
    }

    // ce je use ok da en sweetalert
    Swal.fire({
        icon: 'success',
        title: 'Uspeh',
        text: 'Prijavnica uspešno oddana!'
    });
    return true;
}

// validira na gumbu (ko kliknes gumb komaj validira celo formo)
document.getElementById('oddajPrijavo').addEventListener('click', function () {
    validateForm();
});
