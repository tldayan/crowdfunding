"use strict";

/* MOBILE NAV TOGGLE */

let hamburger = document.querySelector(`.hamburger`);
let hamburgerCloseIcon = document.querySelector(`.hamburger_close_icon`);
let nav = document.querySelector(`nav`);
let navStatus = false;

hamburger.onclick = () => {
  if (navStatus === false) {
    nav.classList.toggle(`navopen`);
    navStatus = true;
    hamburger.style.display = `none`;
    hamburgerCloseIcon.style.display = `block`;
  } else {
    navStatus = false;
  }
};

hamburgerCloseIcon.onclick = () => {
  if (navStatus) {
    hamburgerCloseIcon.style.display = `none`;
    nav.classList.remove(`navopen`);
    hamburger.style.display = `block`;
    navStatus = false;
  }
};

/* BACK THIS PROJECT BUTTON  */

let backThisProjectButton = document.querySelector(`.back_this_project_btn`);
let closeModalIcon = document.querySelector(`.close_icon`);
let darkOverlay = document.querySelector(`.darkoverlay`);

const openModal = () => {
  mainModalContainer.style.display = "block";

  setTimeout(() => {
    mainModalContainer.style.opacity = "1";
    mainModalContainer.style.transform = "translate(-50%, -50%) scale(1)";
  }, 0);
  darkOverlay.style.display = `block`;
};

const closeModal = () => {
  setTimeout(() => {
    mainModalContainer.style.opacity = "0";
    mainModalContainer.style.transform = "translate(-50%, -50%) scale(0.9)";
  }, 0);

  setTimeout(() => {
    mainModalContainer.style.display = "none";
  }, 500);
};

/* BACK THIS PROJECT ON CLICK */
backThisProjectButton.onclick = function () {
  pledgeContainers.forEach((pledgeContainer) => {
    pledgeContainer.style.display = `none`;
  });
  radioProjects.forEach((radioProject) => {
    radioProject.checked = false;
  });
  openModal();
};

/* CLOSE MAIN MODAL & RESET ACTIVE STYLES */
closeModalIcon.onclick = () => {
  darkOverlay.style.display = `none`;
  projectContainers.forEach((projectContainer) => {
    projectContainer.style.borderColor = `rgba(0, 0, 0, 0.334)`;
  });
  closeModal();
};


/* PROJECT MODAL POP UP */
let selectRewardButtons = document.querySelectorAll(`.select_reward_btn`);
let mainModalContainer = document.getElementById(`Projects_Modal`);
let selectedProject = undefined;
let radioSelected = null;
let projectContainers = document.querySelectorAll(`.modal_projects`);

selectRewardButtons.forEach((selectRewardButton) => {
  const scrollToProject = () => {
    let selectedProjectContainer = document.querySelector(
      `.modal_projects.${selectRewardButton.id}`
    );
    selectedProjectContainer.scrollIntoView();
    mainModalContainer.scrollBy(0, -20);
  };

  selectRewardButton.addEventListener("click", () => {
    pledgeContainers.forEach((pledgeContainer) => {
      pledgeContainer.style.display = `none`;
    });

    removeAllPledgeAlert();

    openModal();
    selectedProject = selectRewardButton.id + `_project`;

    radioSelected = document.getElementById(`${selectedProject}`);

    radioSelected.checked = true;

    let selectedPledgeContainer = document.querySelector(
      `.pledge_container.${selectRewardButton.id}`
    );

    selectedPledgeContainer.style.display = `flex`;

    setTimeout(() => {
      scrollToProject();
    }, 500);

    if (radioSelected.checked === true) {
      projectContainers.forEach((projectContainer) => {
        if (
          radioSelected.id.split("_")[0] ===
          projectContainer.className.split(" ")[1]
        ) {
          projectContainer.style.borderColor = `aqua`;
        }
      });
    }
  });
});

/* RADIO PROJECT SELECTIONS */
let pledgeContainers = document.querySelectorAll(`.pledge_container`);
let radioProjects = document.getElementsByName(`selected_project`);

const removeAllPledgeAlert = () => {
  pledgeInputContainers.forEach((pledgeInputContainer) => {
    pledgeInputContainer.classList.remove(`alert_pledge`);
  });
};

