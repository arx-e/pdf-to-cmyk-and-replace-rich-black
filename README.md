# pdf-to-cmyk-and-replace-rich-black
Adobe Illustrator Script that can be used to convert pdf files to CMYK and correct rich black to pure K

How to run the script:
1. Gather your files in a certain folder
2. Create a subfolder named "newpdf" (without the quotes)
3. Open Adobe Illustrator and create a blank file (without an open file the app.executeMenuCommand("doc-color-cmyk") is not running
4. Run the script fron the menu File > Scripts > Other scripts

If you wish to do more color replacement operations such as cleaning yellows, reds, etc  you can add them after line 44 for example.

Thios scripts does the following:
Converts the document to CMYK color mode.
Defines target colors (you can define more colors here and use them later).
Sets all rich black (total ink over 290) stokes to pure black.
Sets all rich black fills (total ink over 290) to pure black.
Enable overprint for fills and strokes over 98% K.
Sets all text fills to pure K and eneable overprint.
Saves the file with PDF options "Press Quality".
Closes the document.
