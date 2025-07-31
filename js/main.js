import "../css/style.css";

const progressFills = document.querySelectorAll(".progress-fill");
const changeExpirienseBtn = document.getElementById("change-expirience");
const acceptExpirienseBtn = document.getElementById("accept-expirience");
const changeEducationBtn = document.getElementById("change-education");
const acceptEducationBtn = document.getElementById("accept-education");
const changeIntroducionBtn = document.getElementById("change-introduction");
const acceptIntroducionBtn = document.getElementById("accept-introduction");
const changeInterestsBtn = document.getElementById("change-interests");
const acceptInterestsBtn = document.getElementById("accept-interests");
const changeLanguagesBtn = document.getElementById("change-languages");
const acceptLanguagesBtn = document.getElementById("accept-languages");
const languagesCardsTextContent = document.querySelectorAll(
    ".languages__wrapper-name"
);
const interestsCarsTextContent = document.querySelectorAll(
    ".interests__tags-item"
);
const introducionTextContent = document.querySelector(
    ".introducion__text-cotainer"
);
const educationCards = document.querySelectorAll(
    ".main__education-wrapper__item"
);
const exprienseCards = document.querySelectorAll(".expiriense__wrapper-item");
let localStorageItemKeyEducationCards = "education-Cards";
let localStorageItemKeyExpirienceCards = "expiriense-Cards";
let localStorageItemKeyIntroducionCard = "introducion-Cards";
let localStorageItemKeyInterestsCards = "interests-Cards";
let localStorageItemKeyLanguagesCards = "languages-Cards";

progressFills.forEach((progressFill, index) => {
    var savedWidth = localStorage.getItem("width" + index);
    if (savedWidth) {
        progressFill.style.width = savedWidth + "%";
    }
    progressFill.addEventListener("click", () => {
        let newWidth = prompt("Укажите уровень владения языком в процентах", "50");
        if (newWidth !== null && newWidth >= 0 && newWidth <= 100) {
            newWidth = Math.min(100, Math.max(0, parseInt(newWidth)));
            setTimeout(() => {
                progressFill.style.width = newWidth + "%";
            }, 300);
            localStorage.setItem("width" + index, newWidth);
        } else {
            alert("Введите число от 0 до 100");
        }
    });
});

setContentInIntroducion();
languagesCardsTextContent.forEach((item, index) => {
    const savedContent = localStorage.getItem(
        localStorageItemKeyLanguagesCards + index
    );
    if (savedContent) {
        item.innerHTML = savedContent;
    }
});

interestsCarsTextContent.forEach((item, index) => {
    const savedContent = localStorage.getItem(
        localStorageItemKeyInterestsCards + index
    );
    if (savedContent) {
        item.innerHTML = savedContent;
    }
});

educationCards.forEach((item, index) => {
    const savedContent = localStorage.getItem(
        localStorageItemKeyEducationCards + index
    );
    if (savedContent) {
        item.innerHTML = savedContent;
    }
    const favoriteCardButton = item.querySelector(".favorite__education-button");
    favoriteCardButton.addEventListener("click", () => {
        favoriteCardButton.classList.toggle("favorite__education-button__active");
        item.classList.toggle("main__education-wrapper__item-active");
        toggleActiveStateEducation(item, favoriteCardButton);
        setInStorage(index, item, "education-Cards");
    });
    toggleActiveStateEducation(item, favoriteCardButton);
});

exprienseCards.forEach((item, index) => {
    const savedContent = localStorage.getItem(
        localStorageItemKeyExpirienceCards + index
    );
    if (savedContent) {
        item.innerHTML = savedContent;
    }
    const btn = item.querySelector(".experiense__btn");
    btn.addEventListener("click", () => {
        btn.classList.toggle("experiense__btn-active");
        toggleActiveStateExpiriense(item, btn);
        setInStorage(index, item, localStorageItemKeyExpirienceCards);
    });
    toggleActiveStateExpiriense(item, btn);
});

changeEducationBtn.addEventListener("click", () => {
    changeContent(
        changeEducationBtn,
        acceptEducationBtn,
        educationCards,
        localStorageItemKeyEducationCards
    );
});

acceptEducationBtn.addEventListener("click", () => {
    acceptChanges(
        acceptEducationBtn,
        changeEducationBtn,
        educationCards,
        localStorageItemKeyEducationCards
    );
});

