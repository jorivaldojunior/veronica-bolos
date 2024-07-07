// Controle do menu hamburguer
document.getElementById('hamburger').onclick = function() {
    var mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
};

// Controle do modal de formulário
const modal = document.getElementById('modal');
const openFormBtn = document.getElementById('openFormBtn');
const closeModal = document.querySelector('.close-modal');
const overlay = document.getElementById('overlay'); // Elemento overlay

openFormBtn.onclick = function() {
    modal.style.display = 'block'; // Exibe o modal
    overlay.style.display = 'block'; // Exibe o overlay
};

closeModal.onclick = function() {
    modal.style.display = 'none'; // Esconde o modal
    overlay.style.display = 'none'; // Esconde o overlay
};

window.onclick = function(event) {
    if (event.target === overlay) {
        modal.style.display = 'none'; // Esconde o modal ao clicar no overlay
        overlay.style.display = 'none'; // Esconde o overlay
    }
};

// Controle do envio do formulário para WhatsApp
document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const subject = document.getElementById('subject').value;

    if (!name || !phone || !address || !subject) {
        Toastify({
            text: "Ops... por favor, preencha todos os campos!",
            duration: 10000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
            onClick: function () { } // Callback after click
        }).showToast();
        return;
    }

    const message = `Nome: ${name}\nTelefone: ${phone}\nEndereço: ${address}\nAssunto: ${subject}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5581984662759&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    modal.style.display = 'none'; // Esconde o modal após enviar o formulário
    overlay.style.display = 'none'; // Esconde o overlay após enviar o formulário
});

// Controle do carrossel de imagens
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    const imageWidth = images[0].clientWidth;
    carousel.style.transform = 'translateX(' + (-currentIndex * imageWidth) + 'px)';
}

prevButton.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
});

nextButton.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);
