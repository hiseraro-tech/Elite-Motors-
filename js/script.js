// BANCO DE DADOS COMPLETO COM TODAS AS FOTOS E DETALHES PRESERVADOS
const carData = {
    'g63': {
        title: 'Mercedes-Benz G63 AMG',
        price: '261.850.000 Kz',
        priceRaw: 261850000,
        ano: '2024',
        cor: 'Preto Obsidian',
        trans: 'Automático',
        fuel: 'Gasolina',
        estado:'Novo',
        km: '0km',
        images: ['../img/g63.jpg', '../img/g63-int.jpg', '../img/g63-tras.jpg', '../img/g63-mot.jpg']
    },
    'p911': {
        title: 'Porsche 911 Carrera S',
        price: '120.000.000 Kz',
        priceRaw: 120000000,
        ano: '2023',
        cor: 'Vermelho Guards',
        trans: 'Automático',
        fuel: 'Gasolina',
        estado: 'Novo',
        km: '0km',
        images: ['../img/911.jpg', '../img/911-int.jpg',  '../img/911-tras.jpg' , '../img/911-mot.jpg']
    },
    'lc300': {
        title: 'Toyota Land Cruiser 300 VXR',
        price: '120.500.000 Kz',
        priceRaw: 120500000,
        ano: '2025',
        cor: 'Preto',
        trans: 'Automático 10 Vel',
        fuel: 'Gasóleo (Diesel)',
        estado:'Semi-Novo',
        km: '0km',
        images: ['../img/lc.jpeg', '../img/lc-int.jpg', '../img/lc-tras.jpeg',  '../img/lc-mot.jpg']
    },
    'mclaren': {
        title: 'McLaren 720s Spider',
        price: '170.500.000 Kz',
        priceRaw: 170500000,
        ano: '2025',
        cor: 'cinza metalico',
        trans: 'SSG 7 Velocidades',
        fuel: 'Gasolina',
        estado: 'Novo',
        km: '0km',
        images: ['../img/720s.jpg', '../img/720s-int.jpg', '../img/720s-tras.jpg', '../img/720s-mot.jpg']
    },
    'hilux': {
        title: 'Hilux GR-Sport IV',
        price: '38.000.000 Kz',
        priceRaw: 38000000,
        ano: '2025',
        cor: 'Branco Metálico',
        trans: 'Automático 4x4',
        fuel: 'Gasóleo',
        estado: 'Novo',
        km: '0km',
        images: ['../img/hilux.jpg', '../img/hilux-int.jpg', '../img/hilux-tras.jpg','../img/hilux-mot.jpg' ]
    },
    'vogue': {
        title: 'Range Rover Vogue P530',
        price: '200.000.000 Kz',
        priceRaw: 200000000,
        ano: '2025',
        cor: 'preto',
        trans: 'Automático',
        fuel: 'Gasolina',
        estado:'Novo',
        km: '0km',
        images: ['../img/vogue.jpeg', '../img/vogue-int.jpeg', '../img/vogue-tras.jpg', '../img/vogue-mot.jpg']
    },
    'bmwx7': {
        title: 'BMW X7 M60i',
        price: '145.000.000 Kz',
        priceRaw: 145000000,
        ano: '2024',
        cor: 'preto',
        trans: 'Automático',
        fuel: 'Gasolina',
        estado: 'Novo',
        km: '0km',
        images: ['../img/x7.jpg', '../img/x7-int.jpg', '../img/x7-tras.jpg','../img/x7-mot.jpg' ]
    },
    'audirs6': {
        title: 'Audi RS6 Avant',
        price: '158.000.000 Kz',
        priceRaw: 158000000,
        ano: '2025',
        cor: 'cinzento',
        trans: 'Automático',
        fuel: 'Gasolina',
        estado:'Novo',
        km: '0km',
        images: ['../img/rs6.jpg', '../img/rs6-int.jpg', '../img/rs6-tras.jpg','../img/rs6-mot.jpg' ]
    },
    'escalade': {
        title: 'Cadillac Escalade ESV V-Series',
        price: '210.000.000 Kz',
        priceRaw: 210000000,
        ano: '2025',
        cor: 'Preto Raven',
        trans: 'Automático',
        fuel: 'Gasolina',
        estado: 'Novo',
        km: '0km',
        images: ['../img/escalade.jpg', '../img/escalade-int.jpg', '../img/escalade-tras.jpg' ,  '../img/escalade-mot.jpeg']
    },
    'lx600': {
        title: 'Lexus LX 600 Ultra Luxury',
        price: '265.000.000 Kz',
        ano: '2025',
        cor: 'Prata Atómico',
        trans: 'Automático 10 Vel',
        fuel: 'Gasolina',
        estado: 'Novo',
        km: '0km',
        images: ['../img/lx600.jpg', '../img/lx600-int.jpg', '../img/lx600-tras1.jpg','../img/lx600-mot.jpg']
    }
};

let currentCarPrice = 0;
const modal = document.getElementById("carModal");

