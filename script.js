// JavaScript untuk menu, pencarian katalog, dan formulir kontak.
document.addEventListener("DOMContentLoaded", function () {
  // Menu hamburger pada layar kecil.
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      navigation.classList.toggle("open");
      const isOpen = navigation.classList.contains("open");
      menuButton.setAttribute("aria-expanded", isOpen);
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  // Pencarian nama dan filter kategori pada halaman program kerja.
  const searchInput = document.querySelector("#search-program");
  const categoryFilter = document.querySelector("#category-filter");
  const programCards = document.querySelectorAll(".catalog-card");
  const emptyMessage = document.querySelector("#empty-message");

  function filterPrograms() {
    if (!searchInput || !categoryFilter || programCards.length === 0) return;

    const keyword = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    let visibleCount = 0;

    programCards.forEach(function (card) {
      const name = card.dataset.name.toLowerCase();
      const cardCategory = card.dataset.category;
      const matchesName = name.includes(keyword);
      const matchesCategory = category === "semua" || cardCategory === category;
      const shouldShow = matchesName && matchesCategory;

      card.hidden = !shouldShow;
      if (shouldShow) visibleCount++;
    });

    if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
  }

  if (searchInput && categoryFilter) {
    searchInput.addEventListener("input", filterPrograms);
    categoryFilter.addEventListener("change", filterPrograms);
  }

  // Validasi tambahan dan pesan sukses formulir kontak.
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        formStatus.textContent = "Periksa kembali kolom yang belum sesuai.";
        return;
      }

      formStatus.textContent = "Terima kasih! Pesan berhasil divalidasi (simulasi).";
      contactForm.reset();
    });
  }
});
