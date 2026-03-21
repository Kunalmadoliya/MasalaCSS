const textArea = document.getElementById("text-area");
const preview = document.getElementById("preview");
const toggle = document.getElementById("toggle");

const obj = {
  // Padding
  p: {property: "padding", max: 4, unit: "px"},
  pt: {property: "paddingTop", max: 1, unit: "px"},
  pb: {property: "paddingBottom", max: 1, unit: "px"},
  pl: {property: "paddingLeft", max: 1, unit: "px"},
  pr: {property: "paddingRight", max: 1, unit: "px"},

  // Margin
  m: {property: "margin", max: 4, unit: "px"},
  mt: {property: "marginTop", max: 1, unit: "px"},
  mb: {property: "marginBottom", max: 1, unit: "px"},
  ml: {property: "marginLeft", max: 1, unit: "px"},
  mr: {property: "marginRight", max: 1, unit: "px"},

  // Colors
  c: {property: "color", max: 1},
  bg: {property: "backgroundColor", max: 1},

  // Typography
  fs: {property: "fontSize", max: 1, unit: "px"},
  fw: {property: "fontWeight", max: 1},

  // Size
  w: {property: "width", max: 1, unit: "px"},
  h: {property: "height", max: 1, unit: "px"},

  // Layout
  d: {property: "display", max: 1},
  f: {property: "flex", max: 1},
  jc: {property: "justifyContent", max: 1},
  ai: {property: "alignItems", max: 1},
};

textArea.addEventListener("input", () => {
  const keysSorted = Object.keys(obj).sort((a, b) => b.length - a.length);
  console.log(keysSorted);

  const validInputArray = textArea.value.trim().split(/\s+/);

  validInputArray.forEach((element) => {
    if (!element.startsWith("masala-")) return;

    const clean = element.replace(/masala-/, "");
    const parts = clean.split("-");

    const key = keysSorted.find((k) => parts[0] === k);
    console.log(key);

    let value = parts[1];
    if (!key) return;

    if(typeof value === "number"){
      console.log(value);
      conversion(value);
    }

      preview.style[obj[key].property] = value;
    

  });
});

function conversion(value) {

  if(typeof value !== "number") return 

  document.querySelectorAll("#unit input").forEach((item) => {
    item.addEventListener("change", () => {
      const selected = document.querySelector("#unit input:checked");
      
      if(selected.value === "rem"){
        value = value / 16
      }else if (selected.value === "%"){
        value = (value / 150 ) * 100
      }
    });
  });

  return value
}



toggle.addEventListener("click", () => {
  const body = document.body.classList;
  body.toggle("dark");

  if (body.value === "light") {
    toggle.innerText = "Toggle to Dark";
  } else {
    toggle.innerText = "Toggle to Light";
  }
});