const resetEachProjectBorder = () => {
  projectContainers.forEach((projectContainer) => {
    projectContainer.style.borderColor = `rgba(0, 0, 0, 0.334)`;
  });
};

radioProjects.forEach((radioProject) => {
  radioProject.addEventListener("click", () => {
    projectContainers.forEach((projectContainer) => {
      projectContainer.style.borderColor = `rgba(0, 0, 0, 0.334)`;

      if (
        radioProject.id.split("_")[0] ===
        projectContainer.className.split(" ")[1]
      ) {
        projectContainer.style.borderColor = `aqua`;

        setTimeout(() => {
          projectContainer.scrollIntoView();
          mainModalContainer.scrollBy(0, -20);
        }, 400);
      }
    });

    pledgeContainers.forEach((pledgeContainer) => {
      pledgeContainer.style.display = `none`;
    });

    removeAllPledgeAlert();

    let selectedRadioProject = radioProject.id.split("_")[0];

    let radioPledgeContainer = document.querySelector(
      `.pledge_container.${selectedRadioProject}`
    );

    radioPledgeContainer.style.display = `flex`;
  });
});

/* AMOUNT INPUT FIELD CHECK ON CONTINUE BUTTON CLICK*/

let TotalFundedAmount = document.querySelector(`.total_funded_amount`);
let newTotalFundedAmount = Number(
  TotalFundedAmount.innerHTML.slice(1).replace(/,/g, "")
);
let continueButtons = document.querySelectorAll(`.continue_btn`);
let amountInputFields = document.querySelectorAll(`.amount_field`);
let pledgeInputContainers = document.querySelectorAll(
  `.pledge_input_container`
);
let stockbamboo = document.querySelector(`.stock_amount.bamboo`);
let stockbambooDesktop = document.querySelector(`.stock_amount_desktop.bamboo`);
let stockblack = document.querySelector(`.stock_amount.black`);
let stockblackDesktop = document.querySelector(`.stock_amount_desktop.black`);
let stockspecial = document.querySelector(`.stock_amount.special`);
let stockspecialDesktop = document.querySelector(
  `.stock_amount_desktop.special`
);

continueButtons.forEach((continueButton) => {
  continueButton.addEventListener("click", () => {
    amountInputFields.forEach((eachInputField) => {
      const addtoNewTotalFundedAmount = () => {
        newTotalFundedAmount =
          newTotalFundedAmount + Number(eachInputField.value);
        eachInputField.value = ``;
      };

      /* eachInputField.id = any_project_amount, etc etc */
      if (eachInputField.id === `any_project_amount`) {
        if (!eachInputField.value || /[a-zA-Z]/.test(eachInputField.value)) {
          pledgeInputContainers.forEach((pledgeInputContainer) => {
            if (pledgeInputContainer.classList.contains(`anyproject`)) {
              pledgeInputContainer.classList.add(`alert_pledge`);
            }
          });

          return;
        } else {
          removeAllPledgeAlert();
          addtoNewTotalFundedAmount();
          updateTotalBackers();
          openthankyouModal();
        }
      } else if (eachInputField.id === `bamboo_project_amount`) {
        if (
          eachInputField.value < 25 ||
          /[a-zA-Z]/.test(eachInputField.value)
        ) {
          pledgeInputContainers.forEach((pledgeInputContainer) => {
            if (pledgeInputContainer.classList.contains(`bamboo`)) {
              pledgeInputContainer.classList.add(`alert_pledge`);
            }
          });

          return;
        } else {

          stockbamboo.innerHTML = stockbamboo.innerHTML - 1;
          stockbambooDesktop.innerHTML =
            stockbamboo.innerHTML + `<span> left</span>`;

          removeAllPledgeAlert();
          addtoNewTotalFundedAmount();
          updateTotalBackers();
          openthankyouModal();
        }
      } else if (eachInputField.id === `black_project_amount`) {
        if (
          eachInputField.value < 75 ||
          /[a-zA-Z]/.test(eachInputField.value)
        ) {
          pledgeInputContainers.forEach((pledgeInputContainer) => {
            if (pledgeInputContainer.classList.contains(`black`)) {
              pledgeInputContainer.classList.add(`alert_pledge`);
            }
          });
          return;
        } else {

          stockblack.innerHTML = stockblack.innerHTML - 1;
          stockblackDesktop.innerHTML =
            stockblack.innerHTML + `<span> left</span>`;

          removeAllPledgeAlert();
          addtoNewTotalFundedAmount();
          updateTotalBackers();
          openthankyouModal();
        }
      } else if (eachInputField.id === `special_project_amount`) {
        if (
          eachInputField.value < 200 ||
          /[a-zA-Z]/.test(eachInputField.value)
        ) {
          pledgeInputContainers.forEach((pledgeInputContainer) => {
            if (pledgeInputContainer.classList.contains(`special`)) {
              pledgeInputContainer.classList.add(`alert_pledge`);
            }
          });
          return;
        } else {

          stockspecial.innerHTML = stockspecial.innerHTML - 1;
          stockspecialDesktop.innerHTML =
            stockspecial.innerHTML + `<span> left</span>`;

          removeAllPledgeAlert();
          addtoNewTotalFundedAmount();
          updateTotalBackers();
          openthankyouModal();
        }
      }
    });
  });
});

