const stylesheet = document.getElementById("themeStyle");
let themeStore = localStorage.getItem("theme");
stylesheet.href = `./styles/themes/${themeStore ? themeStore : "dark"}.css`;
let backgroundHsl;

window.onload = () => {
    document.getElementById("test").classList.add("selected");

    let color = window.getComputedStyle(document.getElementById('show0')).getPropertyValue('background-color');
    let rgbColor = color.substring(color.indexOf('(') + 1, color.length - 1).split(',');
    backgroundHsl = rgbToHsl(...rgbColor);

    init(0);
    tabs[0].click();
}

let numTabs;
let tabs;
let tabNum = document.getElementById('tabs');
let tabBar = document.querySelector('.tab-bar');
let fullWindow = document.querySelector('.full-window');
let activeTab;
let windows;

tabNum.addEventListener('change', () => {
    tabs = document.querySelectorAll('.tab');
    activeTab = document.querySelector('.active');
    /* windows = document.querySelectorAll('.window');
    windows.forEach(win => {
        win.style.display = 'none';
    }) */
    if (tabs.length > tabNum.value) {
        tabBar.removeChild(tabs[tabs.length - 1])
        fullWindow.removeChild(document.getElementById(`show${tabs.length-1}`))
        init(1)
    } else if (tabs.length < tabNum.value) {
        let newTab = document.createElement('a');
        newTab.classList.add('tab');
        newTab.innerHTML = `Tab ${numTabs + 1}`;
        newTab.id = `t${numTabs}`
        tabBar.appendChild(newTab);
        newTab.addEventListener('click', activeLink);

        let newWin = document.createElement('div');
        newWin.classList.add('window');
        newWin.id = `show${numTabs}`;
        newWin.innerHTML = `this is for tab ${numTabs + 1}`;

        fullWindow.append(newWin);



        init(1);
    }
    let clickTab = activeTab.id.substring(activeTab.id.length - 1, activeTab.id.length);
    try {
        tabs[clickTab].click()
    } catch (error) {
        tabs[clickTab - 1].click()
    }
})

let pos;

function activeLink() {
    i = 0;
    tabs.forEach((item) => {
        item.style.margin = '0 0 0 0'
        item.style.transform = `translate(-${15*i}px, 6px)`
        item.classList.remove('active');
        document.getElementById(`show${i}`).style.backgroundColor = item.style.backgroundColor;
        (item == this ? document.getElementById(`show${i}`).style.display = 'block' : document.getElementById(`show${i}`).style.display = 'none');
        i++
    })
    this.style.margin = '0 8px 0 8px'
    this.style.transform = this.style.transform + `scale(1.25)`
    this.classList.add('active');
}

function init(type) {
    tabs = document.querySelectorAll('.tab');
    i = 0;
    tabs.forEach(tab => {
        tab.style.transform = `translate(-${15 * i}px, 6px)`;
        tab.style.backgroundColor = `hsl(${backgroundHsl[0]*360}, ${backgroundHsl[1]*100}%, ${(backgroundHsl[2]*100) + (3.1 * i)}%)`
            // tab.style.backgroundColor = `hsl(${backgroundHsl[0]*360}, ${backgroundHsl[1]*100}%, ${(backgroundHsl[2]*100)}%)`
        tab.style.zIndex = tabs.length - i;
        pos = i;
        type == 0 ? tab.addEventListener('click', activeLink) : null;
        i++;
    })
    numTabs = i;
}

// =-=-=-=-= Helper Functions =-=-=-=-= \\
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [h, s, l];
}