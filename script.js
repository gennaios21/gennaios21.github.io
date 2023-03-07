function getMO() {
    ////////// αριθμος περασμενων μαθηματων + τωρινος Μ.0
    let lessons1 = parseInt(Number(document.querySelectorAll('input')[0].value));
    let lessons2 = parseInt(Number(document.querySelectorAll('input')[1].value));
    let mo = (document.querySelectorAll('input')[2].value);

    ////////// διπλωματικη + βαθμοι μαθηματων

    let test = document.querySelectorAll('input')
    let inputs1 = []
    let sum1 = 0
    let sum2 = 0
    let inputs2 = []
    for (let i = 3; i < test.length - 1; i++) {
        if (test[i].name == "input1" && Number(test[i].value) >= 5 && Number(test[i].value) <= 10) {
            inputs1.push(Number(test[i].value) * 1.5)
            sum1 = sum1 + Number(test[i].value) * 1.5
        }
        if (test[i].name == "input2" && Number(test[i].value) >= 5 && Number(test[i].value) <= 10) {
            inputs2.push(Number(test[i].value) * 2)
            sum2 = sum2 + Number(test[i].value) * 2
        }
    }
    let length1 = inputs1.length
    let length2 = inputs2.length

    let thesis = Number(document.getElementById('input3').value);

    ////////// αρχικος μ.ο και μεταβλητες υπολογισμου

    let A = (lessons1 > 0 || lessons2 > 0) ? (lessons1 * 1.5 + lessons2 * 2) : window.alert("Δώσε τα περασμένα μαθήματά σου")
    let current = mo * A
    let lessons = (thesis >= 5 && thesis <= 10) ? (A + length1 * 1.5 + length2 * 2 + 15) : (A + length1 * 1.5 + length2 * 2)

    // ελεγχοι για τιμες μεταξυ 5 και 10
    thesis = (thesis >= 5 && thesis <= 10) ? thesis : 0
    lessons1 = (lessons1 >= 0 && lessons1 <= 39) ? lessons1 : window.alert("Αρ. μαθημάτων με συντελεστή 1.5 για πτυχίο: 27 μαθήματα κορμού και το πολύ 12 κατεύθυνσης")
    lessons2 = (lessons2 >= 0 && lessons2 <= 27) ? lessons1 : window.alert("Αρ. μαθημάτων με συντελεστή 2 για πτυχίο: 11 μαθήματα κορμού, τουλάχιστον 4 κατεύθυνσης (4 υποχρεωτικά εργαστήρια) και το πολύ 16 κατεύθυνσης")
    mo = (mo >= 5 && mo <= 10) ? mo : window.alert("Πες την αλήθεια ωρέ, τι Μ.Ο έχεις;")


    ////////// νεος Μ.Ο
    let new_mo = (current + sum1 + sum2 + thesis * 15) / lessons
    new_mo = new_mo.toPrecision(3)

    let show = document.createElement('div')
    show.innerText = "Συγχαρητήρια μηχανευτή. Ο νέος Μ.Ο. σου είναι: " + new_mo
    show.style.color = "blue";
    document.querySelector('form').appendChild(show)
}


////////// προσθηκη μαθηματων
let counter = 1
function addLesson(k) {
    counter++
    if (counter >= 54) {
        window.alert("Έφτασες τον μέγιστο αριθμό μαθημάτων")
    }

    else {
        console.log(`Προστέθηκε μάθημα με συντελεστή: ${k}`)

        let input = document.createElement('input')
        input.type = "number"
        input.placeholder = 0
        input.innerText = "test"
        input.style.color = "black";
        input.style.margin = "5px"
        input.style.value = "0"
        input.style.width = "100px"
        input.min = 5
        input.max = 10

        let button = document.createElement('button')
        button.textContent = "-"
        button.style.color = "blue"

        if (k == 1.5) {
            input.name = "input1"
            document.getElementById('input1').appendChild(input)
            document.getElementById('input1').appendChild(button)
            button.addEventListener('click', () => {
                input.remove()
                button.remove()
            });
        }
        if (k == 2) {
            input.name = "input2"
            document.getElementById('input2').appendChild(input)
            document.getElementById('input2').appendChild(button)
            button.addEventListener('click', () => {
                input.remove()
                button.remove()
            });
        }
    }
}
