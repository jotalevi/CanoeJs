function toggleTheme() {
  let e = document.documentElement,
    t = e.getAttribute("data-theme"),
    r = "dark" === t ? "light" : "dark";
  e.setAttribute("data-theme", r), localStorage.setItem("theme", r);
}

function fadeAlert(e) {
  let t = e.target.parentElement;
  t.classList.add("fade-out"), setTimeout(() => t.remove(), 500);
}

window.addEventListener("DOMContentLoaded", () => {
  let e = localStorage.getItem("theme");
  e && document.documentElement.setAttribute("data-theme", e);
})

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".progress").forEach((e) => {
        let t = e.getAttribute("data-progress"),
        r = e.querySelector(".progress-bar");
        r && t && (r.style.width = `${Math.min(parseInt(t), 100)}%`);
    });
});

document.debug = false;