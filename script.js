document.addEventListener("DOMContentLoaded", function () {
  const categoriesList = document.querySelectorAll(".categories-list li");
  const homeContent = document.querySelector(".home-content");
  const categoryContents = document.querySelectorAll(".category-content");
  const backButtons = document.querySelectorAll(".back-button");
  const categoriesSection = document.querySelector(".categories-section");

  // Function to check if mobile view
  function isMobileView() {
    return window.innerWidth < 1024;
  }

  // Category click event
  categoriesList.forEach((category) => {
    category.addEventListener("click", function () {
      const categoryName = this.getAttribute("data-category");

      // Remove active class from all categories
      categoriesList.forEach((cat) => cat.classList.remove("active"));

      // Add active class to clicked category
      this.classList.add("active");

      // Hide home content
      homeContent.classList.add("hidden");

      // Hide all category contents
      categoryContents.forEach((content) => {
        content.classList.remove("active");
      });

      // Show selected category content
      const selectedCategory = document.querySelector(
        `.category-content[data-category="${categoryName}"]`
      );
      if (selectedCategory) {
        selectedCategory.classList.add("active");
      }

      // Hide categories section on mobile when category is selected
      if (isMobileView()) {
        categoriesSection.classList.add("hidden-mobile");
      }

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Back button click event
  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      goBack();
    });
  });

  // Logo click - return to home
  document.querySelector(".navbar-logo").addEventListener("click", function () {
    goBack();
  });

  // Function to go back to home
  function goBack() {
    // Remove active class from all categories
    categoriesList.forEach((cat) => cat.classList.remove("active"));

    // Hide all category contents
    categoryContents.forEach((content) => {
      content.classList.remove("active");
    });

    // Show home content
    homeContent.classList.remove("hidden");

    // Show categories section again on mobile
    if (isMobileView()) {
      categoriesSection.classList.remove("hidden-mobile");
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Handle window resize - show/hide categories section appropriately
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // If switching to desktop view, always show categories section
      if (!isMobileView()) {
        categoriesSection.classList.remove("hidden-mobile");
      } else {
        // If in mobile view and a category is active, hide categories
        const hasActiveCategory = document.querySelector(
          ".category-content.active"
        );
        if (hasActiveCategory) {
          categoriesSection.classList.add("hidden-mobile");
        }
      }
    }, 250);
  });

  // Search functionality (optional enhancement)
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", function () {
      performSearch();
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === "") return;

    const allCalculators = document.querySelectorAll(".calculator-card");
    let found = false;

    allCalculators.forEach((calc) => {
      const calcName = calc
        .querySelector(".calculator-name")
        .textContent.toLowerCase();
      const calcDesc = calc
        .querySelector(".calculator-desc")
        .textContent.toLowerCase();

      if (calcName.includes(searchTerm) || calcDesc.includes(searchTerm)) {
        found = true;
        calc.style.display = "block";
        calc.style.border = "2px solid var(--primary-color)";
        setTimeout(() => {
          calc.style.border = "1px solid #9aa3af78";
        }, 2000);
      }
    });

    if (found) {
      // Scroll to first matching result
      const firstMatch = Array.from(allCalculators).find((calc) => {
        const calcName = calc
          .querySelector(".calculator-name")
          .textContent.toLowerCase();
        const calcDesc = calc
          .querySelector(".calculator-desc")
          .textContent.toLowerCase();
        return calcName.includes(searchTerm) || calcDesc.includes(searchTerm);
      });

      if (firstMatch) {
        firstMatch.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } else {
      alert("No calculators found matching your search.");
    }
  }
});
