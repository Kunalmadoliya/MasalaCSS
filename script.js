const obj = {
  p: "padding",
  pt: "paddingTop",
  pb: "paddingBottom",
  pl: "paddingLeft",
  pr: "paddingRight",

  m: "margin",
  mt: "marginTop",
  mb: "marginBottom",
  ml: "marginLeft",
  mr: "marginRight",

  c: "color",
  bg: "backgroundColor",

  fs: "fontSize",
  fw: "fontWeight",

  w: "width",
  h: "height",

  d: "display",
  f: "flex",
  jc: "justifyContent",
  ai: "alignItems",
};

const textArea = document.getElementById("text-area");
const preview = document.getElementById("preview");

textArea.addEventListener("input", () => {
  const input = textArea.value
    .replace(/kunal-/g, "")
    .trim()
    .split(/\s+/);

  preview.removeAttribute("style"); 

  input.forEach((item) => {
    if (!item) return; 

    const parts = item.split("-");
    if (parts.length < 2) return; 

    const key = Object.keys(obj)
      .sort((a, b) => b.length - a.length)
      .find((k) => parts[0] === k); 

    if (!key) return;

    let value = parts[1];

    // add px
    if (
      ["p","pt","pb","pl","pr","m","mt","mb","ml","mr","w","h","fs"].includes(key)
    ) {
      value = value + "px";
    }

    preview.style[obj[key]] = value;
    console.log(preview);
    
  });
});
