# pdf-to-cmyk-and-replace-rich-black
Adobe Illustrator Script for converting PDF files from RGB to CMYK and change rich black to pure K

How to run the script:
1. Gather your files in a folder
2. Create a subfolder named "newpdf" (without the quotes)
3. Open Adobe Illustrator and create a blank file (because without an open file the app.executeMenuCommand("doc-color-cmyk") is not running)
4. Run the script fron the menu File > Scripts > Other scripts

If you wish to do more color replacement operations such as cleaning yellows, reds, etc. you can add them after line 44 for example.

This script does the following:
- Convert the document to CMYK color mode.
- Define target colors. You can define more colors here and use them later.
- Set all rich black (total ink over 290%) strokes to pure black (K 100%).
- Set all rich black fills (total ink over 290%) to pure black (K 100%).
- Enable overprint for fills and strokes over K 98%.
- Set all text fills to pure K and enable overprint.
- Save the file with PDF options "Press Quality".
- Close the document.
