export function toggleTheme() {
    const currentTheme = document.body.classList.contains("theme-dark")
    ? "dark"
    : "light";
    document.body.classList.toggle("theme-dark", currentTheme === "light");
    document.body.classList.toggle("theme-light", currentTheme === "dark");
    localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
    updateThemeIcon();
}

export function updateThemeIcon() {
    const themeIcon = document.getElementById("theme-icon");
    const isDarkTheme = document.body.classList.contains("theme-dark");
    themeIcon.classList.toggle("bi-sun-fill", isDarkTheme);
    themeIcon.classList.toggle("bi-moon-fill", !isDarkTheme);
}

function getSystemPreferredTheme() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    return prefersDarkScheme.matches ? "dark" : "light";
}

export function initTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
        const systemTheme = getSystemPreferredTheme();
        document.body.classList.toggle("theme-dark", systemTheme === "dark");
        document.body.classList.toggle("theme-light", systemTheme === "light");
    } else {
        document.body.classList.toggle("theme-dark", savedTheme === "dark");
        document.body.classList.toggle("theme-light", savedTheme === "light");
    }

    updateThemeIcon();
}

