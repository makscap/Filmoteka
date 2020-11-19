(() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
      backdrop: document.querySelector(".backdrop")
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
    refs.backdrop.addEventListener("click", onCloseModalOnOverlay);

    function toggleModal() {
      document.addEventListener("keydown", onCloseModalByEsc);
      refs.modal.classList.toggle("is-hidden");
    }

    function onCloseModalByEsc (event) {
      if (event.code === "Escape") {
        toggleModal();
      }
    }

    function onCloseModalOnOverlay (event) {
      if (event.currentTarget === event.target) {
        toggleModal();
  }
}
  })();