function openModal(id) {
    const car = carData[id];
    if (!car) return;

    currentCarPrice = car.priceRaw;

    // Vinculação com o DOM do Modal
    document.getElementById("modalTitle").innerText = car.title;
    document.getElementById("modalPrice").innerText = car.price;
    document.getElementById("specAno").innerText = car.ano;
    document.getElementById("specCor").innerText = car.cor;
    document.getElementById("specTrans").innerText = car.trans;
    document.getElementById("specFuel").innerText = car.fuel;
    document.getElementById("specKm").innerText = car.km;

    // Reseta o formulário interno
    document.getElementById("financeDownpayment").value = 0;
    document.getElementById("financeMonths").value = "36";

    const mainImg = document.getElementById("mainModalImg");
    mainImg.src = car.images[0];

    const thumbContainer = document.getElementById("thumbContainer");
    thumbContainer.innerHTML = "";
    car.images.forEach((imgSrc) => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.onclick = () => { mainImg.src = imgSrc; };
        thumbContainer.appendChild(thumb);
    });

    calculateFinance();

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function calculateFinance() {
    const downpaymentInput = document.getElementById("financeDownpayment");
    const monthsSelect = document.getElementById("financeMonths");
    const resultSpan = document.getElementById("monthlyInstallment");
    const errorSmall = document.getElementById("simError");

    let downpayment = parseFloat(downpaymentInput.value) || 0;
    let months = parseInt(monthsSelect.value) || 36;

    if(errorSmall) errorSmall.style.display = "none";

    if (downpayment >= currentCarPrice) {
        if(errorSmall) {
            errorSmall.innerText = "A entrada não pode ser maior ou igual ao preço.";
            errorSmall.style.display = "block";
        }
        resultSpan.innerText = "0 Kz / mês";
        return;
    }

    const amountToFinance = currentCarPrice - downpayment;
    const annualInterestRate = 0.15; 
    const monthlyInterestRate = annualInterestRate / 12;

    let monthlyInstallment = 0;
    if (monthlyInterestRate === 0) {
        monthlyInstallment = amountToFinance / months;
    } else {
        monthlyInstallment = (amountToFinance * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -months));
    }

    const formattedInstallment = Math.round(monthlyInstallment).toLocaleString('pt-AO');
    resultSpan.innerText = `${formattedInstallment} Kz / mês`;
}

document.querySelector(".close-modal").onclick = closeModal;
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = (e) => { if (e.target == modal) closeModal(); };

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.innerText.toLowerCase();
        document.querySelectorAll('.card').forEach(card => {
            const category = card.getAttribute('data-category').toLowerCase();
            if (filter === 'todos') {
                card.style.display = 'block';
            } else if (category === filter || (filter.includes('promoção') && card.classList.contains('promo-card'))) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };
});

document.addEventListener("DOMContentLoaded", function() {
    
    // ========================================================
    // 1. MENU DE NAVEGAÇÃO RESPONSIVO
    // ========================================================
    const nav = document.querySelector(".nav");
    // Cria o botão hambúrguer dinamicamente se ele não existir no HTML
    if (nav && !document.querySelector(".menu-toggle")) {
        const toggleBtn = document.createElement("button");
        toggleBtn.className = "menu-toggle";
        toggleBtn.innerHTML = "<i class='fas fa-bars'></i>";
        toggleBtn.setAttribute("aria-label", "Abrir menu");
        nav.parentNode.insertBefore(toggleBtn, nav);

        toggleBtn.addEventListener("click", function() {
            nav.classList.toggle("nav-active");
            toggleBtn.innerHTML = nav.classList.contains("nav-active") ? "<i class='fas fa-times'></i>" : "<i class='fas fa-bars'></i>";
        });
    }

    // ========================================================
    // 2. BOTÃO VOLTAR AO TOPO
    // ========================================================
    const backToTop = document.createElement("button");
    backToTop.id = "backToTop";
    backToTop.innerHTML = "<i class='fas fa-arrow-up'></i>";
    backToTop.setAttribute("aria-label", "Voltar ao topo");
    document.body.appendChild(backToTop);

    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            backToTop.classList.add("show-btn");
        } else {
            backToTop.classList.remove("show-btn");
        }
    });

    backToTop.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ========================================================
    // 3. VALIDAÇÃO PRÓPRIA DO FORMULÁRIO DE CONTACTO
    // ========================================================
    const contactForm = document.querySelector(".premium-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio nativo para podermos validar
            
            const nome = document.getElementById("nome-completo").value.trim();
            const email = document.getElementById("seu-email").value.trim();
            const assunto = document.getElementById("assunto-contacto").value;
            const mensagem = document.getElementById("mensagem-contacto").value.trim();
            
            // Regex simples para validação de e-mail
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (nome.length < 3) {
                alert("Por favor, introduza o seu nome completo (mínimo 3 caracteres).");
                return;
            }

            if (!emailPattern.test(email)) {
                alert("Por favor, introduza um endereço de e-mail válido.");
                return;
            }

            if (!assunto) {
                alert("Por favor, selecione o motivo do seu contacto.");
                return;
            }

            if (mensagem.length < 10) {
                alert("A sua mensagem deve conter pelo menos 10 caracteres.");
                return;
            }

            // Se passar todas as validações
            alert("Obrigado, " + nome + "! A sua mensagem foi enviada com sucesso à Elite Motors.");
            contactForm.reset();
        });
    }
     });
// ========================================================
    // 4. FUNCIONALIDADE ALTERNAR TEMA (DARK / LIGHT MODE)
    // ========================================================
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector("i");

    
        const savedTheme = localStorage.getItem("theme") || "dark";
        
    
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateIcon(savedTheme);
        
        themeToggleBtn.addEventListener("click", function() {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateIcon(newTheme);
        });

        function updateIcon(theme) {
            if (themeIcon) {
                if (theme === "light") {
                    themeIcon.className = "fas fa-sun"; 
                } else {
                    themeIcon.className = "fas fa-moon"; 
                }
            }
        }
    }
});

