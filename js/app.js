/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

let nav_sect = new Map();

// Builds the nav bar dynamically based on page content
function build_nav() {
    // Find element from each section of the page
    const sections = document.getElementsByTagName("section");
    const frag = document.createDocumentFragment();
    // Loop through sections to create nav bar element for each one
    for (var section of sections) {
        const list_item = document.createElement("li");
        const text = section.querySelector("h2").textContent;
        list_item.textContent = text;
        list_item.classList.add("menu__link")
        nav_sect.set(list_item, section);
        frag.appendChild(list_item);
    }
    // Append newly created document fragment to the navbar
    const nav_list = document.getElementById("navbar__list");
    nav_list.appendChild(frag);
    // Add click event listener to navbar
    nav_list.addEventListener("click", click_scroll)
}

// Adds/removes active class for each section/navigation item depending on viewport
function set_actives() {
    for (var [nav, sect] of nav_sect) {
        const rect = sect.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            nav.classList.add("your-active-class");
            sect.classList.add("your-active-class");
        } else {
            nav.classList.remove("your-active-class");
            sect.classList.remove("your-active-class");
        }
    }
}

// Scrolls to section corresponding to nav list item
function click_scroll(evt) {
    const el = evt.target;
    if (!el.classList.contains("menu__link")) return;
    const sect = nav_sect.get(el);
    sect.scrollIntoView({behavior: "smooth"});
}

// Build menu after document loads
document.addEventListener("DOMContentLoaded", build_nav)

// Set active section on scroll
document.addEventListener("scroll", set_actives)
