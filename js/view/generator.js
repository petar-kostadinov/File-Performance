import { html, render } from "https://cdn.jsdelivr.net/npm/lit-html@2.5.0/lit-html.js";

const generatorTemp = () => html`

    <section id="generator">
        <div class="buttons-wrapper">
           <button id="clear-table">Clear Table</button>
           <button id="generate-button">Generate</button>
        </div>
        <div class="table">
            <h1>Select options</h1>
                <div class="radio-group">
                    <div>
                      <input type="radio" id="option1" name="options" value="Simon">
                      <label for="option1"><img src="" alt="">Simon</label>
                      <img class="radio-img" src="File-Performance/images/Simon.jpg" alt="">
                    </div>

                    <div>
                      <input type="radio" id="option2" name="options" value="Hanna">
                      <label for="option2">Hanna</label>
                      <img class="radio-img" src="images/Hanna.jpg" alt="">
                    </div>

                    <div>
                       <input type="radio" id="option3" name="options" value="Mathis">
                       <label for="option3">Mathis</label>
                       <img class="radio-img" src="images/Mathis.jpg" alt="">
                    </div>

                    <div>
                       <input type="radio" id="option4" name="options" value="Ava">
                       <label for="option4">Ava</label>
                       <img class="radio-img" src="images/Ava.jpg" alt="">
                    </div>

                    <!-- <div>
                        <input type="radio" id="option5" name="options" value="">
                        <label for="option4">????????</label>
                        <img class="radio-img" src="images/.jpg" alt="">
                    </div> -->

                </div>
                <div class="radio-group2">
                        <div>
                           <input type="radio" id="machine1" name="machines" value="Nesting">
                           <label for="machine1">Nesting</label>
                        </div>
                       
                        <div>
                           <input type="radio" id="machine2" name="machines" value="CNC">
                           <label for="machine2">CNC</label>
                        </div>
                </div>
                 
                   

        </div>

        <div class="table-container">
            <table id="dynamic-table">
                <thead>
                 <tr>
                     <th>Module</th>
                     <th>Part number/name</th>
                     <th>L</th>
                     <th>B</th>
                     <th>H</th>
                 </tr>
                </thead>
                <tbody>
                 <tr class="empty-row">
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                    <td contenteditable="true"></td>
                 </tr>
                </tbody>
            </table>
        </div>
    </section>
`
function loadScript() {
    import("../generatelogic.js")
        .then((module) => {
            module.init();
        })
        .catch((error) => console.error("Error loading logic script", error));
}

let context = null;
export function showGeneratorView(ctx) {
    context = ctx;
    context.hideSlider();
    context.render(generatorTemp());

    setTimeout(() => {
        loadScript();
    }, 0);
}

