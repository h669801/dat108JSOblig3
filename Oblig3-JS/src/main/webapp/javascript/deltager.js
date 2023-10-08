class DeltagerManager {

    #regElm;
    #statElm;
    #finndeltagerElm;
    participants = [];
    // Deklarer resterende felt-variabler her

    constructor(root) {
        this.#regElm = root.getElementsByClassName("registrering")[0];

        const regButton = this.#regElm.getElementsByTagName("button")[0];
        regButton.addEventListener("click", () => { this.#registrerdeltager() });

        this.#statElm = root.getElementsByClassName("statistikk")[0];
        const statButton = this.#statElm.getElementsByTagName("button")[0];
        statButton.addEventListener("click", () => { this.#beregnstatistikk() });

        this.#finndeltagerElm = root.getElementsByClassName("deltager")[0];
        const deltagerButton = this.#finndeltagerElm.getElementsByTagName("button")[0];
        deltagerButton.addEventListener("click", () => { this.#finndeltager() });
        
        // Fyll evt. inn mer kode
    }

    #finndeltager() {
        // Fyll inn kode   
       const deltagerInput = this.#finndeltagerElm.querySelector("input[type='number']");
        const deltagerId = parseInt(deltagerInput.value);

        if (isNaN(deltagerId) || deltagerId < 1 || deltagerId > 999) {
            // Handle invalid input (show error message, clear results, etc.)
            return;
        }

        let foundParticipant = null;
        for (const participant of this.participants) {
            if (participant.startnummer === deltagerId) {
                foundParticipant = participant;
                break;
            }
        }

        const resultElement = this.#finndeltagerElm.querySelector(".resultatok");
        const resultElementMangler = this.#finndeltagerElm.querySelector(".resultatmangler");
    if (resultElement) {
        if (foundParticipant) {
            resultElement.textContent = `Deltager ID: ${foundParticipant.startnummer}, Navn: ${foundParticipant.navn}, Sluttid: ${foundParticipant.tid}`;
            resultElement.classList.remove("hidden");
            resultElementMangler.classList.add("hidden");
        } else {
            resultElement.textContent = "Deltageren ble ikke funnet.";
            resultElement.classList.add("hidden");
            resultElementMangler.classList.remove("hidden");
        }
    } else {
        console.error("Result element not found in the HTML structure.");
    }
    }


    #beregnstatistikk() {
        // Fyll inn kode   
        //const fraInput = this.#statElm.querySelector("input[name='nedregrense']");
       // const tilInput = this.#statElm.querySelector("input[name='ovregrense']");
       
       const fraInput = document.getElementById("nedregrense");
   	   const tilInput = document.getElementById("ovregrense");

        const fraTime = this.parseTime(fraInput.value);
        const tilTime = this.parseTime(tilInput.value);

        if (!fraTime || !tilTime || fraTime >= tilTime) {
            return;
        }
        
        //const resultElementStatistikk = this.#finndeltagerElm.querySelector(".resultatok");
        //const resultElementStatistikkMangler = this.#finndeltagerElm.querySelector(".resultatmangler");

        let countParticipantsInInterval = 0;
        for (const participant of this.participants) {
            const participantTime = this.parseTime(participant.tid);
            if (participantTime >= fraTime && participantTime <= tilTime) {
                countParticipantsInInterval++;
            }
        }
        
        //const resultatElement = this.#statElm.querySelector(".resultat");
        //if(resultatElement){
			//if(countParticipantsInInterval){
				//resultatElement.textContent = `Fant ${countParticipantsInInterval} deltagere i intervallet ${fraInput.value} til ${tilInput.value}: `;
				//resultatElement.classList.remove("hidden");
			//}
			//else{
				//resultatElement.textContent = "Ingen deltagere ble funnet.";
				//resultatElement.classList.add("hidden");
			//}
		//}
   // const resultatElement = document.querySelector(".resultat .antall");
    //const fraElement = document.querySelector(".resultat .Fra");
    //const tilElement = document.querySelector(".resultat .Til");

    //fraElement.textContent = fraInput.value;
    //tilElement.textContent = tilInput.value;
    //resultatElement.textContent = countParticipantsInInterval;

    // Vis resultatet ved å fjerne "hidden" klassen fra hele resultatet
    //const resultatContainer = document.querySelector(".resultat");
    //resultatContainer.classList.remove("hidden");
    
    
    const resultatElement = document.querySelector(".resultat");
    const antallElement = resultatElement.querySelector("span");
    const fraElement = resultatElement.querySelectorAll("span")[0];
    const tilElement = resultatElement.querySelectorAll("span")[1];

    antallElement.textContent = countParticipantsInInterval;
    fraElement.textContent = fraInput.value;
    tilElement.textContent = tilInput.value;

    resultatElement.classList.remove("hidden");
        console.log(resultatElement);
        
    }

    #registrerdeltager() {
        const tidReg = /(?:\d{0,2}:){2}\d{0,2}/g;
        const startnummerReg = /\d{1,3}/g;
        const navnReg = /\p{L}{2,}(?:-\p{L}{2,})?/gu;

        const inputField = this.#regElm.querySelector("input[type='text']");
        const inputData = inputField.value;

        const startnummerMatch = inputData.match(startnummerReg);
        const tidMatch = inputData.match(tidReg);
        const navnMatch = inputData.match(navnReg);

        if (!startnummerMatch || !tidMatch || !navnMatch) {
            return;
        }
        
        if (!startnummerMatch || startnummerMatch.length === 0) {
   			 return;
}

        const startnummer = parseInt(startnummerMatch[0]);
        const tid = tidMatch[0];
        const navn = this.formatName(navnMatch);

        this.participants.push({ startnummer, tid, navn });

        this.updateBestTimeDisplay(tid);

        inputField.value = "";
        console.log("Startnummer: ", startnummerMatch);
		console.log("Tid: ", tidMatch);
		console.log("Navn: ", navnMatch);
		console.log("Formatert navn: ", this.formatName(navnMatch));
		console.log("Deltagere: ", this.participants);
    }
    parseTime(timeString) {
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            return null;
        }
        return hours * 3600 + minutes * 60 + seconds;
    }

    formatName(nameMatches) {
        return nameMatches.map(match => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()).join(" ");
    }

    updateBestTimeDisplay(newTime) {
        // Implement this method to update the display of the best time
        // You can compare the newTime with the current best time and update accordingly
    }
}

const rootelement = document.getElementById("root");
new DeltagerManager(rootelement);