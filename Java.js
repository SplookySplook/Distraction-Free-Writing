const editor = document.getElementById("editor");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const fileNameDisplay = document.getElementById("File");

// Global variable to store the file handle
let currentFileHandle = null;

// Auto-save to localStorage
editor.addEventListener("input", () => {
  localStorage.setItem("myDraft", editor.value);
});

// Save Function
saveBtn.addEventListener("click", async () => {
  try {
    // If no file is open, show the picker (Save As)
    if (!currentFileHandle) {
      currentFileHandle = await window.showSaveFilePicker({
        suggestedName: "Draft.txt",
        types: [
          {
            description: "Text Files",
            accept: {
              "text/plain": [".txt", ".md", ".html", ".css", ".js", ".json"],
            },
          },
        ],
      });
    }

    // Write content to the file
    const writable = await currentFileHandle.createWritable();
    await writable.write(editor.value);
    await writable.close();

    // Update UI
    fileNameDisplay.innerText = currentFileHandle.name;
    console.log("File saved!");
  } catch (err) {
    if (err.name !== "AbortError") console.error(err);
  }
});

// Load Function
loadBtn.addEventListener("click", async () => {
  try {
    const [handle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Documents & Code",
          accept: {
            "text/plain": [".txt", ".md", ".html", ".css", ".js", ".json"],
          },
        },
      ],
      multiple: false,
    });

    // Store the handle!
    currentFileHandle = handle;

    const file = await handle.getFile();
    const content = await file.text();

    editor.value = content;
    localStorage.setItem("myDraft", content);
    fileNameDisplay.innerText = handle.name;
    console.log("File loaded!");
  } catch (err) {
    if (err.name !== "AbortError") console.error(err);
  }
});
