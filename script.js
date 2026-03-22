const textArea = document.getElementById("text-area");
const preview = document.getElementById("preview");
const radios = document.querySelectorAll("#unit input");

const obj = {
  p: {property: "padding"},
  pt: {property: "paddingTop"},
  pb: {property: "paddingBottom"},
  pl: {property: "paddingLeft"},
  pr: {property: "paddingRight"},

  m: {property: "margin"},
  mt: {property: "marginTop"},
  mb: {property: "marginBottom"},
  ml: {property: "marginLeft"},
  mr: {property: "marginRight"},

  c: {property: "color"},
  bg: {property: "backgroundColor"},

  fs: {property: "fontSize"},
  fw: {property: "fontWeight"},

  w: {property: "width"},
  h: {property: "height"},

  d: {property: "display"},
  f: {property: "flex"},
  jc: {property: "justifyContent"},
  ai: {property: "alignItems"},
};

// 🔥 conversion
function conversion(value) {
  const selected = document.querySelector("#unit input:checked");
  const num = parseFloat(value);

  if (selected.value === "rem") {
    return num / 16 + "rem";
  } else if (selected.value === "%") {
    return (num / 150) * 100 + "%";
  }

  return num + "px";
}

// 🔥 main engine
function applyStyles() {
  const keysSorted = Object.keys(obj).sort((a, b) => b.length - a.length);
  const validInputArray = textArea.value.trim().split(/\s+/);

  validInputArray.forEach((element) => {
    if (!element.startsWith("masala-")) return;

    const clean = element.replace("masala-", "");
    const parts = clean.split("-");
    const key = keysSorted.find((k) => parts[0] === k);
    if (!key) return;

    const rawValue = parts[1];

    // ✅ number vs string
    if (!isNaN(rawValue)) {
      preview.style[obj[key].property] = conversion(rawValue);
    } else {
      preview.style[obj[key].property] = rawValue;
    }
  });
}

// 🔥 events
textArea.addEventListener("input", applyStyles);

radios.forEach((radio) => {
  radio.addEventListener("change", applyStyles);
});

toggle.addEventListener("click", () => {
  const body = document.body.classList;
  body.toggle("dark");

  if (body.value === "light") {
    toggle.innerText = "Toggle to Dark";
  } else {
    toggle.innerText = "Toggle to Light";
  }
});
