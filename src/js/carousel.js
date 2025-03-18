class Carousel {
  constructor(carouselElement) {
    this.leftButton = carouselElement.querySelector(".carousel-left");
    this.rightButton = carouselElement.querySelector(".carousel-right");
    this.imagesDiv = carouselElement.querySelector(".img-collection");
    this.imageCount = this.imagesDiv.children.length;
    this.index = 0;
    this.xOrigin = parseInt(getComputedStyle(this.imagesDiv).left);
    this.autoScrollTimer = null;

    const computedStyle = getComputedStyle(this.imagesDiv);
    const columnSizes = computedStyle
      .getPropertyValue("grid-template-columns")
      .split(" ");
    this.xIncrement = parseInt(columnSizes[0], 10); // Default to 1400px if not found
    this.imageButtons = carouselElement.querySelectorAll(
      ".carousel-bottom-row button",
    );
    this.imageButtons.forEach((button) => {
      button.addEventListener("click", this.imageButtonClicked);
    });

    this.autoScroll();
    this.rightButton.addEventListener("click", this.scrollRight);
    this.leftButton.addEventListener("click", this.scrollLeft);
  }

  autoScroll = (interval = 5000) => {
    clearTimeout(this.autoScrollTimer);

    this.autoScrollTimer = setTimeout(() => {
      this.scrollRight();
      this.autoScroll(interval);
    }, interval);
  };
  updateDisplay = () => {
    this.translateImage();
    this.updateBottomRow();
    this.autoScroll();
  };
  translateImage = () => {
    let xTranslation = this.xOrigin - this.index * this.xIncrement;
    this.imagesDiv.style.transform = `translateX(${xTranslation}px)`;
  };
  updateBottomRow = () => {
    for (let i = 0; i < this.imageButtons.length; i++) {
      const button = this.imageButtons[i];
      button.classList.remove("carousel-selected");
      if (i === this.index) {
        button.classList.add("carousel-selected");
      }
    }
  };
  scrollRight = () => {
    this.index++;
    if (this.index === this.imageCount) {
      this.index = 0;
    }
    this.updateDisplay();
  };
  scrollLeft = () => {
    this.index--;
    if (this.index === -1) {
      this.index = this.imageCount - 1;
    }
    this.updateDisplay();
  };
  imageButtonClicked = (event) => {
    const target = event.target;
    const parentLi = target.parentElement;
    const parentUl = parentLi.parentElement;
    const siblings = Array.from(parentUl.children);

    const result = siblings.indexOf(parentLi);
    this.index = result;
    this.updateDisplay();
  };
}

const carousels = document.querySelectorAll(".carousel");
carousels.forEach((e) => {
  let carousel = new Carousel(e);
  console.log(carousel);
});
