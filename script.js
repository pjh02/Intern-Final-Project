/* =========================================================
   DRAM Fail Mechanism Animation Control

   포함 기능:
   1. Page 전환
   2. GIDL animation
   3. GIJL animation
   4. PGE animation
   5. 1-RD animation
   6. tRDL animation
   ========================================================= */


/* =========================================================
   0. 공통 helper 함수
   ========================================================= */

function getElement(id) {
    return document.getElementById(id);
}

function restartBodyClass(className) {
    document.body.classList.remove(className);

    /*
       같은 버튼을 다시 눌렀을 때 animation이 처음부터 다시 시작되도록
       강제로 reflow를 발생시킵니다.
    */
    void document.body.offsetWidth;

    document.body.classList.add(className);
}

/*
   1-RD 카운터 timer 정리용 함수
   - 다른 mechanism으로 이동하거나 reset할 때
   - timer가 뒤에서 계속 도는 문제를 막기 위함
*/
let oneRdCountTimer = null;
let oneRdActivationCount = 0;

function clearOneRdCounter() {
    if (oneRdCountTimer) {
        clearInterval(oneRdCountTimer);
        oneRdCountTimer = null;
    }

    oneRdActivationCount = 0;

    const activationCountText = getElement("activation-count");

    if (activationCountText) {
        activationCountText.textContent = "0";
    }
}

function clearAllMechanismAnimations() {
    document.body.classList.remove("gidl-active");
    document.body.classList.remove("gijl-active");
    document.body.classList.remove("pge-active");
    document.body.classList.remove("one-rd-active");
    document.body.classList.remove("trdl-active");

    /*
       one-rd-active class가 제거될 때
       activation count timer도 같이 멈춰야 함
    */
    clearOneRdCounter();
}


/* =========================================================
   1. GIDL 관련 요소
   ========================================================= */

const playGidlButton = getElement("play-leakage-btn");
const resetGidlButton = getElement("reset-gidl-btn");

const gidlStatusText = getElement("gidl-status-text");
const gidlStateBadge = getElement("state-badge");


/* =========================================================
   2. GIJL 관련 요소
   ========================================================= */

const playGijlButton = getElement("play-gijl-btn");
const resetGijlButton = getElement("reset-gijl-btn");

const gijlStatusText = getElement("gijl-status-text");
const gijlStateBadge = getElement("gijl-state-badge");


/* =========================================================
   3. PGE 관련 요소
   ========================================================= */

const playPgeButton = getElement("play-pge-btn");
const resetPgeButton = getElement("reset-pge-btn");

const pgeStatusText = getElement("pge-status-text");
const pgeStateBadge = getElement("pge-state-badge");


/* =========================================================
   4. 1-RD 관련 요소
   ========================================================= */

const playOneRdButton = getElement("play-one-rd-btn");
const resetOneRdButton = getElement("reset-one-rd-btn");

const oneRdStatusText = getElement("one-rd-status-text");
const oneRdStateBadge = getElement("one-rd-state-badge");
const activationCountText = getElement("activation-count");


/* =========================================================
   5. tRDL 관련 요소
   ========================================================= */

const playTrdlButton = getElement("play-trdl-btn");
const resetTrdlButton = getElement("reset-trdl-btn");

const trdlStatusText = getElement("trdl-status-text");
const trdlStateBadge = getElement("trdl-state-badge");


/* =========================================================
   6. 기본 문구 초기화 함수들
   ========================================================= */

function resetGidlText() {
    if (gidlStatusText) {
        gidlStatusText.textContent =
            "버튼을 누르면 GIDL 누설 경로가 표시됩니다.";
    }

    if (gidlStateBadge) {
        gidlStateBadge.textContent = "OFF 상태";
    }
}

function resetGijlText() {
    if (gijlStatusText) {
        gijlStatusText.textContent =
            "버튼을 누르면 junction leakage 경로가 표시됩니다.";
    }

    if (gijlStateBadge) {
        gijlStateBadge.textContent = "OFF 상태";
    }
}

function resetPgeText() {
    if (pgeStatusText) {
        pgeStatusText.textContent =
            "버튼을 누르면 passing wordline에 의한 barrier lowering이 표시됩니다.";
    }

    if (pgeStateBadge) {
        pgeStateBadge.textContent = "대기 상태";
    }
}

function resetOneRdText() {
    if (oneRdStatusText) {
        oneRdStatusText.textContent =
            "버튼을 누르면 aggressor activation → capture → trap generation → diffusion → victim D1 margin 감소 과정이 표시됩니다.";
    }

    if (oneRdStateBadge) {
        oneRdStateBadge.textContent = "대기 상태";
    }

    if (activationCountText) {
        activationCountText.textContent = "0";
    }
}

function resetTrdlText() {
    if (trdlStatusText) {
        trdlStatusText.textContent =
            "버튼을 누르면 정상 write window와 tRDL-short fail window가 비교 표시됩니다.";
    }

    if (trdlStateBadge) {
        trdlStateBadge.textContent = "대기 상태";
    }
}

function resetAllTexts() {
    resetGidlText();
    resetGijlText();
    resetPgeText();
    resetOneRdText();
    resetTrdlText();
}


/* =========================================================
   7. GIDL animation 실행 / 초기화
   ========================================================= */

