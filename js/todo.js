    // Haetaan elementit
    const lisaaBtn = document.querySelector("#lisaa");
    const input = document.querySelector("#teksti");
    const table = document.querySelector("#main tbody");
    const tekematonBtn = document.querySelector("#tekematon")
    const tehtyBtn = document.querySelector("#tehty")
    const kaikkiBtn = document.querySelector("#kaikki")
    
    // Enter-painallus lisää rivin
      input.addEventListener("keydown", function(e) {
        if(e.key === "Enter") {
            e.preventDefault();
            lisaaBtn.click();
        }
    })

    // Lisätään uusi rivi napista
    lisaaBtn.addEventListener("click", function () {
      const teksti = input.value.trim();

     // Validoidaan syöte siten, ettei tyhjiä rivejä sallita
      if (teksti.length < 2) {
        input.className = "virheboxi"
        alert("Syötteen täytyy olla vähintään kaksi (2) merkkiä pitkä.")
        input.focus();
        return;
          }

      // Tuodaan lisävalintanapit näkyviin, kun rivejä on vähintään yksi
          if (table.rows.length > -1) {
            tekematonBtn.style.display = "inline";
            tehtyBtn.style.display = "inline";
            kaikkiBtn.style.display = "inline";
          }
    
      // Lisätään tyhjä rivi taulukkoon
      const uusiRivi = table.insertRow(-1);

      // Lisätään tyhjät solut
      const solu1 = uusiRivi.insertCell(0);
      const solu2 = uusiRivi.insertCell(1);
      const solu3 = uusiRivi.insertCell(2);

      // Lisätään checkbox 1. soluun
      solu1.className = "checkbox-solu";
      solu1.innerHTML = '<input type="checkbox" name="checkbox" />';

      // 2. soluun syöte
      solu2.textContent = teksti;
      input.className = "oikeinboxi"

      // 3. soluun poistonappi
      solu3.className = "poista-solu";
      solu3.innerHTML = '<span class="poista-btn" title="Poista rivi">X</span>';

      // Tyhjennetään syöteboxi, kun rivi on luotu, mutta pidetään syöte aktiivisena
      input.value = "";
      input.focus();
    });

    // Käsitellään checkboxit ja poistonapit saman kuuntelijan kautta
    document.querySelector("#main").addEventListener("click", function (e) {
      if (e.target.matches('input[type="checkbox"][name="checkbox"]')) {
        const rivi = e.target.closest("tr");
        const tehtavaSolu = rivi.cells[1];
        if (e.target.checked) {
          tehtavaSolu.classList.add("valmis");
        } else {
          tehtavaSolu.classList.remove("valmis");
        }
      }

      // Poistetaan rivi
      if (e.target.matches(".poista-btn")) {
        const rivi = e.target.closest("tr");
        rivi.remove();
      }

    });
      // Näyttää vain merkkaamattomat rivit
    tekematonBtn.addEventListener("click", function(){
            const rivit = table.querySelectorAll("tr");
            rivit.forEach(function(rivi) {
                const checkbox = rivi.querySelector('input[type="checkbox"]');
               if(checkbox.checked){
                rivi.style.display = "none"
            }
            else{
              rivi.style.display = "inline"
              rivi.style = "table-row"
            }
            })
        });

        // Näyttää vain tehdyksi merkatut rivit
    tehtyBtn.addEventListener("click", function() {
        const rivit = table.querySelectorAll("tr");
        rivit.forEach(function(rivi){
            const checkbox = rivi.querySelector('input[type="checkbox"]');
            if(checkbox.checked == false){
                rivi.style.display = "none"
            }
            else{
              rivi.style.display = "inline"
              rivi.style = "table-row"
            }
        })
    })

    // Palauttaa kaikki rivit näkyville
    kaikkiBtn.addEventListener("click", function() {
        const rivit = table.querySelectorAll("tr");
        rivit.forEach(function(rivi){
            const checkbox = rivi.querySelector('input[type="checkbox"]');
            if(checkbox){
                rivi.style.display = "inline"
                rivi.style = "table-row"
            }
        })
    })
