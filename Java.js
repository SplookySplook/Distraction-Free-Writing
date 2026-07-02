const editor = document.getElementById("editor");
const saveBtn = document.getElementById("saveBtn");

// Auto-save to localStorage as you type
editor.addEventListener("input", () => {
  localStorage.setItem("myDraft", editor.value);
});

// Manual "Save to File" functionality
saveBtn.addEventListener("click", () => {
  const textToSave = editor.value;
  const blob = new Blob([textToSave], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "my-draft.txt"; // You can change this to .md for Markdown
  a.click();

  URL.revokeObjectURL(url);
});
