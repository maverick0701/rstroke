{
  class formCarousel {
    constructor(lent) {
      this.currentIndex = 0;
      this.len = lent;
      this.rotate();
      this.cont = $("#box #divs");
      this.circle = $("#timeLine div");
      this.circle.eq(this.currentIndex).css({ "background-color": "#ffc700" });
    }
    rotate = () => {
      if (this.currentIndex == this.len - 1) {
        $("#sub").removeAttr("disabled");
        $("#next").attr("disabled", "true");
      }
      $("#next").click((event) => {
        event.preventDefault();
        this.cont.eq(this.currentIndex).removeClass("con");
        this.cont.eq(this.currentIndex).addClass("setDisplayNone");
        this.circle.eq(this.currentIndex).css({ "background-color": "white" });
        this.currentIndex++;
        this.cont.eq(this.currentIndex).removeClass("setDisplayNone");
        this.cont.eq(this.currentIndex).addClass("con");
        this.circle
          .eq(this.currentIndex)
          .css({ "background-color": "#ffc700" });
        if (this.currentIndex != this.len - 1) {
          $("#next").removeAttr("disabled");
          $("#sub").attr("disabled", "true");
        }
        if (this.currentIndex == this.len - 1) {
          $("#sub").removeAttr("disabled");
          $("#next").attr("disabled", "true");
        }
        if (this.currentIndex != 0) {
          $("#prev").removeAttr("disabled");
        }
        if (this.currentIndex == 0) {
          $("#prev").attr("disabled", "true");
        }
      });
      $("#prev").click((event) => {
        event.preventDefault();
        this.cont.eq(this.currentIndex).removeClass("con");
        this.cont.eq(this.currentIndex).addClass("setDisplayNone");
        this.circle.eq(this.currentIndex).css({ "background-color": "white" });
        this.currentIndex--;
        this.cont.eq(this.currentIndex).removeClass("setDisplayNone");
        this.cont.eq(this.currentIndex).addClass("con");
        this.circle
          .eq(this.currentIndex)
          .css({ "background-color": "#ffc700" });
        if (this.currentIndex != this.len - 1) {
          $("#sub").attr("disabled", "true");
          $("#next").removeAttr("disabled");
        }
        if (this.currentIndex == this.len - 1) {
          $("#sub").removeAttr("disabled");
          $("#next").attr("disabled", "true");
        }
        if (this.currentIndex != 0) {
          $("#prev").removeAttr("disabled");
        }
        if (this.currentIndex == 0) {
          $("#prev").attr("disabled", "true");
        }
      });
    };
  }
  class Validate {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
    checkEmailValidation() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.email).toLowerCase());
    }
    checkPasswordValidation() {
      if (this.password.length > 8) return true;
      else return false;
    }
    checkValidation() {
      let emailValidation = this.checkEmailValidation();
      let passwordValidation = this.checkPasswordValidation();
      if (!emailValidation) {
        alert("Enter A Valid Email");
      }
      if (!passwordValidation) {
        alert("Enter A Valid Password");
      }

      return this.checkEmailValidation() && this.checkPasswordValidation();
    }
    checkConPassValidation(conPass) {
      return this.password == conPass;
    }
    checkSignUpValidation(conPass) {
      let emailValidation = this.checkEmailValidation();
      let passwordValidation = this.checkPasswordValidation();
      let conPassValidation = this.checkConPassValidation(conPass);
      if (!emailValidation) {
        alert("Enter A Valid Email");
      }
      if (!passwordValidation) {
        alert("Enter A Valid Password");
      }
      if (!conPassValidation) {
        alert("Password and confiirm password should be same");
      }
      return (
        this.checkEmailValidation() &&
        this.checkPasswordValidation() &&
        conPassValidation
      );
    }
  }
  document.getElementById("login1").addEventListener("click", (e) => {
    let email = document.getElementById("homeEmail");
    let password = document.getElementById("homePass");
    email = email.value;
    password = password.value;
    let validation = new Validate(email, password);
    if (!validation.checkValidation()) {
      console.log("failed to validate");
      e.preventDefault();
    }
  });

  document.getElementById("signUp1").addEventListener("click", function (e) {
    let email = document.getElementById("homeSignUpEmail");
    let password = document.getElementById("homeSignUpPass");
    let conPass = document.getElementById("homeSignUpConPass");
    email = email.value;
    password = password.value;
    conPass = conPass.value;
    let validation = new Validate(email, password);
    if (!validation.checkSignUpValidation(conPass)) {
      e.preventDefault();
    }
  });
}
