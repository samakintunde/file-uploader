enum AlertType {
  WARNING,
  ERROR
}

function renderAlert(message: string) {
  const alertTemplate: HTMLTemplateElement = document.querySelector(
    ".js-alert"
  );
  const alertNode: Node = alertTemplate.content.cloneNode(true);
  alertNode.querySelector(
    ".alert"
  ).innerHTML = `<span class="color-danger margin-right-sm" style="color:#ff3a44">!</span>${message}`;
  document.body.appendChild(alertNode);

  const alertEl = document.querySelector(".alert");
  setTimeout(() => {
    alertEl.classList.add("visible");
  }, 100);

  setTimeout(() => {
    alertEl.classList.remove("visible");

    setTimeout(() => {
      alertEl.remove();
    }, 300);
  }, 5000);
}

export { renderAlert };
