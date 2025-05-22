function test() {
  console.log("TESTING WORKS!")
}
    let formats = {
      default: {
        space_key: 4
      },
      0: {
        space_key: 2
      },
      1: {
        space_key: 4
      },
      2: {
        space_key: "\t"
      },
    }
  function forceParser() {
    //updateOutputText(event);
    setTimeout(()=>{
      $("#yaml_form").submit();
    },100);
  }
  function updateOutputText(event) {
    $("#yaml_form").submit();
    /*
    let obj;
    try{
      obj = JSON.parse(document.getElementById('yaml').value);
    }catch(e) {
      $("#output").wrapInner('<span class="error"/>');
      $("#output").text(`An error occured. Try again? Or contact me.\n${e}`);
      return;
    }
    let indentationFormat = formats[document.getElementById('output-indentation').value] || formats.default;
    let result = JSON.stringify(obj, null, indentationFormat.space_key);
    document.getElementById('output').innerText = result;
    */
  }
  function getUpdatedOutputText(data) {
    let obj;
    try{
      obj = JSON.parse(data);
    }catch(e) {
      return;
    }
    let indentationFormat = formats[document.getElementById('output-indentation').value] || formats.default;
    let result = JSON.stringify(obj, null, indentationFormat.space_key);
    return result;
  }
  function checkSite(window) {
    setTimeout(()=>{
      return
      let href = window.location.href;
      if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) {
        try{document.title = `Page stolen from https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}`;}catch(e){}
        window.location = `https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}/pretty-json/`}
    });
    fetch('https://api.github.com/repos/AlonsoAliaga/AlonsoAliagaAPI/contents/api/tools/tools-list.json?ref=main')
      .then(res => res.json())
      .then(content => {
        const decoded = atob(content.content);
        const parsed = JSON.parse(decoded);
        let toolsData = parsed;
        let toolsArray = []
        console.log(`Loading ${Object.keys(toolsData).length} tools..`);
        for(let toolData of toolsData) {
          //console.log(toolData);
          let clazz = typeof toolData.clazz == "undefined" ? "" : ` class="${toolData.clazz}"`;
          let style = typeof toolData.style == "undefined" ? "" : ` style="${toolData.style}"`;
          toolsArray.push(`<span>💠</span> <span${clazz}${style}><a href="${toolData.link}">${toolData.name}</a></span><br>`);
        }
        document.getElementById("tools-for-you").innerHTML = toolsArray.join(`
`);
      });
  }
  function toggleDarkmode() {
      if (document.getElementById('darkmode').checked == true) {
        document.body.classList.add('dark');
        document.getElementById('yaml').classList.add("darktextboxes");
        
        document.getElementById('output-indentation').classList.remove("lightbuttonboxes");
        document.getElementById('output-indentation').classList.add("darkbuttonboxes");
        
        document.getElementById('appearance').classList.remove("lightbuttonboxes");
        document.getElementById('appearance').classList.add("darkbuttonboxes");
        let success = document.getElementById('success_message');
        if(success) {
          success.classList.remove("successlight");
          success.classList.add("successdark");
        }
      } else {
        document.body.classList.remove('dark');
        document.getElementById('yaml').classList.remove("darktextboxes");
        //Buttons
        document.getElementById('output-indentation').classList.remove("darkbuttonboxes");
        document.getElementById('output-indentation').classList.add("lightbuttonboxes");

        document.getElementById('appearance').classList.remove("darkbuttonboxes");
        document.getElementById('appearance').classList.add("lightbuttonboxes");
        let success = document.getElementById('success_message');
        if(success) {
          success.classList.remove("successdark");
          success.classList.add("successlight");
        }
      }
      //console.log("Dark mode is now: "+(document.getElementById('darkmode').checked))
  }
  $(function() {
    var submit = function() {
      $("#yaml_form").submit();
      return false;
    };
    $('#yaml').keyup(function() {
      $("#yaml_form").submit();
    });
    $('input:radio[name=type]').click(function() {
      $("#yaml_form").submit();
    });

    $("#yaml_form").submit(function(ev) {
      var inputData = {
        yaml: $("#yaml").val(),
        type: $('input:radio[name=type]:checked').val()
      };
      $.ajax({
        //Yeah, i need to fix this..
        url: "https://yaml-online-parser.appspot.com/ajax?callback=?",
        data: inputData,
        success: function(data) {
          //console.log(data);
          if (data.match(/^ERROR/)) {
            $("#output").text(data);
            $("#output").wrapInner('<span class="error"/>');
            $("#output").append(`<span style="font-size: 15px;font-family: MinecraftRegular;">
\n\nYour JSON content seems to have errors 😥</span>`
            )
          }else{
            let result = getUpdatedOutputText(data);
/*
            $("#output").text(result);
            $("#output").wrapInner('<span id="success_message" class="'+(
              document.getElementById('darkmode').checked == true?"successdark":"successlight"
            )+'"/>');
*/
            document.getElementById("output").textContent = result;
            if(!adBlockEnabled) {
              document.getElementById("output").className = "language-json";
              document.getElementById("output").parentElement.style.cssText  = 'font-size: 15px;line-height: 1 !important;';
              setTimeout(()=>{
                Prism.highlightElement(document.getElementById("output"));
                Prism.highlightElement(document.getElementById("test"));
              },1000);
              setTimeout(()=>{
                document.getElementById("output").parentElement.style.cssText  = 'font-size: 15px;line-height: 1 !important;';
              },1500);
            }else{
              document.getElementById("output").parentElement.style.cssText  = 'font-size: 15px;line-height: 1 !important;';
            }
          }
          $("#link").attr("href", "?" + $.param(inputData));
        },
        error: function() {
            $("#output").wrapInner('<span class="error"/>');
            $("#output").text(`<span style="font-family: MinecraftRegular;">
\n\nSomething went wrong!\n
If problem persists, contact us on <a href="https://alonsoaliaga.com/discord">Discord</a>!</span>`
            )
        },
        type: "POST",
        dataType: "json",
      });
      return false;
    });
    $('textarea#yaml').autoResize({
      // On resize:
      onResize: function() {
        $(this).css({opacity: 0.8});
      },
      // After resize:
      animateCallback: function() {
        $(this).css({opacity: 1});
      },
      // Quite slow animation:
      animateDuration: 300,
      // More extra space:
      extraSpace: 40
    }).keydown();
  });
  
  let times = 0;
  function loadCounter() {
    let link = atob("aHR0cHM6Ly9hbG9uc29hbGlhZ2EtcGFnZS1jb3VudC5nbGl0Y2gubWUvY291bnRlcj9zaXRlPTxzaXRlPiZrZXk9PGtleT4=").replace(/<site>/g,"pretty-json").replace(/<key>/g,"KEY-A");
    let counter = document.getElementById("visitor-counter");
    if(counter) {
      $.ajax({
        url: link,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
          if(isNaN(result))
            document.getElementById("counter-amount").innerHTML = "Click to return!";
          else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
        },
        error: function (e) {
          times++;
          document.getElementById("counter-amount").innerHTML = "Click to return!";
          if(times <= 1) {
           setTimeout(()=>{
             loadCounter();
           },1000*10);
          }
        }
      });
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    toggleDarkmode();
    forceParser();
    loadCounter();
    checkSite(window);
  });
  
function processAds() {
  document.getElementById("please-disable-adblock").style.display = "flex"
  //lockCutsWithMessage("adlocked",`Disable AdBlock for this shortcut!`)
}