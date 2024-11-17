// preverja preko funkcije DOM ko kliknes na gumb
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('ustvariRacun').addEventListener('click', function () {
    window.location.href = 'views/signUp.html';  // Redirect to the signUp page
  });
});

// validatorr cele forme
function preveriVnose(event) {
  event.preventDefault(); // ne pusti forme naprej dokler ne preveis usega

  const upoPodatki = {
    pravoGeslo: 'Password123?',
    praviMail: 'Ime.priimek@hotmail.com'
  };

  const vnesenoGeslo = document.getElementById('passGeslo').value;
  const vnesenMail = document.getElementById('passMail').value;

  if (vnesenoGeslo !== upoPodatki.pravoGeslo || vnesenMail !== upoPodatki.praviMail) {
    Swal.fire({
      icon: 'error',
      title: 'Napaka!',
      text: 'Email ali geslo se ne ujemata!',
      confirmButtonText: 'OK',
      customClass: {
        title: 'my-title',
        htmlContainer: 'my-text',
        confirmButton: 'my-denied-button'
      }
    });
    highlightErrorFields();
    return false;
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Prijava uspešna!',
      text: 'Preusmerjamo vas...',
      confirmButtonText: 'OK',
      customClass: {
        title: 'my-title',
        htmlContainer: 'my-text',
        confirmButton: 'my-confirm-button'
      }
    }).then(() => {
      const form = document.getElementById('loginForm');
      form.action = 'views/forma.html';
      form.submit();
    });
    return true;
  }
}

// oznaci kjer ni ok
function highlightErrorFields() {
  document.getElementById('passMail').style.border = '2px solid red';
  document.getElementById('passGeslo').style.border = '2px solid red';
}