function playGidlAnimation() {
    clearAllMechanismAnimations();
    restartBodyClass("gidl-active");

    if (gidlStatusText) {
        gidlStatusText.textContent =
            "Storage Node에서 Gate-Drain overlap을 거쳐 body 방향으로 leakage가 발생하는 중입니다.";
    }

    if (gidlStateBadge) {
        gidlStateBadge.textContent = "Leakage 발생";
    }

    resetGijlText();
    resetPgeText();
    resetOneRdText();
    resetTrdlText();
}

function resetGidlAnimation() {
    document.body.classList.remove("gidl-active");
    resetGidlText();
}


/* =========================================================
   8. GIJL animation 실행 / 초기화
   ========================================================= */

function playGijlAnimation() {
    clearAllMechanismAnimations();
    restartBodyClass("gijl-active");

    if (gijlStatusText) {
        gijlStatusText.textContent =
            "Drain junction 공핍영역을 통해 GIJL 누설이 발생하는 중입니다.";
    }

    if (gijlStateBadge) {
        gijlStateBadge.textContent = "Leakage 발생";
    }

    resetGidlText();
    resetPgeText();
    resetOneRdText();
    resetTrdlText();
}

function resetGijlAnimation() {
    document.body.classList.remove("gijl-active");
    resetGijlText();
}


/* =========================================================
   9. PGE animation 실행 / 초기화
   ========================================================= */

function playPgeAnimation() {
    clearAllMechanismAnimations();
    restartBodyClass("pge-active");

    if (pgeStatusText) {
        pgeStatusText.textContent =
            "Passing Wordline의 전계 간섭으로 Victim cell의 barrier가 낮아지는 중입니다.";
    }

    if (pgeStateBadge) {
        pgeStateBadge.textContent = "Barrier Lowering";
    }

    resetGidlText();
    resetGijlText();
    resetOneRdText();
    resetTrdlText();
}

function resetPgeAnimation() {
    document.body.classList.remove("pge-active");
    resetPgeText();
}


/* =========================================================
   10. 1-RD animation 실행 / 초기화
   ========================================================= */

function playOneRdAnimation() {
    clearAllMechanismAnimations();
    restartBodyClass("one-rd-active");

    if (oneRdStatusText) {
        oneRdStatusText.textContent =
            "Aggressor WL 반복 활성화로 capture 영역의 trap이 증가하고, diffusion 경로를 통해 victim D1 margin이 감소하는 중입니다.";
    }

    if (oneRdStateBadge) {
        oneRdStateBadge.textContent = "D1 Margin 감소";
    }

    resetGidlText();
    resetGijlText();
    resetPgeText();
    resetTrdlText();

    /*
       발표용 activation count
       - 실제 RowHammer threshold count가 아님
       - 반복 ACT/PRE가 누적된다는 개념을 보여주는 숫자
    */
    oneRdActivationCount = 0;

    if (activationCountText) {
        activationCountText.textContent = "0";
    }

    if (oneRdCountTimer) {
        clearInterval(oneRdCountTimer);
    }

    oneRdCountTimer = setInterval(() => {
        oneRdActivationCount += 1;

        if (activationCountText) {
            activationCountText.textContent = oneRdActivationCount;
        }

        if (oneRdActivationCount >= 12) {
            clearInterval(oneRdCountTimer);
            oneRdCountTimer = null;

            if (oneRdStateBadge) {
                oneRdStateBadge.textContent = "Bit Flip Risk ↑";
            }
        }
    }, 300);
}

function resetOneRdAnimation() {
    document.body.classList.remove("one-rd-active");
    clearOneRdCounter();
    resetOneRdText();
}


/* =========================================================
   11. tRDL animation 실행 / 초기화
   ========================================================= */

function playTrdlAnimation() {
    clearAllMechanismAnimations();
    restartBodyClass("trdl-active");

    if (trdlStatusText) {
        trdlStatusText.textContent =
            "tRDL margin이 부족해 cell voltage가 충분히 안정화되기 전에 다음 동작으로 넘어가는 상황을 표시하는 중입니다.";
    }

    if (trdlStateBadge) {
        trdlStateBadge.textContent = "Timing Margin 부족";
    }

    resetGidlText();
    resetGijlText();
    resetPgeText();
    resetOneRdText();
}

function resetTrdlAnimation() {
    document.body.classList.remove("trdl-active");
    resetTrdlText();
}


/* =========================================================
   12. 버튼 이벤트 연결
   ========================================================= */

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

if (playPgeButton) {
    playPgeButton.addEventListener("click", playPgeAnimation);
}

if (resetPgeButton) {
    resetPgeButton.addEventListener("click", resetPgeAnimation);
}

if (playOneRdButton) {
    playOneRdButton.addEventListener("click", playOneRdAnimation);
}

if (resetOneRdButton) {
    resetOneRdButton.addEventListener("click", resetOneRdAnimation);
}

if (playTrdlButton) {
    playTrdlButton.addEventListener("click", playTrdlAnimation);
}

if (resetTrdlButton) {
    resetTrdlButton.addEventListener("click", resetTrdlAnimation);
}


/* =========================================================
   13. Page 전환 기능
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

    clearAllMechanismAnimations();
    resetAllTexts();

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


/* =========================================================
   14. 페이지 처음 열렸을 때 기본 상태
   ========================================================= */

clearAllMechanismAnimations();
resetAllTexts();

const currentActivePage = document.querySelector(".page.active-page");

if (!currentActivePage) {
    showPage("overview");
}