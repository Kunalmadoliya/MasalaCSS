const textArea = document.getElementById("text-area");
const preview = document.getElementById("preview");
const radios = document.querySelectorAll("#unit input");
const copy = document.getElementById("css-preview");
const copyBtn = document.getElementById("copy-btn");
const toggle = document.getElementById("toggle");

const obj = {
  p: { property: "padding", max: 4 },
  pt: { property: "paddingTop", max: 1 },
  pb: { property: "paddingBottom", max: 1 },
  pl: { property: "paddingLeft", max: 1 },
  pr: { property: "paddingRight", max: 1 },

  m: { property: "margin", max: 4 },
  mt: { property: "marginTop", max: 1 },
  mb: { property: "marginBottom", max: 1 },
  ml: { property: "marginLeft", max: 1 },
  mr: { property: "marginRight", max: 1 },

  c: { property: "color", max: 1 },
  bg: { property: "backgroundColor", max: 1 },

  fs: { property: "fontSize", max: 1 },
  fw: { property: "fontWeight", max: 1 },

  w: { property: "width", max: 1 },
  h: { property: "height", max: 1 },

  d: { property: "display", max: 1 },
  f: { property: "flex", max: 1 },
  jc: { property: "justifyContent", max: 1 },
  ai: { property: "alignItems", max: 1 },
};

function conversion(value) {
  const selected = document.querySelector("#unit input:checked");
  const num = parseFloat(value);

  if (selected.value === "rem") {
    return (num / 16).toFixed(3) + "rem";
  } else if (selected.value === "%") {
    return ((num / 150) * 100).toFixed(2) + "%";
  }

  return num + "px";
}

let cssOutput = "";


function applyStyles() {
  cssOutput = "";

  const keysSorted = Object.keys(obj).sort((a, b) => b.length - a.length);
  const validInputArray = textArea.value.trim().split(/\s+/);

  validInputArray.forEach((element) => {
    if (!element.startsWith("masala-")) return;

    const clean = element.replace("masala-", "");
    const parts = clean.split("-");
    const key = keysSorted.find((k) => parts[0] === k);
    if (!key) return;

    const max = obj[key].max || 1;
    const values = parts.slice(1, 1 + max);

    const finalValue = values
      .map((v) => {
        if (!isNaN(v)) return conversion(v);
        return v;
      })
      .join(" ");

    const property = obj[key].property;

  
    preview.style[property] = finalValue;


    cssOutput += `${property}: ${finalValue};\n`;
  });

  copy.textContent = cssOutput;
}


textArea.addEventListener("input", applyStyles);

radios.forEach((radio) => {
  radio.addEventListener("change", applyStyles);
});


toggle.addEventListener("click", () => {
  const body = document.body.classList;
  body.toggle("dark");

  if (body.contains("dark")) {
    toggle.innerText = "Toggle to Light";
  } else {
    toggle.innerText = "Toggle to Dark";
  }
});


copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(copy.textContent);

  copyBtn.textContent = "Copied!";
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1000);


  alert("CSS Copied to Clipboard!")
});