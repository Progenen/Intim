let dataTargets = [...document.querySelectorAll("[data-target]")].map(item => {
    if (item !== null || item !== undefined) {
        return item;
    }
});
const error = "Ошибка (targets-lib): ";
let labelledbys = [];

dataTargets.forEach((element, i) => {
    const labelledby = document.querySelector(`[data-labelledby="${element.getAttribute('data-target')}"]`)
    if (labelledby !== null || labelledby !== undefined) {
        targetsLibMain(i, element, labelledby);
    };

});

function targetsLibMain (i, item, item2) {
    if (item.hasAttribute('data-target-md')) {
        if (document.body.clientWidth < item.getAttribute('data-target-md')) {
            return;
        }
    }
    item.addEventListener('click', (e) => {
        switch (item.getAttribute('data-target-type')) {
            case 'toggle':
                item.classList.toggle('active');
                item2.classList.toggle('active');
                break;
            case 'add':
                item.classList.add('active');
                item2.classList.add('active');
                break;
            case 'remove':
                item.classList.remove('active');
                item2.classList.remove('active');
                break;
            case 'dropdown':
                item.classList.toggle('active');
                item2.classList.toggle('active');
                document.body.addEventListener('click', function tape(e) {
                    if (e.target != item) {
                        item.classList.remove('active');
                        item2.classList.remove('active');
                        document.body.removeEventListener('click', tape);
                    }
                });
                break;
            default:
                item.classList.toggle('active');
                item2.classList.toggle('active');
                break;
        }
    })
}