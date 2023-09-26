      // required elements
      const inputs = document.querySelectorAll("input");
      const selects = document.querySelectorAll("select");

      inputs.forEach((item) => {
        item.required = true;
      });
      selects.forEach((item) => {
        item.required = true;
      });

      // password
      const passwordInput = document.querySelector("#password");
      const confirmPasswordInput = document.querySelector("#confirmPassword");
      const btnSubmit = document.querySelector("#btnSubmit");

      let sumbitPermission = false;

      const passwordValidation = {
        numberOfCharacters: false,
        number: false,
        specialCharacter: false,
        noSpace: false,
        upperCase: false,
      };

      passwordInput.addEventListener("input", (e) => {
        let input = passwordInput.value;

        input = input.trim();

        if (input.length <= 25 && input.length >= 8) {
          document.querySelector("#check1").style.color = "#4DA167";
          passwordValidation.numberOfCharacters = true;
        } else {
          document.querySelector("#check1").style.color = "#ff3800";
          passwordValidation.numberOfCharacters = false;
        }

        if (input.match(/[0-9]/i)) {
          document.querySelector("#check2").style.color = "#4DA167";
          passwordValidation.number = true;
        } else {
          document.querySelector("#check2").style.color = "#ff3800";
          passwordValidation.number = false;
        }

        if (input.match(/[^A-Za-z0-9-' ']/i)) {
          document.querySelector("#check3").style.color = "#4DA167";
          passwordValidation.specialCharacter = true;
        } else {
          document.querySelector("#check3").style.color = "#ff3800";
          passwordValidation.specialCharacter = false;
        }

        if (input.match(" ")) {
          document.querySelector("#check4").style.color = "#ff3800";
          passwordValidation.noSpace = false;
        } else {
          document.querySelector("#check4").style.color = "#4DA167";
          passwordValidation.noSpace = true;
        }

        if (input.match(/[A-Z]/)) {
          document.querySelector("#check5").style.color = "#4DA167";
          passwordValidation.upperCase = true;
        } else {
          document.querySelector("#check5").style.color = "#ff3800";
          passwordValidation.upperCase = false;
        }

        let counter = 0;

        for (let key in passwordValidation) {
          let value = passwordValidation[key];

          if (value == false) {
            counter++;
          }
        }

        if (counter >= 1) {
          document.querySelector("#checkedItems").style.display = "block";
          sumbitPermission = false;
        } else {
          document.querySelector("#checkedItems").style.display = "none";
          sumbitPermission = true;
        }
      });

      confirmPasswordInput.addEventListener("input", () => {
        let input = confirmPasswordInput.value;
        input = input.trim();

        if (passwordInput.value !== input) {
          document.querySelector("#checkPasswords").style.display = "block";
          confirmPasswordInput.style.color = "#ff3800";
          sumbitPermission = false;
        } else {
          confirmPasswordInput.style.color = "#4DA167";
          document.querySelector("#checkPasswords").style.display = "none";
          sumbitPermission = true;
        }
      });

      // tel
      const telephone = document.querySelector("#tel");

      telephone.addEventListener("input", () => {
        telephone.value = telephone.value.replace(/[^0-9-]/, "");
        if (telephone.value.length == 3) {
          telephone.value = telephone.value + "-";
        } else if (telephone.value.length == 7) {
          telephone.value = telephone.value + "-";
        }
      });

      // Drag and drop
      const dropArea = document.getElementById("dropArea");
      const fileHead = document.getElementById("browseFileHead");
      const browseFileInputDom = document.getElementById("browseFileInput");

      dropArea.addEventListener("click", () => {
        browseFileInputDom.click();
      });

      browseFileInputDom.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
          const fileType = file.type;
          const validExtensions = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf",
          ];
          if (validExtensions.includes(fileType)) {
            fileHead.textContent = file.name;
          } else {
            alertModal.style.display = "flex";
            alertText.textContent =
              "Invalid file type. Please select an image (JPEG, JPG, PNG) or a PDF file.";

            this.value = "";
            fileHead.textContent = "Drag & Drop to Upload File";
            return;
          }
        }
        dropArea.classList.add("active");
      });

      dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
        fileHead.textContent = "Release to Upload File";
      });

      dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
        fileHead.textContent = "Drag & Drop to Upload File";
      });

      dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
          const fileType = file.type;
          const validExtensions = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf",
          ];
          if (validExtensions.includes(fileType)) {
            fileHead.textContent = file.name;
          } else {
            alertModal.style.display = "flex";
            alertText.textContent =
              "Invalid file type. Please drop an image (JPEG, JPG, PNG) or a PDF file.";

            fileHead.textContent = "Drag & Drop to Upload File";
            return;
          }
        }
        dropArea.classList.add("active");
      });

      //submit
      btnSubmit.addEventListener("click", (e) => {
        if (sumbitPermission == false) {
          alertModal.style.display = "flex";
          alertText.textContent =
            "Please fill in the blank fields and review your password transactions.";
        }
      });

      //modal
      const closeModal = document.querySelector("#closeModal");
      const btnAlertModal = document.querySelector("#btnAlertModal");
      const alertModal = document.querySelector(".alertModal");
      const alertText = document.querySelector("#alertText");

      closeModal.addEventListener("click", () => {
        alertModal.style.display = "none";
      });