class DropShadowGenerator {
  constructor(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    color,
    colorRef,
    previewImg,
    rule
  ) {
    this.horizontal = horizontal;
    this.horizontalRef = horizontalRef;
    this.vertical = vertical;
    this.verticalRef = verticalRef;
    this.blur = blur;
    this.blurRef = blurRef;
    this.color = color;
    this.colorRef = colorRef;
    this.previewImg = previewImg;
    this.rule = rule;
  }

  initialize() {
    this.horizontalRef.value = this.horizontal.value;
    this.verticalRef.value = this.vertical.value;
    this.blurRef.value = this.blur.value;
    this.colorRef.value = this.color.value;
    this.applyRule();
    this.showRule();
  }

  updateValue(type, value) {
    switch (type) {
      case "horizontal":
        this.horizontalRef.value = value;
        break;
      case "vertical":
        this.verticalRef.value = value;
        break;
      case "blur":
        this.blurRef.value = value;
        break;
      case "color":
        this.colorRef.value = value;
        break;
    }
    this.applyRule();
    this.showRule();
  }

  applyRule() {
    const rgbValue = this.hexToRgb(this.colorRef.value);
    const shadowRule = `drop-shadow(${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px rgb(${rgbValue})`;

    this.previewImg.style.filter = shadowRule;
    this.currentRule = shadowRule;
  }

  showRule() {
    this.rule.innerText = this.currentRule;
  }

  hexToRgb(hex) {
    return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
      ("0x" + hex[5] + hex[6]) | 0
    }`;
  }
}

const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");

const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");

const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");

const previewImg = document.querySelector("#preview-img");

const rule = document.querySelector("#rule span");

const dropShadow = new DropShadowGenerator(
  horizontal,
  horizontalRef,
  vertical,
  verticalRef,
  blur,
  blurRef,
  color,
  colorRef,
  previewImg,
  rule
);

dropShadow.initialize();

// EVENTOS

horizontal.addEventListener("input", (e) => {
  const value = e.target.value;
  dropShadow.updateValue("horizontal", value);
});

vertical.addEventListener("input", (e) => {
  const value = e.target.value;
  dropShadow.updateValue("vertical", value);
});

blur.addEventListener("input", (e) => {
  const value = e.target.value;
  dropShadow.updateValue("blur", value);
});

color.addEventListener("input", (e) => {
    const value = e.target.value
    dropShadow.updateValue("color", value)
})

// COPIAR 

const rulesArea = document.querySelector("#rules-area")
const copyInstructions = document.querySelector("#copy-instructions")

rulesArea.addEventListener("click", (e) => {
    const rules = rulesArea.innerText
    navigator.clipboard.writeText(rules).then(() => {
        copyInstructions.innerText = "Copiado com sucesso!"
        rulesArea.style.transition = ".2s"
        rulesArea.style.border = "2px solid #11e90a"
        setTimeout(() => {
            copyInstructions.innerText = "Clique no quadro acima para copiar as regras"
            rulesArea.style.transition = ".2s"
            rulesArea.style.border = "2px solid white"
        }, 1000);
    })
})