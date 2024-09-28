
async function handleFormSubmit(event) {
    event.preventDefault();  


    const Fname = document.getElementById("fname").value;
    const Lname = document.getElementById("lname").value;
    const Age = document.getElementById("age").value;


    const Pneu = document.getElementById("pneu").checked;

    const Intu = document.getElementById("intu").checked;
    const Asth = document.getElementById("asth").checked;
    const Hyper = document.getElementById("hyper").checked;
    const Obes = document.getElementById("obesi").checked;
    const Tobba = document.getElementById("tobba").checked;
    const Dia = document.getElementById("diabetes").checked;
    const Inmsupr = document.getElementById("inmsupr").checked;
    const Covid = document.getElementById("covid").checked;
    const RC = document.getElementById("Renal_Chronic").checked;
    const Cardio = document.getElementById("Cardiovascular").checked;
    const Other = document.getElementById("other").checked;
    const COPD = document.getElementById("copd").checked;
    const Medical = document.getElementById("medical_unit").checked;
    const Usmer = document.getElementById("usmer").checked;
    const Gender = document.getElementById("gender").value;
    const Reside = document.getElementById("reside").value;

    const outputTextarea = document.getElementById("fresult");

    if (Fname === "" || Lname === "") {
        alert("Please enter some text.");
        return;
    }
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { 
                    Fname: Fname,
                    Lname: Lname,
                    Age : Age,
                    Pneu: Pneu,
                    Intu: Intu,
                    Asth: Asth,
                    Hyper: Hyper,
                    Obes: Obes,
                    Tobba: Tobba,
                    Dia: Dia,
                    Inmsupr: Inmsupr,
                    Covid: Covid,
                    RC: RC,
                    Cardio: Cardio,
                    Other: Other,
                    COPD: COPD,
                    Medical: Medical,
                    Usmer: Usmer,
                    Gender: Gender,
                    Reside: Reside
                }
            )
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        outputTextarea.value = data.answer;
    } catch (error) {
        console.error('There was an error:', error);
        outputTextarea.value = "Error fetching response.";
    }
} 
document.getElementById("button").addEventListener("click", handleFormSubmit);