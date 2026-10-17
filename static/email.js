document.querySelectorAll("form[data-subscribe]").forEach((form) => {
  const status = document.getElementById(form.getAttribute("aria-describedby"));
  const button = form.querySelector('button[type="submit"]');
  const email = form.querySelector('input[type="email"]');
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.getAttribute("aria-busy") === "true") return;
    const body = new URLSearchParams(new FormData(form));
    const label = button.textContent;
    form.setAttribute("aria-busy", "true");
    button.disabled = true;
    status.hidden = false;
    status.textContent = "Subscribing…";
    let subscribed = false;
    try {
      const response = await fetch(form.action, {
        method: "POST", body, credentials: "omit",
        headers: { Accept: "application/json" },
      });
      const result = await response.json();
      status.textContent = result.message;
      subscribed = response.ok && result.success;
      if (subscribed) {
        button.textContent = "Subscribed";
        email.disabled = true;
      }
    } catch {
      status.textContent = "Couldn't reach the signup service. Please try again.";
    } finally {
      form.removeAttribute("aria-busy");
      button.disabled = subscribed;
      if (!subscribed) button.textContent = label;
    }
  });
});
