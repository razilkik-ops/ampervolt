const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const calculator = document.querySelector("[data-calculator]");
const leadForm = document.querySelector("[data-lead-form]");

if (window.lucide) {
  window.lucide.createIcons();
}

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
  const isOpen = nav?.classList.contains("is-open");
  navToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-label", "Открыть меню");
  }
});

if (calculator) {
  const area = calculator.elements.area;
  const object = calculator.elements.object;
  const urgent = calculator.elements.urgent;
  const areaOutput = calculator.querySelector("[data-area-output]");
  const estimateOutput = calculator.querySelector("[data-estimate]");

  const formatByn = (value) =>
    new Intl.NumberFormat("ru-BY", {
      style: "currency",
      currency: "BYN",
      maximumFractionDigits: 0,
    }).format(value);

  const updateEstimate = () => {
    const areaValue = Number(area.value);
    const base = Number(object.value);
    const urgency = urgent.checked ? 80 : 0;
    const estimate = Math.round(base + areaValue * 18 + urgency);

    areaOutput.textContent = `${areaValue} м²`;
    estimateOutput.textContent = `от ${formatByn(estimate)}`;
  };

  calculator.addEventListener("input", updateEstimate);
  calculator.addEventListener("change", updateEstimate);
  updateEstimate();
}

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = leadForm.querySelector("[data-form-status]");
  const name = new FormData(leadForm).get("name") || "Спасибо";
  status.textContent = `${name}, заявка подготовлена. Позвоните нам или отправьте данные на hello@ampervolt.by.`;
  leadForm.reset();
});