changeExpirienseBtn.addEventListener("click", () => {
    changeContent(
        changeExpirienseBtn,
        acceptExpirienseBtn,
        exprienseCards,
        localStorageItemKeyExpirienceCards
    );
});

acceptExpirienseBtn.addEventListener("click", () => {
    acceptChanges(
        acceptExpirienseBtn,
        changeExpirienseBtn,
        exprienseCards,
        localStorageItemKeyExpirienceCards
    );
});

changeIntroducionBtn.addEventListener("click", () => {
    changeSimpleBlock(
        changeIntroducionBtn,
        acceptIntroducionBtn,
        introducionTextContent
    );
});

acceptIntroducionBtn.addEventListener("click", () => {
    acceptSimpleBlock(
        changeIntroducionBtn,
        acceptIntroducionBtn,
        introducionTextContent,
        localStorageItemKeyIntroducionCard
    );
});

changeInterestsBtn.addEventListener("click", () => {
    changeContent(
        changeInterestsBtn,
        acceptInterestsBtn,
        interestsCarsTextContent
    );
});

acceptInterestsBtn.addEventListener("click", () => {
    acceptChanges(
        acceptInterestsBtn,
        changeInterestsBtn,
        interestsCarsTextContent,
        localStorageItemKeyInterestsCards
    );
});

changeLanguagesBtn.addEventListener("click", () => {
    changeContent(
        changeLanguagesBtn,
        acceptLanguagesBtn,
        languagesCardsTextContent
    );
});

acceptLanguagesBtn.addEventListener("click", () => {
    acceptChanges(
        acceptLanguagesBtn,
        changeLanguagesBtn,
        languagesCardsTextContent,
        localStorageItemKeyLanguagesCards
    );
});

function changeContent(btnChange, btnAccept, content) {
    btnChange.style.display = "none";
    btnAccept.style.display = "block";
    content.forEach((item) => {
        item.setAttribute("contenteditable", "true");
        item.style.textDecoration = "underline";
        item.style.cursor = "text";
    });
}

function acceptChanges(btnAccept, btnChange, content, localStorageKey) {
    btnChange.style.display = "block";
    btnAccept.style.display = "none";
    content.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = "1";
        }, 300);
        item.style.opacity = "0";
        item.setAttribute("contenteditable", "false");
        item.style.textDecoration = "none";
        item.style.cursor = "click";
        setInStorage(index, item, localStorageKey);
    });
}

function changeSimpleBlock(btnChange, btnAccept, content) {
    btnChange.style.display = "none";
    btnAccept.style.display = "block";
    content.setAttribute("contenteditable", "true");
    content.style.textDecoration = "underline";
    content.style.cursor = "text";
}
function acceptSimpleBlock(btnChange, btnAccept, content, localStorageKey) {
    btnChange.style.display = "block";
    btnAccept.style.display = "none";
    setTimeout(() => {
        content.style.opacity = "1";
    }, 300);
    content.style.opacity = "0";
    content.setAttribute("contenteditable", "false");
    content.style.textDecoration = "none";
    content.style.cursor = "click";
    setInStorage("", content, localStorageKey);
}

function toggleActiveStateExpiriense(item, btn) {
    if (btn.classList.contains("experiense__btn-active")) {
        item.classList.add("expiriense__wrapper-item-active");
        item.classList.remove("expiriense__wrapper-item");
    } else {
        item.classList.add("expiriense__wrapper-item");
        item.classList.remove("expiriense__wrapper-item-active");
    }
}

function toggleActiveStateEducation(item, btn) {
    if (btn.classList.contains("favorite__education-button__active")) {
        item.classList.add("main__education-wrapper__item-active");
        item.classList.remove("main__education-wrapper__item");
    } else {
        item.classList.remove("main__education-wrapper__item-active");
        item.classList.add("main__education-wrapper__item");
    }
}

function setInStorage(key, value, name) {
    localStorage.setItem(name + key, value.innerHTML);
}

function setContentInIntroducion() {
    const savedContent = localStorage.getItem(localStorageItemKeyIntroducionCard);
    if (savedContent) {
        introducionTextContent.innerHTML = savedContent;
    }
}