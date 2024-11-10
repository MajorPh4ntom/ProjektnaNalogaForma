function preveriVnose(event) {
  event.preventDefault(); // prevent form from submitting initially

  // prava mail in password v objektu
  const upoPodatki = {
    pravoGeslo: 'Password123?',
    praviMail: 'Ime.Priimek@hotmail.com'
  };

  // uzemi vnose iz polj
  const vnesenoGeslo = document.getElementById('passGeslo').value;
  const vnesenMail = document.getElementById('passMail').value;

  // preveri ce se mail in password ujemata objektom
  if (vnesenoGeslo !== upoPodatki.pravoGeslo || vnesenMail !== upoPodatki.praviMail) {
    // ce email in geslo nista enaka opozori preko SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Napaka!',
      text: 'Email ali geslo se ne ujemata!',
      confirmButtonText: 'Poskusi znova'
    });
    highlightErrorFields();
    return false;
  } else {
    // email in geslo se ujemata, prikaži SweetAlert2 za uspešno prijavo
    Swal.fire({
      icon: 'success',
      title: 'Prijava uspešna!',
      text: 'Preusmerjamo vas...',
      confirmButtonText: 'V redu'
    }).then(() => {
      // Preusmeri na drugo stran po potrditvi
      const form = document.getElementById('loginForm');
      form.action = 'strani/forma.html';
      form.submit();
    });
    return true;
  }
}
//baje dela
function highlightErrorFields() {
  document.getElementById('passMail').style.border = '2px solid red';
  document.getElementById('passGeslo').style.border = '2px solid red';
}