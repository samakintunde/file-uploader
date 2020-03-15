const addToModal = (modal: Element, content: string) => {
  modal.innerHTML = content;
};

const clearModal = (modal: Element) => {
  modal.innerHTML = null;
};

const showModal = (modal: Element) => {
  modal.classList.add("visible");
};

const hideModal = (modal: Element) => {
  modal.classList.remove("visible");
};

export { addToModal, clearModal, showModal, hideModal };
