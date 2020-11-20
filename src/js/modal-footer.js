(() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
      backdrop: document.querySelector(".backdrop")
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", onCloseModal);
    refs.backdrop.addEventListener("click", onCloseModalOnOverlay);


    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
      document.addEventListener("keydown", onCloseModalByEsc);
    }


    function onCloseModal() {
      document.removeEventListener("keydown", onCloseModalByEsc);
      refs.modal.classList.toggle("is-hidden");
    }

    function onCloseModalByEsc (event) {
      if (event.code === "Escape") {
        onCloseModal();
      }
    }

    function onCloseModalOnOverlay (event) {
      if (event.currentTarget === event.target) {
        onCloseModal();
  }
}
  })();