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

let sections;
let nav_sect = {};

// Builds the nav bar dynamically based on page content
function build_nav() {
    // Find element from each section of the page
    sections = document.getElementsByTagName("section");
    const frag = document.createDocumentFragment();
    // Loop through sections to create nav bar element for each one
    for (var section of sections) {
        const list_item = document.createElement("li");
        const text = section.querySelector("h2").textContent;
        list_item.textContent = text;
        list_item.id = `${section.id}-nav`;
        list_item.classList.add("menu__link")
        nav_sect[list_item.id] = section;
        frag.appendChild(list_item);
    }
    // Append newly created document fragment to the navbar
    const nav_list = document.getElementById("navbar__list");
    nav_list.appendChild(frag);
    // Add click event listener to navbar
    nav_list.addEventListener("click", click_scroll)
}

// Adds/removes active class for each section depending on viewport
function set_actives() {
    for (var section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            section.classList.add("your-active-class");
        } else {
            section.classList.remove("your-active-class");
        }
    }
}

// Scrolls to section corresponding to nav list item
function click_scroll(evt) {
    const el = evt.target;
    if (!el.classList.contains("menu__link")) return;
    const sect = nav_sect[el.id];
    sect.scrollIntoView({behavior: "smooth"});
}

// Build menu after document loads
document.addEventListener("DOMContentLoaded", build_nav)

// Set active section on scroll
document.addEventListener("scroll", set_actives)

