/* =========================================================
   DRAM Fail Mechanism Animation Control
   대상:
   1. GIDL animation
   2. GIJL animation

   목적:
   - 버튼 클릭 시 해당 mechanism의 누설 경로 animation 실행
   - 초기화 버튼 클릭 시 원래 상태로 복귀
   - GIDL과 GIJL animation이 서로 겹치지 않도록 제어
   ========================================================= */


/* =========================================================
   0. 공통 함수
   ========================================================= */

/* id로 HTML 요소 가져오기 */
function getElement(id) {
    return document.getElementById(id);
}

/* animation을 다시 시작하기 위한 함수 */
function restartBodyClass(className) {
    /*
       이미 animation class가 붙어 있는 상태에서 버튼을 다시 누르면
       CSS animation이 처음부터 다시 시작되지 않는 경우가 있습니다.

       그래서 class를 잠깐 제거한 뒤,
       강제로 reflow를 발생시키고,
       다시 class를 추가합니다.
    */
    document.body.classList.remove(className);

    /* 강제 reflow */
    void document.body.offsetWidth;

    document.body.classList.add(className);
}


/* =========================================================
   1. GIDL 관련 HTML 요소
   ========================================================= */

const playGidlButton = getElement("play-leakage-btn");
const resetGidlButton = getElement("reset-gidl-btn");

const gidlStatusText = getElement("gidl-status-text");
const gidlStateBadge = getElement("state-badge");


/* =========================================================
   2. GIJL 관련 HTML 요소
   ========================================================= */

const playGijlButton = getElement("play-gijl-btn");
const resetGijlButton = getElement("reset-gijl-btn");

const gijlStatusText = getElement("gijl-status-text");
const gijlStateBadge = getElement("gijl-state-badge");


/* =========================================================
   3. GIDL animation 실행
   ========================================================= */

function playGidlAnimation() {
    /*
       GIDL을 실행할 때 GIJL animation은 꺼둡니다.
       두 mechanism animation이 동시에 켜지면 화면이 복잡해질 수 있기 때문입니다.
    */
    document.body.classList.remove("gijl-active");

    restartBodyClass("gidl-active");

    if (gidlStatusText) {
        gidlStatusText.textContent =
            "Gate-Drain overlap 부근에서 GIDL 누설이 발생하는 중입니다.";
    }

    if (gidlStateBadge) {
        gidlStateBadge.textContent = "Leakage 발생";
    }

    if (gijlStatusText) {
        gijlStatusText.textContent =
            "버튼을 누르면 junction leakage 경로가 표시됩니다.";
    }

    if (gijlStateBadge) {
        gijlStateBadge.textContent = "OFF 상태";
    }
}


/* =========================================================
   4. GIDL animation 초기화
   ========================================================= */

function resetGidlAnimation() {
    document.body.classList.remove("gidl-active");

    if (gidlStatusText) {
        gidlStatusText.textContent =
            "버튼을 누르면 GIDL 누설 경로가 표시됩니다.";
    }

    if (gidlStateBadge) {
        gidlStateBadge.textContent = "OFF 상태";
    }
}


/* =========================================================
   5. GIJL animation 실행
   ========================================================= */

function playGijlAnimation() {
    /*
       GIJL을 실행할 때 GIDL animation은 꺼둡니다.
       발표할 때 한 mechanism씩 보여주는 게 더 깔끔합니다.
    */
    document.body.classList.remove("gidl-active");

    restartBodyClass("gijl-active");

    if (gijlStatusText) {
        gijlStatusText.textContent =
            "Drain junction 공핍영역을 통해 GIJL 누설이 발생하는 중입니다.";
    }

    if (gijlStateBadge) {
        gijlStateBadge.textContent = "Leakage 발생";
    }

    if (gidlStatusText) {
        gidlStatusText.textContent =
            "버튼을 누르면 GIDL 누설 경로가 표시됩니다.";
    }

    if (gidlStateBadge) {
        gidlStateBadge.textContent = "OFF 상태";
    }
}


/* =========================================================
   6. GIJL animation 초기화
   ========================================================= */

function resetGijlAnimation() {
    document.body.classList.remove("gijl-active");

    if (gijlStatusText) {
        gijlStatusText.textContent =
            "버튼을 누르면 junction leakage 경로가 표시됩니다.";
    }

    if (gijlStateBadge) {
        gijlStateBadge.textContent = "OFF 상태";
    }
}


/* =========================================================
   7. 버튼 이벤트 연결
   ========================================================= */

/*
   if 문을 넣은 이유:
   나중에 특정 section을 잠깐 지우거나,
   아직 HTML에 버튼이 없는 상태에서 script.js를 먼저 연결해도
   JavaScript error로 페이지 전체가 멈추지 않게 하기 위함입니다.
*/

if (playGidlButton) {
    playGidlButton.addEventListener("click", playGidlAnimation);
}

if (resetGidlButton) {
    resetGidlButton.addEventListener("click", resetGidlAnimation);
}

if (playGijlButton) {
    playGijlButton.addEventListener("click", playGijlAnimation);
}

if (resetGijlButton) {
    resetGijlButton.addEventListener("click", resetGijlAnimation);
}


/* =========================================================
   8. 페이지 처음 열렸을 때 기본 상태
   ========================================================= */

resetGidlAnimation();
resetGijlAnimation();

/* =========================================================
   Page 전환 기능
   - 한 페이지에 모든 section을 쌓아두지 않고
   - 클릭한 section만 보여주는 방식
   ========================================================= */

const pageButtons = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");

function showPage(pageId) {
    pages.forEach((page) => {
        if (page.id === pageId) {
            page.classList.add("active-page");
        } else {
            page.classList.remove("active-page");
        }
    });

    navLinks.forEach((link) => {
        if (link.dataset.page === pageId) {
            link.classList.add("active-nav");
        } else {
            link.classList.remove("active-nav");
        }
    });

    /* 페이지 바뀔 때 animation 초기화 */
    document.body.classList.remove("gidl-active");
    document.body.classList.remove("gijl-active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

pageButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();

        const targetPage = button.dataset.page;

        if (targetPage) {
            showPage(targetPage);
        }
    });
});