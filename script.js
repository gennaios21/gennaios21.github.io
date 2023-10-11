//////////// import file function

let readSingleFileCounter = 0
let lessons11 = 0;
let lessons21 = 0;
let average = 0

function readSingleFile(evt) {
    var f = evt.target.files[0];
    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            var ct = r.result;
            var words = ct.split(' ');  //this is not needed

            let input_file_as_text = words.join(); //this is bullshit
            //input_file_as_text = input_file_as_text
            input_file_as_text = input_file_as_text.replace("\n", " "); //remove newline characters
            const regex = /.*([5-9]|10),(0|5).*2.*(1,5|2,0|1,0)/g; // basically match a passing grade (e.g. 8,5 or 10,0 or 5,0) followed by anything and then a "2" (the 2022 following grades in a line, this is to differentiate from other random text that follows thsi pattern) then followed by anything and finally followed by one of 1,0 1,5 1,2
            const found = input_file_as_text.match(regex); //find matches for pattern
            console.log(found.length);
            let grade_sum = 0;
            let weight_sum = 0;
            for (let i = 0; i < found.length; i++) {

                line = found[i].replace(/[\u0009]/g, " "); //replace control character to space for spliting later
                let grade = line.split(" ")[5].replace(",", "."); //get 6.5 from 6,5

                let weight = line.split(",,").at(-1).replace(",", ".");

                console.log(i + " " + grade + " " + weight);



                if (weight == 1.5 || weight == 1.0) {
                    lessons11 = lessons11 + 1;
                }
                if (weight == 2.0) {
                    lessons21 = lessons21 + 1;
                }

                grade_sum = grade_sum + parseFloat(grade * weight);
                weight_sum = weight_sum + parseFloat(weight);
                //console.log(weight_sum);

            }
            console.log(grade_sum / weight_sum);
            average = Math.round(100 * grade_sum / weight_sum) / 100;
            document.getElementById("lessons1").value = lessons11;
            document.getElementById("lessons2").value = lessons21;
            document.getElementById("mo").value = average;

            ///////////////////////////////
            readSingleFileCounter++
            // console.log("lessons: ", lessons1, lessons2, average)
            return { lessons11, lessons21, average, readSingleFileCounter }

        }
        r.readAsText(f, "CP1253");

    }
    else {
        alert("Failed to load file");
    }

}
document.getElementById('fileinput').addEventListener('change', readSingleFile, false);

/////////////////////////////////////// calculate average 
let count = 1

function getMO() {

    let lessons1, lessons2, mo

    // ελεγχος αν εγινε import του WDP.xls
    if (readSingleFileCounter > 0) {
        lessons1 = lessons11
        lessons2 = lessons21
        mo = average
    }

    else {
        ////////// αριθμος περασμενων μαθηματων + τωρινος Μ.0
        lessons1 = parseInt(Number(document.querySelectorAll('input')[1].value));
        lessons2 = parseInt(Number(document.querySelectorAll('input')[2].value));
        mo = (document.querySelectorAll('input')[3].value);
    }

    ////////// διπλωματικη + βαθμοι μαθηματων
    let lesson = document.querySelectorAll('input')
    let inputs1 = []
    let inputs2 = []
    let sum1 = 0
    let sum2 = 0
    for (let i = 3; i < lesson.length - 1; i++) {
        let grade = Number(lesson[i].value)
        if (lesson[i].name == "input1" && grade >= 5 && grade <= 10) {
            inputs1.push(grade * 1.5)
            sum1 = sum1 + grade * 1.5
        }
        if (lesson[i].name == "input2" && grade >= 5 && grade <= 10) {
            inputs2.push(grade * 2)
            sum2 = sum2 + grade * 2
        }
    }
    let length1 = inputs1.length
    let length2 = inputs2.length

    let thesis = Number(document.getElementById('input3').value);

    ////////// αρχικος μ.ο και μεταβλητες υπολογισμου
    let grades = (lessons1 > 0 || lessons2 > 0) ? (lessons1 * 1.5 + lessons2 * 2) : window.alert("Δώσε τα περασμένα μαθήματά σου")
    let current = mo * grades
    let lessons = (thesis >= 5 && thesis <= 10) ? (grades + length1 * 1.5 + length2 * 2 + 15) : (grades + length1 * 1.5 + length2 * 2)

    /// ελεγχοι για τιμες μεταξυ 5 και 10
    thesis = (thesis >= 5 && thesis <= 10) ? thesis : 0
    lessons1 = (lessons1 >= 0 && lessons1 <= 39) ? lessons1 : window.alert("Αρ. μαθημάτων με συντελεστή 1.5 για πτυχίο: 27 μαθήματα κορμού και το πολύ 12 κατεύθυνσης")
    lessons2 = (lessons2 >= 0 && lessons2 <= 27) ? lessons1 : window.alert("Αρ. μαθημάτων με συντελεστή 2 για πτυχίο: 11 μαθήματα κορμού, τουλάχιστον 4 κατεύθυνσης (4 υποχρεωτικά εργαστήρια) και το πολύ 16 κατεύθυνσης")
    mo = (mo >= 5 && mo <= 10) ? mo : window.alert("Πες την αλήθεια ωρέ, τι Μ.Ο έχεις;")
    
    ////////// νεος Μ.Ο.
    let new_mo = (current + sum1 + sum2 + thesis * 15) / lessons ;
    console.log(new_mo); //log M.O. with full accuracy
    new_mo = new_mo.toPrecision(3)
    


    let show = document.createElement('div')
    show.innerText = `(${count++}) Συγχαρητήρια μηχανευτή. Ο νέος Μ.Ο. σου είναι: ${new_mo}`
    show.style.color = "blue";
    document.querySelector('form').appendChild(show)

}


////////// προσθηκη και αφαιρεση μαθηματων
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
        input.step = 0.5

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