/* TOTAL AMOUNT DONATED ANIMATION & UPDATE */

let progressElement = document.querySelector(`.progress`);
let progressPercent = undefined;

const updateProgressBar = () => {
  progressPercent = newTotalFundedAmount / 1000;

  progressElement.style.width = `${progressPercent}%`;

  progressElement.classList.add(`updatedprogress`);

  TotalFundedAmount.innerHTML = `$${newTotalFundedAmount.toLocaleString()}`;
};

/* TOTAL BACKERS COUNTER */

let totalbackersElement = document.querySelector(`.total_backers`);
let newTotalBackers = undefined;
const updateTotalBackers = () => {
  newTotalBackers = +totalbackersElement.innerHTML.replace(/,/g, "");

  newTotalBackers = newTotalBackers + 1;
  totalbackersElement.innerHTML = newTotalBackers.toLocaleString();
};

/* THANK YOU MODAL POP UP */

let thankYouModal = document.querySelector(`.thankyou_container`);

const openthankyouModal = () => {
  closeModal();

  thankYouModal.style.display = `flex`;

  setTimeout(() => {
    thankYouModal.style.opacity = "1";
    thankYouModal.style.transform = "translate(-50%, -50%) scale(1)";
  }, 0);
};

const closethankyouModal = () => {
  setTimeout(() => {
    thankYouModal.style.opacity = "0";
    thankYouModal.style.transform = "translate(-50%, -50%) scale(0.9)";
  }, 0);

  setTimeout(() => {
    thankYouModal.style.display = `none`;
  }, 500);
};

/* GOT IT BUTTON & VALUE UPDATE ANIMATION */

let gotItButton = document.querySelector(`.gotit_btn`);
let statsContainer = document.querySelector(`.stats_container`);

gotItButton.onclick = () => {
  resetEachProjectBorder();

  setTimeout(() => {
    darkOverlay.style.display = `none`;
  }, 200);
  closethankyouModal();

  statsContainer.scrollIntoView();
  scrollBy(0, -60);

  statsContainer.style.opacity = `0`;
  updateProgressBar();
  setTimeout(() => {
    statsContainer.style.opacity = `1`;
  }, 1000);
};

/* BOOKMARK TOGGLE */
let bookmarkElement = document.querySelector(`.bookmark`);
let bookmarkContainer = document.querySelector(`.bookmark_container`);
let bookmarkStatus = false;
bookmarkContainer.onclick = () => {
  if (!bookmarkStatus) {
    bookmarkElement.innerHTML = `Bookmarked`;
    bookmarkStatus = true;
  } else {
    bookmarkElement.innerHTML = `Bookmark`;
    bookmarkStatus = false;
  }
};

/* REMOVE DARK-OVERLAY AND CLOSE ALL MODALS */
darkOverlay.onclick = () => {
  if (mainModalContainer.style.display === "block") {
    closeModal()
    resetEachProjectBorder();
    darkOverlay.style.display = `none`;
  }
}
