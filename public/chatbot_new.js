const msgerForm =document.querySelector(".msger-inputarea");
const msgerInput = document.querySelector(".msger-input");
const msgerChat = document.querySelector(".msger-chat");
const BOT_IMG="NOVA.png";
const PERSON_IMG="user_2.png";
const BOT_NAME = "NOVA";
const PERSON_NAME = "You";
const prompts=[
    ["Hi","Hello","Good morning","Good afternoon"],
    ["how are you","how is life","how are things going on"],
    ["What are you doing?","What is going on?","What's up?"],
    ["What is your age","How old are you?"],
    ["Who are you"],
    ["Your name please","Your name","May I know your name","What is your name?"],
    ["happy","Good","Wonderful","Fantastic","Cool"],
    ["Help me","Tell me a joke","Tell me some story"],
    ["no","not sure","lol","funny"],
    ["what","Why","Where","When"],
    [""],["What should I eat today?"],["Suggest some good books."],
    ["tired","boring","bad"],
    ["see you later","good bye","bye"]
];

const replies=[
    ["Hii","Hello!","Good morning","Good afternoon","Hi there!"],
    ["Fine...How are you?","Pretty well,what about you?","Good and your's"],
    ["Nothing much.","Just waiting to help someone.","Can you guess?"],
    ["I am infinite."],
    ["A friendly bot"],
    ["I am NOVA","NOVA. What is your name","YES, NOVA","My name is NOVA"],
    ["I would love being friend with you."],
    ["happy","Good","Wonderful","Fantastic","Cool"],
    ["Help me","Tell me a joke","Tell me some story"],
    ["no","not sure","lol","funny"],
    // ["what","Why","Where","When"],
    ["Hii","Hello!","Good morning","Good afternoon","Hi there!"],
    ["Fine...How are you?","Pretty well,what about you?","Good and your's"],
    ["You can get many good books from here- url(https://www.roomtoread.org/publishing/?utm_source=AD_2023_Google_Grant&utm_medium=cpc&utm_campaign=Room_to_Read_Book_Publishing&utm_content=Room_to_Read_Book_Publishing&gad_source=1&gclid=CjwKCAiAopuvBhBCEiwAm8jaMRlttT1kQYdQsH3UeYHrpE91Aui6YAe5J6Ga1A5580y8SnM-30SbGxoCpfQQAvD_BwE)"],
    ["tired","boring","bad"],
    ["see you later","good bye","bye"]
];
const alternatives=[
    "Same",
    "Go on....",
    "Try again",
    "I'm Listening....",
    "I did'n get :/"
];

const robot=["How do you do","I am not a bot."];

msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;
  msgerInput.value="";
  addChat(PERSON_NAME,PERSON_IMG,"right",msgText);
  output(msgText);
});

function output(input){
    let product;
    let text=input.toLowerCase().replace(/[\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text=text
    .replace(/ a /g, "")
    .replace(/i feel /g, "")
    .replace(/whats /g, "what is")
    .replace(/please /g, "")
    .replace(/ please /g, "")
    .replace(/r u /g, "are you");

    if(compare(prompts,replies,text)){
        product=compare(prompts,replies,text);

    }else if(text.match(/thank/gi)){
        product="You're welcome.";
    }
    else if(text.match(/(robot|bot|robo)/gi)){
        product.robot[Match.floor(Math.random()*robot.length)];
    }
    else{
        product=alternatives[Math.floor(Math.random()*alternatives.length)];
    }
    const delay=input.split(" ").length*100;
    setTimeout(()=>{
        addChat(BOT_NAME,BOT_IMG,"left", product);
    },delay);
}

function compare(promptsArray,repliesArray,string){
    let reply;
    let replyFound=false;
    for(let x=0;x<promptsArray.length;x++){
        for(let y=0;y<promptsArray[x].length;y++){
            if(promptsArray[x][y]==string){
                let replies=repliesArray[x];
                reply=replies[Math.floor(Math.random()*replies.length)];
                replyFound=true;
                break;
            }
        }
        if(replyFound){
            break;
        }
    }
    return reply;
}

function addChat(name,img,side,text){
    const msgHTML = `
    <div class="msg ${side}-msg">
    <div class="msg-img" style="background-image: url(${img})"></div>
    <div class="msg-bubble">
    <div class="msg-info">
    <div class="msg-info-name">${name}</div>
    <div class="msg-info-time">${FormDate(new Date())}</div>
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

function FormDate(date){
    const h="0"+date.getHours();
    const m="0"+date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min,max){
    return Math.floor(Maths.random()*(max-min)+min);
}
