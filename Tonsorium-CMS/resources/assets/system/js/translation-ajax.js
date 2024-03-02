export function translate(word, defaultTrans = undefined, dynamicValues = []) {
  const url = "/languages/ajax-trans";
  $.ajax({
    url,
    type: "get",
    async: false,
    data: {
      word: word.trim(),
      defaultTrans,
      dynamicValues
    },
    success: (data) => {
        word =  data.translated;
    },
  });
  return word;
}
