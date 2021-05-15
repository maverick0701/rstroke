{
  class Validate {
    constructor(email, phone) {
      this.email = email;
      this.phone = phone;
    }
    checkEmailValidation() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.email).toLowerCase());
    }
    checkPasswordValidation() {
      var phoneno = /^\d{10}$/;
      let pass = this.phone.match(phoneno);
      if (!pass) {
        return false;
      }
      return true;
    }
  }
  document.getElementById("finalSub").addEventListener("click", function (e) {
    let email = document.getElementById("elementemail").value;
    let phone = document.getElementById("elementphone").value;
    let validation = new Validate(email, phone);
    let ans =
      validation.checkEmailValidation() && validation.checkPasswordValidation();
    if (!validation.checkEmailValidation()) alert("Enter A valid Email");
    if (!validation.checkPasswordValidation()) alert("Enter a valid Phone NO");
    if (!ans) {
      e.preventDefault();
    }
  });
}
