import { Blackjack } from "./demos/blackjack.js"; // ts extension gone
import {
  minimalEditor,
  basicEditor,
  readonlyEditor,
} from "prism-code-editor/setups";
// Importing Prism grammars
import "prism-code-editor/prism/languages/markup";

const game = new Blackjack();
game.play();

const codeEditorText = document.getElementById("code-editor");
if (codeEditorText) {
  codeEditorText.textContent = `<head>
  <link
    rel="stylesheet"
    type="text/css"
    href="stylesheets/prism.css"
    rel="stylesheet"
  />
</head>
...

<pre
  onPaste="setTimeout(function() {onPaste();}, 0)"
  id="editable"
  contenteditable
>
  <code id="yaml" class="language-yaml"></code>
</pre>
<script src="javascript/prism.js"></script>`;
}
