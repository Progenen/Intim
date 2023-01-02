class MinModalJS {

    modalOpen () {
        this.modal.classList.add('min-modal-js-active');
        document.querySelector(".wrapper").classList.add('lock');
        document.body.classList.add('lock');
        if (this.whenModalOpen) {
            this.whenModalOpen();
        }
    }

    modalClose () {
        this.modal.classList.remove('min-modal-js-active');
        document.querySelector(".wrapper").classList.remove('lock');
        document.body.classList.remove('lock');
        this.whenModalClose();
    }
    modalDestroy() {
        this.modal.remove();
    }

    constructor(inner, obj) {
        if (obj.keyOpen === undefined) {
            obj.keyOpen = 'Escape';
        }

        this.btns = document.querySelectorAll(obj.buttonsActive);
        this.inner = document.querySelector(inner);
        this.closeBtns = document.querySelectorAll(obj.buttonsDisActive);
        this.keyOpen = obj.keyOpen;
        this.modalOutsideClick = obj.modalOutsideClick;
        this.modal = document.createElement('div');
        this.modal.classList.add('modal-wrapper');
        this.whenModalClose = obj.whenModalClose;
        this.whenModalOpen = obj.whenModalOpen;
        this.modal.append(this.inner);
        document.querySelector(".wrapper").append(this.modal);
        
        this.btns.forEach(element => {
            element.addEventListener('click', (e) =>{
                e.preventDefault();
                this.modalOpen();
            });
        });

        this.closeBtns.forEach(element => {
            element.addEventListener('click', (e) =>{
                e.preventDefault();
                this.modalClose();
            });
        });

        if (this.modalOutsideClick != false) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.modalClose();
                }
            });
        }

        if (this.key != false) {
            document.addEventListener('keydown', (e)=> {
                if (e.key === this.keyOpen) { 
                    this.modalClose();
                }
            });
        }
    }
}