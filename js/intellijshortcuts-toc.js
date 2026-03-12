// Intellijshortcuts - Table of Contents Data
const intellijshortcutsTocData = `<a href="#shrotcuts" class="toc-item toc-level-{item["level"]}" style="padding-left: 0px" data-target="shrotcuts">Shrotcuts</a>
<a href="#basics-to-know" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="basics-to-know">Basics To Know</a>
<a href="#intellij-settings" class="toc-item toc-level-{item["level"]}" style="padding-left: 20px" data-target="intellij-settings">intellij Settings</a>
<a href="#shortcuts" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="shortcuts">Shortcuts</a>
<a href="#intellij-debug-enable" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="intellij-debug-enable">intellij Debug enable</a>
<a href="#to-add-all-the-project-to-intellij-as-spring-boot" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="to-add-all-the-project-to-intellij-as-spring-boot">To Add all the project to intellij as spring boot</a>
<a href="#build-gradle-commands" class="toc-item toc-level-{item["level"]}" style="padding-left: 40px" data-target="build-gradle-commands">Build &amp; Gradle Commands</a>`;

if (document.getElementById('toc')) {
    document.getElementById('toc').innerHTML = intellijshortcutsTocData;
}
