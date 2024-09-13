const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const BOT_IMG = "bot.jpg";
const PERSON_IMG = "person.jpg";
const BOT_NAME = "User";
const PERSON_NAME = "Huma";

const prompts = [
    ["hello", "hey", "hi", "good day", "greetings", "what's up?", "how is it going?"],
    ["what is your name", "name", "what's your name", "who are you", "what should I call you"],
    ["what courses are available", "how many courses are there in this college"],
    ["how long will be BIT or BBA course", "how long will it take to complete BIT or BBA course"],
    ["location", "where is it located", "what is the location of the college"],
    ["how many semesters are there in a year", "how many semesters one should study in a year"],
    ["how many months are there in a semester", "how long will be a single semester"],
    ["what are your hours", "when are you guys open", "what are your hours of operation"]
];

const replies = [
    ["Hello!", "Hey!", "What can I do for you?"],
    ["You can call me Ribot", "I'm Ribot", "I'm Ribot, your virtual assistant"],
    ["Informatics College Pokhara has been in direct partnership with London Metropolitan University, UK to provide enviable higher education in IT and Business to students in Pokhara. For Bachelors Degree in Information Technology we have been offering the specialization in BSc (Hons) Computing. For Bachelors in Business Administration we have been offering the following: 1. BBA (Marketing) with International Business 2. BBA (Accounting & Finance) with International Business 3. BBA (International Business)"],
    ["Our college offers a 3-year-long BIT course and a 3.5-year-long BBA course."],
    ["Informatics College Pokhara is located in Matepani-12, Pokhara, near Gandaki Hospital."],
    ["There are two semesters in a year."],
    ["A single semester will be around 4 months."],
    ["You can message us here at any time. But our college premises will be open from 7:00 am to 5:00 pm only."]
];

const alternative = [
    "same", "go on...", "bro", "try again", "I am happy to hear...", "I don't understand :/"
];

const robot = ["how do you do, fellow human", "I am not a bot"];

msgerForm.addEventListener("submit", event => {
    event.preventDefault();
    const msgText = msgerInput.value;
    if (!msgText) return;
    msgerInput.value = "";
    addChat(PERSON_NAME, PERSON_IMG, "right", msgText);
    output(msgText);
});

function output(input) {
    let product;
    let text = input.toLowerCase()
        .replace(/[\W_]/g, "")
        .trim()
        .replace(/ a /g, "")
        .replace(/i feel/g, "")
        .replace(/what's/g, "what is")
        .replace(/please /g, "")
        .replace(/r u/g, "are you");

    if (compare(prompts, replies, text)) {
        product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
        product = "You're welcome";
    } else if (text.match(/(robot|bot|robo)/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }

    const delay = input.split("").length * 100;
    setTimeout(() => {
        addChat(BOT_NAME, BOT_IMG, "left", product);
    }, delay);
}

function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyfound = false;
    for (let x = 0; x < promptsArray.length; x++) {
        for (let y = 0; y < promptsArray[x].length; y++) {
            if (string.includes(promptsArray[x][y])) {
                let replies = repliesArray[x];
                reply = replies[Math.floor(Math.random() * replies.length)];
                replyfound = true;
                break;
            }
        }
        if (replyfound) { break; }
    }
    return reply;
}

function addChat(name, img, side, text) {
    const msgHTML = `
        <div class="msg ${side}-msg">
            <div class="msg-img" style="background-image: url(${img})"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                    <div class="msg-info-time">${Formdate(new Date())}</div>
                </div>
                <div class="msg-text">${text}</div>
            </div>
        </div>`;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function get(selector, root = document) {
    return root.querySelector(selector);
}

function formdate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
