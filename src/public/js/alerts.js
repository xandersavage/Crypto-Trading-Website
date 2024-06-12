export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

//type is 'success', 'warning', 'danger', 'primary'
export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert-${type} d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24">
        <use xlink:href="#check-circle-fill" />
    </svg>
    <div>
        ${msg}
    </div>
</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};

export const showModal = (msg, index, selectType) => {
  const markup = `
    <div class="toast fade show align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${msg}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `
  document.querySelector(`.trader-update-${selectType}-${index}`).insertAdjacentHTML("afterend", markup);
}

export const showEmailModal = (msg) => {
  const markup = `
    <div class="toast fade show align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${msg}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `
  document.querySelector('#sendEmailButton').insertAdjacentHTML("afterend", markup);
}
