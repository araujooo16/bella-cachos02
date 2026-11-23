/* =========================================
   BELLA CACHOS
   SCRIPT.JS
   ========================================= */

/* >>> TROQUE AQUI (um lugar só) <<<
   whatsapp: só números, com 55 + DDD + número. Ex.: "5531999998888"
   instagram: nome do perfil, sem o @ */
const BELLA = {
    whatsapp: "31973494170",
    instagram: "izabella.almeidaa"
};

document.addEventListener("DOMContentLoaded", function () {

    const linkWhats = (msg) =>
        "https://wa.me/" + BELLA.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");

    /* ---------- Links de WhatsApp e Instagram ---------- */

    document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
        a.href = linkWhats(a.dataset.msg || "Olá! Vim pelo site da Bella Cachos.");
        a.target = "_blank";
        a.rel = "noopener";
    });

    document.querySelectorAll("[data-instagram]").forEach(function (a) {
        a.href = "https://instagram.com/" + BELLA.instagram;
        a.target = "_blank";
        a.rel = "noopener";
        if (a.hasAttribute("data-instagram-texto")) a.textContent = "@" + BELLA.instagram;
    });

    if (BELLA.whatsapp.indexOf("SEUNUMERO") !== -1) {
        console.warn("Bella Cachos: troque o número do WhatsApp em js/script.js");
    }

    /* ---------- Menu mobile ---------- */

    const botao = document.querySelector(".menu-toggle");
    const menu = document.getElementById("menu");

    if (botao && menu) {
        const fechar = function () {
            menu.classList.remove("aberto");
            botao.setAttribute("aria-expanded", "false");
            botao.setAttribute("aria-label", "Abrir menu");
        };

        botao.addEventListener("click", function () {
            const abrir = !menu.classList.contains("aberto");
            menu.classList.toggle("aberto", abrir);
            botao.setAttribute("aria-expanded", String(abrir));
            botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
        });

        menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", fechar); });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape") fechar(); });
    }

    /* ---------- Formulários -> mensagem no WhatsApp ---------- */

    const params = new URLSearchParams(window.location.search);
    const servicoUrl = params.get("servico");
    const campoServico = document.getElementById("servico");

    if (servicoUrl && campoServico) {
        Array.from(campoServico.options).forEach(function (o) {
            if (o.text === servicoUrl) campoServico.value = o.value || o.text;
        });
    }

    document.querySelectorAll("form[data-form-whatsapp]").forEach(function (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!form.reportValidity()) return;

            const linhas = [form.dataset.titulo || "Olá!", ""];

            form.querySelectorAll("input, select, textarea").forEach(function (campo) {
                const valor = campo.value.trim();
                if (!valor) return;
                const rotulo = form.querySelector('label[for="' + campo.id + '"]');
                const nome = rotulo ? rotulo.textContent.replace(" (opcional)", "") : campo.name;
                linhas.push(nome + ": " + valor);
            });

            const url = linkWhats(linhas.join("\n"));
            const janela = window.open(url, "_blank", "noopener");
            if (!janela) window.location.href = url;
        });
    });

    /* ---------- Galeria: foto ampliada ---------- */

    const lightbox = document.getElementById("lightbox");

    if (lightbox) {
        const foto = lightbox.querySelector("img");

        document.querySelectorAll(".galeria button").forEach(function (b) {
            b.addEventListener("click", function () {
                const img = b.querySelector("img");
                foto.src = img.src;
                foto.alt = img.alt;
                lightbox.showModal();
            });
        });

        lightbox.querySelector(".lightbox-fechar").addEventListener("click", function () { lightbox.close(); });
        lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });
    }
});
