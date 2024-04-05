const fs = require("fs");
const path = require("path");

const filePath = "./node_modules/formidable/src/index.js";

// Read the file
fs.readFile(filePath, "utf8", (err: any, data: any) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Modify the content (replace require with import)
  const modifiedData = data.replace(
    /const\s+([^\s]+)\s*=\s*require\s*\(\s*'hexoid'\s*\);/,
    "import $1 from 'hexoid';"
  );
  // Write the modified content back to the file
  fs.writeFile(filePath, modifiedData, (err: any) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("Build script completed successfully.");
  });
});
