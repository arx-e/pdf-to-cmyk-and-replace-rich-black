// written by Aris Vidalis - contact me at arisvidalis@gmail.com
// Before running the script:
// 1. Gather your files in a certain folder
// 2. Create a subfolder named "newpdf" (without the quotes)
// 3. Open Adobe Illustrator and create a blank file (without an open file the app.executeMenuCommand("doc-color-cmyk") is not running
// 4. Run the script fron the menu File > Scripts > Other scripts
// if you wish to do more color replacement operations such as cleaning yellows, reds, etc  you can add them after line 44 for example

app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
var filesFolder = Folder.selectDialog('Select the folder where the (.ai) files are located.', '~');
if (filesFolder != null) {
  var filesArray = new Array();
  filesArray = filesFolder.getFiles("*.ai");

  if (filesArray.length > 0) {
    var doc;
    for (f = 0; f < filesArray.length; f++) {
      doc = app.open(filesArray[f]);
      with(doc) {

// convert document to CMYK color mode
        app.executeMenuCommand("doc-color-cmyk");

// Define target colors
// pure black (K=100%)
        pureK = new CMYKColor();
        pureK.black = 100;

// Procedures
        var totalObjects = doc.pathItems.length;
        $.writeln(totalObjects);
        var myPathItems = doc.pathItems;
        for (var i = 0; i < totalObjects; i++) {
          curObj = myPathItems[i];
          strokeTotInk = curObj.strokeColor.cyan + curObj.strokeColor.magenta + curObj.strokeColor.yellow + curObj.strokeColor.black;
// set all rich black stokes to pure black
          if (strokeTotInk > 290 == true) {
            curObj.strokeColor = pureK;
          }
          fillTotInk = curObj.fillColor.cyan + curObj.fillColor.magenta + curObj.fillColor.yellow + curObj.fillColor.black;
// set all rich black fills to pure black
          if (fillTotInk > 290 == true) {
            curObj.fillColor = pureK;
          }
// enable overprint for fills and strokes over 98% K
          if (curObj.fillColor.black > 98 == true) {
            curObj.fillOverprint = true;
          }
          if (curObj.strokeColor.black > 98 == true) {
            curObj.strokeOverprint = true;
          }
        }

// process text objects; here all text is converted to 100K and Overprint Fill
// if you have text with other colors you can add conditions and process accordingly

        var tfs = doc.textFrames;
        var n = tfs.length;
        var converted_counter = 0;
        // loop over text frames
        for (i = 0; i < n; i++) {
          // To prevent errors with tfs[i].textRange.size when == 0
          if (tfs[i].textRange.length > 0) {
            var current_characters = tfs[i].textRange.characters;
            var current_range = tfs[i].textRange
        //  set all text fill to pure K and eneable overprint
           for (j = 0; j < current_characters.length; j++) {
              converted_counter++;
              current_characters[j].fillColor = pureK;
              current_characters[j].overprintFill = true;
            }
          }
        }

//  save file with options defined below
        saveAsPDF()
// close document
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

      }
      doc = null;
    }
  } else {
    alert('No Illustrator (.ai) files found');
  }
}

// pdf save option definition

function saveAsPDF() {
  var pdfFile = new File(app.activeDocument.path + "/newpdf/" + app.activeDocument.name.split('.')[0] + '.pdf');
  var pdfOptions = new PDFSaveOptions();
  pdfOptions.compatibility = PDFCompatibility.ACROBAT7;
  pdfOptions.generateThumbnails = true;
  pdfOptions.preserveEditability = true;
  pdfOptions.preset = "[Press Quality]";
  app.activeDocument.saveAs(pdfFile, pdfOptions);
}
