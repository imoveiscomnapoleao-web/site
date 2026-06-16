(() => {
  const items = Array.from(document.querySelectorAll(".detail-gallery div"));

  if (!items.length) {
    return;
  }

  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Fechar imagem">&times;</button>
    <button class="lightbox-prev" type="button" aria-label="Imagem anterior">&#8249;</button>
    <img alt="Imagem ampliada do imóvel" />
    <button class="lightbox-next" type="button" aria-label="Proxima imagem">&#8250;</button>
  `;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const prevButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");
  let activeIndex = 0;

  const imageUrls = items.map((item) => {
    const background = window.getComputedStyle(item).backgroundImage;
    return background.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
  });

  function openLightbox(index) {
    activeIndex = index;
    image.src = imageUrls[activeIndex];
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    image.removeAttribute("src");
    document.body.style.overflow = "";
  }

  function move(step) {
    activeIndex = (activeIndex + step + imageUrls.length) % imageUrls.length;
    image.src = imageUrls[activeIndex];
  }

  items.forEach((item, index) => {
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "Ampliar imagem do imóvel");
    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      move(-1);
    }

    if (event.key === "ArrowRight") {
      move(1);
    }
  });
})();
