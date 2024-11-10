const telInput = document.getElementById('telInput');
const validationSms = document.getElementById('preverjanjeSms');
const imeInput = document.getElementById('imeInput');
const priimekInput = document.getElementById('priimekInput');
const krajInput = document.getElementById('krajInput');
const selectRoj = document.getElementById('selectRoj');
const emsoInput = document.getElementById('EMSOInput');
const naslovInput = document.getElementById('naslovInput');
const inputKoda = document.getElementById('inputKoda');

// Format phone number and validate in real-time
telInput.addEventListener('input', function () {
    const inputValue = telInput.value.replace(/\D/g, ''); // Remove non-digit characters
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

// Restrict EMSO to digits only and max length 13
emsoInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 13);
});

// Restrict ZIP code to digits only and max length 4
inputKoda.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);
});

// Prevent digits in IME, PRIIMEK, KRAJ fields
[imeInput, priimekInput, krajInput].forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/[0-9]/g, '');
    });
});

// Function to format phone number as 123-456-789
function formatPhoneNumber(value) {
    if (value.length < 4) return value;
    if (value.length < 7) {
        return value.slice(0, 3) + '-' + value.slice(3);
    }
    return value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 9);
}

// Function to validate phone number
function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{3}-\d{3}-\d{3}$/;
    return phoneRegex.test(phone);
}

// Validation function for the entire form
function validateForm() {
    const ime = imeInput.value.trim();
    const priimek = priimekInput.value.trim();
    const krajRojstva = selectRoj.value;
    const telefon = telInput.value.trim();
    const emso = emsoInput.value.trim();
    const naslov = naslovInput.value.trim();
    const kraj = krajInput.value.trim();
    const postnaStevilka = inputKoda.value.trim();

    // Check if fields are empty or invalid
    if (!ime || !priimek || krajRojstva === "0" || !validatePhoneNumber(telefon) ||
        !emso || emso.length !== 13 || !naslov || !kraj || postnaStevilka.length !== 4) {
        Swal.fire({
            icon: 'error',
            title: 'Napaka',
            text: 'Prosim, izpolnite vsa polja pravilno!'
        });
        return false;
    }

    // If all fields are valid, show success message
    Swal.fire({
        icon: 'success',
        title: 'Uspeh',
        text: 'Prijavnica uspešno oddana!'
    });
    return true;
}

// Attach validation to the button click
document.getElementById('oddajPrijavo').addEventListener('click', function () {
    validateForm();
});
