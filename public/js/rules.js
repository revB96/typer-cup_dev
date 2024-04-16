function printRules() {  
    getRegulationsBySection("rules").then(async (rules) => {
      $(`#regulations-list-rules`).html("");
      rules.forEach(async (rule, index) => {
        await $(`#regulations-list-rules`).append(`
        <li class="list-group-item ${rule.color}">${rule.content}</li>
        `);
      });
    });
  }

$(document).ready(function () {
    if (document.title == "Typer Cup-DEV | Regulamin i zasady") {
        printRules()
    }
  });