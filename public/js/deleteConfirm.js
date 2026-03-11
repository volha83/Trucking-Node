document.addEventListener("DOMContentLoaded", () => {
  const deleteForms = document.querySelectorAll(".delete-form");

  deleteForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const ok = confirm("Are you sure you want to delete this week?");
      if (!ok) {
        e.preventDefault();
      }
    });
  });
});
