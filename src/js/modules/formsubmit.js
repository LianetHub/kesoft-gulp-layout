export const formSubmit = () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const pageLoadTime = Date.now();
    form.dataset.startTime = pageLoadTime;

    form.addEventListener("submit", formSend);
  });

  // bot
  function isBot(form) {
    // 1. honeypot
    const field = form.querySelector('[name="areYouHuman"]');
    if (field && field.value !== "") {
      return true; // bot
    }
    // 2. time checker
    const now = Date.now();
    const start = form.dataset.startTime;
    const delta = (now - start) / 1000;
    if (delta < 3) {
      return true; // bot
    }
    return false; // human
  }

  // get utms
  function getUtmParams() {
    const savedUtm = localStorage.getItem("savedUtm");
    if (savedUtm) {
      try {
        return JSON.parse(savedUtm);
      } catch (e) {
        console.error(e);
      }
    }
    const urlParams = new URLSearchParams(window.location.search);
    const utm = {};
    urlParams.forEach((value, key) => {
      if (key.startsWith("utm_")) {
        utm[key] = value;
      }
    });
    return utm;
  }

  function displayBackendErrors(form, errors) {
    clearAllErrors(form);

    errors.forEach((error) => {
      const { attr, detail } = error;

      let field = null;

      const fieldMapping = {
        phone: "Телефон",
        name: "Имя",
        email: "Email",
        message: "Сообщение",
      };

      const fieldName = fieldMapping[attr] || attr;
      field = form.querySelector(`[name="${fieldName}"]`);

      if (field) {
        formAddError(field);
        showErrorMessage(field, detail);
      }
    });
  }

  function showErrorMessage(field, message) {
    const fieldContainer = field.parentElement;

    // remove existing error message, if any
    const existingError = fieldContainer.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
      existingError.remove();
    }

    // create new error message element
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: #bc0707;
      font-size: 14px;
      margin-bottom: 15px;
      display: block;
    `;

    fieldContainer.insertAdjacentElement("afterend", errorElement);
  }

  function clearAllErrors(form) {
    const errorFields = form.querySelectorAll(".error");
    errorFields.forEach((field) => {
      formRemoveError(field);
    });

    const formContainer = form.parentElement;
    const errorMessages = formContainer.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => msg.remove());
  }

  async function formSend(e) {
    const form = e.target;
    e.preventDefault();

    if (isBot(form)) {
      return;
    }

    clearAllErrors(form);

    let error = formValidate(form);
    // get form name
    const formName = form.getAttribute("name") || "";
    let messageText = "";

    if (error === 0) {
      // collect only not empty fields
      const formData = {
        utm: getUtmParams(),
        text: formName,
        page: window.location.href,
        form: "kes",
      };

      const elements = form.elements;
      for (let i = 0; i < elements.length; i++) {
        const field = elements[i];
        const fieldName = field.getAttribute("name");
        const value = field.value && field.value.trim();

        if (fieldName === "Имя" && value) formData.name = value;
        if (fieldName === "Телефон" && value) formData.phone = value;
        if (fieldName === "Email" && value) formData.email = value;
        if (fieldName === "Сообщение" && value) messageText = value;
      }

      if (messageText) {
        formData.text += "\n" + messageText;
      }

      try {
        const response = await fetch("https://wms24.ru/api/_/general/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          if (typeof ym !== "undefined") {
            ym(47718151, "reachGoal", "forma");
          }

          const openPopup = document.querySelector(".popup.open");
          if (openPopup) openPopup.classList.remove("open");

          const successPopup = document.querySelector("#succes");
          if (successPopup) successPopup.classList.add("open");
          document.body.classList.add("modal-lock");

          form.reset();
        } else {
          // handle validation errors
          const errorData = await response.json();
          if (errorData.type === "validation_error" && errorData.errors) {
            displayBackendErrors(form, errorData.errors);
          } else {
            // show general error popup
            const errorPopup = document.querySelector("#error");
            if (errorPopup) {
              errorPopup.classList.add("open");
              document.body.classList.add("modal-lock");

              const errorSubtitle = errorPopup.querySelector(".form__subtitle");
              if (errorSubtitle) {
                errorSubtitle.innerHTML = "Произошла ошибка при отправке формы";
              }
            }
          }
        }
      } catch (error) {
        // show network error popup
        const errorPopup = document.querySelector("#error");
        if (errorPopup) {
          errorPopup.classList.add("open");
          document.body.classList.add("modal-lock");

          const errorSubtitle = errorPopup.querySelector(".form__subtitle");
          if (errorSubtitle) {
            errorSubtitle.innerHTML = "Произошла сетевая ошибка";
          }
        }
      }
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll("[data-required]");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.type == "text") {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      } else if (input.type == "tel") {
        if (!phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.type == "checkbox") {
        if (!input.checked) {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("error");
    input.classList.add("error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("error");
    input.classList.remove("error");
  }

  function phoneTest(input) {
    let value =
      input.value.length > 0 ? input.value.match(/\d/g).join("") : input.value;

    return /^\d[\d\(\)\-]{4,14}\d$/g.test(value);
  }
};
