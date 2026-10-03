const D={clans:{
Gojo:"Prestigious clan; immense cursed-energy reserves and rare Limitless training.",
Zenin:"Major sorcerer clan; strong physical conditioning and inherited-technique lore.",
Kamo:"Bloodline famed for precise cursed-energy control and blood techniques.",
Independent:"No inherited clan; broader skill-tree access and flexible story routes."},
tech:{
Limitless:"Space manipulation: Infinity, Blue, Red and eventually Hollow Purple.",
"Ten Shadows":"Shikigami technique: Divine Dogs, Nue, Toad and later advanced summons.",
"Blood Manipulation":"Controls blood for offense and reinforcement.",
"Cursed Speech":"Words become commands through cursed energy, with backlash.",
Copy:"Reproduces compatible techniques after conditions are met.",
Construction:"Creates physical objects from cursed energy at high CE cost.",
"Straw Doll Technique":"Effigies, nails and Resonance attack through links.",
"Mirror Technique":"Original technique that reflects or redirects cursed energy.",
"Shadow Thread":"Original technique using cursed threads for traps and attacks."},
traits:{
"Deep Reserves":"Large CE pool.",
"Efficient Flow":"Lower CE costs.",
"Surging Output":"More technique damage, higher CE costs.",
"Battle Instinct":"Higher critical/Black Flash potential.",
"Iron Body":"More HP and defense.",
"Glass Cannon":"More damage, less durability.",
"Quick Draw":"Higher chance to act first.",
Executioner:"Bonus damage to weakened enemies.",
"Technique Prodigy":"More technique mastery XP.",
"Reverse Flow":"Improved healing and Reverse Cursed Technique growth.",
"Domain Savant":"Improved Domain progression.",
"Binding Vow Adept":"Stronger Binding Vow benefits.",
Improviser:"Bonus when changing abilities.",
"Fast Learner":"More XP.",
"Natural Talent":"Extra skill points at key levels.",
"Late Bloomer":"Stronger growth after Level 8.",
"Hard Worker":"Balanced growth and occasional bonus skill points.",
Fearless:"Bonus when fighting stronger enemies.",
"Cold-Blooded":"Combat bonuses with story consequences.",
Protector:"Defense bonus when allies are present.",
"Lone Wolf":"Combat bonus when alone.",
"Kind Soul":"Special dialogue and alternate quests.",
"Heavenly Restriction":"Very low CE; exceptional physical power and unique interactions.",
"Six Eyes":"Exceptional CE efficiency and special Limitless interactions.",
"Cursed Womb":"Rare altered origin with unique encounters.",
Vessel:"Certain cursed objects interact differently with you.",
"Heaven's Favor":"Affinity with barriers and hidden routes.",
"Binding Vow: Life for Power":"Permanent sacrifice for extraordinary power."}};
const E=[
["Rotwing","Grade 4",42,8,2,35,"Cursed Residue"],["Sewer Rat Curse","Grade 4",48,9,3,38,"Filthy Talisman"],["Toy Curse","Grade 4",55,10,3,42,"Cracked Charm"],
["Drain Serpent","Grade 3",78,14,6,70,"Venomous Scale"],["Watcher Curse","Grade 3",82,13,7,72,"Watcher Eye"],["Threadling","Grade 3",70,15,4,68,"Cursed Thread"],
["Blood Maw","Grade 2",120,20,10,125,"Blood Talisman"],["Mirror Curse","Grade 2",105,22,12,130,"Mirror Shard"],["Grave Hound","Grade 2",135,19,12,135,"Grave Fang"],["Root Curse","Grade 2",150,17,15,140,"Black Root"],
["Stone Idol Curse","Grade 1",210,29,22,240,"Idol Fragment"],["Mourning Moth","Grade 1",190,34,16,250,"Mourning Powder"],["Mask Curse","Grade 1",235,31,20,270,"Broken Mask"],["Funeral Warden","Grade 1",260,30,25,300,"Warden Seal"],
["Veil Eater","Special Grade",520,45,30,800,"Veil Core"],["The Nameless King","Special Grade",720,52,35,1300,"Nameless Relic"],["Hollow Mother","Special Grade",650,48,38,1200,"Hollow Egg"],["Shrine-Born Curse","Special Grade",900,60,42,2000,"Shrine Fragment"],["The Legacy User","Special Grade",1150,68,45,4000,"Legacy Core"]];
let s=null,b=null;
const $=x=>document.getElementById(x);
function screen(id){["title","create","game"].forEach(x=>$(x).classList.add("hide"));$(id).classList.remove("hide")}
function home(){screen("title")}
function create(){screen("create");$("clan").innerHTML=Object.keys(D.clans).map(x=>`<option>${x}</option>`);$("tech").innerHTML=Object.keys(D.tech).map(x=>`<option>${x}</option>`);$("trait").innerHTML=Object.keys(D.traits).map(x=>`<option>${x}</option>`);["clan","tech","trait"].forEach(x=>$(x).onchange=info);info()}
function info(){$("info").innerHTML=`<b>${$("clan").value}</b> — ${D.clans[$("clan").value]}<br><br><b>${$("tech").value}</b> — ${D.tech[$("tech").value]}<br><br><b>${$("trait").value}</b> — ${D.traits[$("trait").value]}`}
function newState(){let t=$("trait").value,maxhp=100,maxce=80;if(t=="Iron Body")maxhp+=35;if(t=="Deep Reserves")maxce+=45;if($("clan").value=="Gojo")maxce+=20;if(t=="Six Eyes")maxce+=60;if(t=="Heavenly Restriction"){maxce=15;maxhp+=80}return{version:1,name:$("name").value||"Ren",clan:$("clan").value,tech:$("tech").value,trait:t,level:1,xp:0,next:100,hp:maxhp,mhp:maxhp,ce:maxce,mce:maxce,atk:16,def:7,sp:0,area:"Tokyo Jujutsu High",x:4,y:4,season:0,quests:{first:true,clue:false,investigation:false,facility:false,legacy:false},inv:{"Medical Talisman":2},skills:{}}}
function start(){s=newState();save(1);screen("game");render();intro()}
function intro(){scene("THE FIRST CURSE","It is spring, 2006. You have just arrived at Tokyo Jujutsu High. Your first assignment is a routine Grade 3 exorcism at a shuttered arcade.");say("The mission envelope contains one strange detail: someone detected a cursed object nearby.");acts([["Open the mission","firstMission()"],["Explore campus","campus()"]])}
function season(){return["🌸 SPRING","☀️ SUMMER","🍂 AUTUMN","❄️ WINTER"][s.season]}
function render(){ $("who").textContent=s.name;$("build").textContent=`${s.clan} • ${s.tech} • ${s.trait}`;$("lv").textContent=s.level;$("xp").textContent=`${s.xp}/${s.next}`;$("hp").textContent=s.hp;$("mh").textContent=s.mhp;$("ce").textContent=s.ce;$("mc").textContent=s.mce;$("season").textContent=season();$("area").textContent=s.area;map();$("party").innerHTML="• Maki (training partner)";$("inv").innerHTML=Object.entries(s.inv).map(([k,v])=>`<div class=item>• ${k}: ${v}</div>`).join("");$("quests").innerHTML=[["First Mission","first"],["The Cursed Object","clue"],["Hidden Curse","investigation"],["The Broken Veil","facility"],["Cursed Legacy","legacy"]].map(q=>`<div class="quest ${s.quests[q[1]]?"done":"warn"}">▸ ${q[0]} ${s.quests[q[1]]?"✓":"?"}</div>`).join("")}
function map(){let z="";for(let y=0;y<9;y++)for(let x=0;x<9;x++){let c="grass",ch="·";if(y==4||x==4){c="road";ch="="}if((x<2&&y<3)||(x>6&&y>6)){c="forest";ch="♣"}if((x==1&&y==1)||(x==7&&y==1)||(x==1&&y==7)||(x==7&&y==7)){c="building";ch="■"}if(x==4&&y==0){c="gate";ch="⛩"}if(x==s.x&&y==s.y){c="player";ch="★"}z+=`<div class="tile ${c}">${ch}</div>`}$("map").innerHTML=z}
function scene(t,x){$("story").innerHTML=`<div class=title>${t}</div><div class=text>${x}</div>`}
function say(x){$("say").innerHTML=x}
function acts(a){$("actions").innerHTML=a.map(x=>`<button onclick="${x[1]}">${x[0]}</button>`).join("")}
function campus(){s.area="Tokyo Jujutsu High";s.x=4;s.y=4;scene("JUJUTSU HIGH","The 2006 campus is alive with training. Gojo and Geto are students here, though their names have not yet become legends.");say("What will you do?");acts([["Train","train()"],["Talk to a student","student()"],["Mission board","missions()"],["Archives","archives()"],["Advance season","advance()"]]);render()}
function train(){s.xp+=25;s.ce=Math.min(s.mce,s.ce+15);level();say("Training complete. +25 XP and +15 CE.");acts([["Train again","train()"],["Campus","campus()"]]);render()}
function student(){scene("A STRANGE RUMOR","A student tells you that several unrelated missions have recently contained the same unfamiliar crest.");say("“If you find something strange, don't investigate alone.”");acts([["Ask about Gojo","gojo()"],["Leave","campus()"]])}
function gojo(){scene("GOJO SATORU","A white-haired student leans against the doorway, looking amused.");say("Gojo: “That crest? I don't recognize it. Which makes it interesting.”");s.quests.investigation=true;acts([["Search archives","archives()"],["Train","train()"]]);render()}
function firstMission(){s.area="Shibuya Backstreet";scene("THE SHUTTERED ARCADE","A curtain covers an abandoned arcade. Something inside is feeding on fear.");say("Your first real exorcism begins.");acts([["Inspect barrier","barrier()"],["Enter","fight('Rotwing')"],["Return","campus()"]]);render()}
function barrier(){s.quests.clue=true;s.inv["Cursed Object Fragment"]=1;scene("THE CURSED OBJECT","The barrier carries an unknown crest. A fragment of a cursed object is hidden beneath it.");say("This curse was placed here deliberately.");acts([["Enter arcade","fight('Watcher Curse')"],["Return","campus()"]]);render()}
function missions(){scene("MISSION BOARD","Reports mention curses gathering near an old drainage route. The paperwork bears the same crest.");say("A routine assignment may reveal another piece of the mystery.");acts([["Accept","fight('Drain Serpent')"],["Campus","campus()"]])}
function archives(){s.quests.facility=true;s.quests.investigation=true;scene("THE ARCHIVES","Old records point toward an abandoned jujutsu facility beneath Tokyo. Its project name is CURSED LEGACY.");say("The records have been deliberately redacted.");acts([["Investigate","fight('Stone Idol Curse')"],["Campus","campus()"]]);render()}
function advance(){s.season=Math.min(3,s.season+1);s.hp=s.mhp;s.ce=s.mce;if(s.season==1){scene("SUMMER — THE HIDDEN CURSE","Curses are appearing in organized clusters. The investigation moves beyond school grounds.");s.quests.investigation=true;acts([["Investigate","fight('Blood Maw')"],["Campus","campus()"]])}else if(s.season==2){scene("AUTUMN — THE BROKEN VEIL","You locate the abandoned facility. A barrier specialist is waiting inside.");s.quests.facility=true;acts([["Enter","fight('Funeral Warden')"],["Campus","campus()"]])}else{scene("WINTER — CURSED LEGACY","Barriers appear across Tokyo. The organization behind the experiment begins its final operation.");s.quests.legacy=true;acts([["Enter Legacy Shrine","fight('The Legacy User')"],["Prepare","campus()"]])}render();save(1)}
function move(dx,dy){s.x=Math.max(0,Math.min(8,s.x+dx));s.y=Math.max(0,Math.min(8,s.y+dy));if(Math.random()<.17&&s.area!="Tokyo Jujutsu High"){let pool=s.season==0?E.slice(0,6):s.season==1?E.slice(3,10):s.season==2?E.slice(6,14):E.slice(10,15);fight(pool[Math.floor(Math.random()*pool.length)][0])}else{scene("EXPLORATION",`You move through ${s.area}. The air carries a faint trace of cursed energy.`);say("The city is quiet—for now.");acts([["Continue","move(0,0)"],["Return to school","campus()"]])}render()}
function findE(n){return E.find(e=>e[0]==n)}
function fight(n){let e=findE(n);b={n,hp:e[2],atk:e[3],def:e[4],xp:e[5],drop:e[6],phase:1,guard:false};scene("BATTLE",`<b>${n}</b> — ${e[1]}<br><br>Enemy HP: <b>${b.hp}</b>`);say("Choose your action.");combat();render()}
function combat(){acts([["Attack","attack()"],["Technique","techMenu()"],["Guard","guard()"],["Item","item()"],["Run","run()"]])}
function attack(){let d=Math.max(1,s.atk+Math.floor(Math.random()*9)-b.def);if(s.trait=="Glass Cannon")d=Math.floor(d*1.25);if(Math.random()<.08){d*=2;say("BLACK FLASH! Your cursed energy lands in perfect timing.")}b.hp-=d;say(`You deal ${d} damage.`);after()}
function techMenu(){let sets={"Limitless":[["Infinity",10,0],["Blue",16,1.8],["Red",24,2.4]],"Ten Shadows":[["Divine Dog",12,1.5],["Nue",20,1.9],["Toad",10,1.2]],"Blood Manipulation":[["Flowing Red Scale",10,1.7],["Piercing Blood",22,2.3],["Blood Edge",14,1.8]],"Cursed Speech":[["Don't Move",18,1.8],["Blast Away",20,2.1],["Crush",28,2.6]],Copy:[["Copied Strike",18,2]],Construction:[["Cursed Weapon",24,2.5]],"Straw Doll Technique":[["Hairpin",12,1.7],["Resonance",22,2.4]],"Mirror Technique":[["Reflective Edge",14,2],["Redirect",20,2.5]],"Shadow Thread":[["Thread Lash",10,1.8],["Binding Web",18,2.2]]};let a=sets[s.tech]||sets["Shadow Thread"];acts(a.map(m=>[`${m[0]} (${m[1]} CE)`,`technique('${m[0]}',${m[1]},${m[2]})`]).concat([["Back","combat()"]]))}
function technique(n,c,m){if(s.ce<c){say("Not enough cursed energy.");return}s.ce-=c;if(n=="Infinity"){b.guard=true;say("Infinity slows the next attack to almost nothing.");after();return}let d=Math.max(2,Math.floor((s.atk+Math.random()*12)*m-b.def*.35));if(s.trait=="Efficient Flow")s.ce=Math.min(s.mce,s.ce+Math.ceil(c*.25));if(s.trait=="Surging Output")d=Math.floor(d*1.25);if(s.trait=="Improviser")d+=5;b.hp-=d;say(`${n} deals ${d} damage.`);after()}
function guard(){b.guard=true;say("You reinforce your body.");after()}
function item(){if((s.inv["Medical Talisman"]||0)>0){s.inv["Medical Talisman"]--;s.hp=Math.min(s.mhp,s.hp+45);say("Medical Talisman restores 45 HP.");enemy()}else say("No usable items.")}
function after(){if(b.hp<=0)return win();enemy()}
function enemy(){let d=Math.max(1,b.atk+Math.floor(Math.random()*8)-s.def);if(b.guard){d=Math.floor(d*.35);b.guard=false}if(b.n=="The Legacy User"&&b.hp<750&&b.phase==1){b.phase=2;scene("BOSS PHASE 2","The Legacy User tears a stolen technique from the air. Multiple cursed techniques flicker around them.");d+=18}if(b.n=="The Legacy User"&&b.hp<400&&b.phase==2){b.phase=3;scene("BOSS PHASE 3 — ARTIFICIAL EVOLUTION","The Legacy Shrine opens. Every barrier in Tokyo points toward this chamber.");d+=25}s.hp-=d;say(`${b.n} attacks for ${d} damage.`);if(s.hp<=0){s.hp=Math.ceil(s.mhp*.25);s.ce=Math.ceil(s.mce*.25);say("You collapse, but a school barrier carries you back to safety.");acts([["Recover","campus()"]])}else combat();render();save(1)}
function win(){s.xp+=b.xp;s.inv[b.drop]=(s.inv[b.drop]||0)+1;s.hp=Math.min(s.mhp,s.hp+15);s.ce=Math.min(s.mce,s.ce+15);level();if(b.n=="The Legacy User"){s.quests.legacy=false;scene("CURSED LEGACY — END","The Legacy Shrine falls silent. The experiment is over. The records leave one final question: what will you become after 2006?");say("Your ending reflects the character you built.");acts([["Character","character()"],["Save","saves()"],["New Game","create()"]])}else{scene("EXORCISM COMPLETE",`You defeated <b>${b.n}</b>.<br><br>+${b.xp} XP<br>Obtained: ${b.drop}`);say("The cursed energy disperses.");acts([["Campus","campus()"],["Advance season","advance()"]])}render();save(1)}
function run(){if(Math.random()<.65){say("You escape.");acts([["Return","campus()"]])}else{say("You can't escape!");enemy()}}
function level(){while(s.xp>=s.next){s.xp-=s.next;s.next=Math.floor(s.next*1.35);s.level++;s.mhp+=12;s.mce+=8;s.atk+=3;s.def+=2;s.hp=s.mhp;s.ce=s.mce;s.sp++;if(s.trait=="Natural Talent")s.sp++}}
function skills(){let a=[["Cursed Energy Reinforcement",1,"+4 ATK, +2 DEF"],["Divergent Fist",2,"Chance for delayed cursed-energy damage"],["Black Flash Training",3,"Improves Black Flash chance"],["Reverse Cursed Technique",5,"Unlocks advanced healing"],["Simple Domain",7,"Anti-domain defense"],["Domain Expansion",10,"Technique-specific late-game domain"],["Maximum Technique",12,"Maximum output technique where applicable"],["Binding Vow Mastery",8,"Stronger vow benefits"]];$("modalBody").innerHTML="<h2>SKILL TREE</h2>"+a.map(x=>`<div class=skill><b>${x[0]}</b> <span class=small>Lv ${x[1]}</span><br>${x[2]}<br><button ${s.level<x[1]||s.skills[x[0]]||!s.sp?"disabled":""} onclick="learn('${x[0]}')">${s.skills[x[0]]?"LEARNED":s.level>=x[1]?"LEARN":"LOCKED"}</button></div>`).join("");openM()}
function learn(n){if(s.sp<1||s.skills[n])return;s.sp--;s.skills[n]=1;if(n=="Cursed Energy Reinforcement"){s.atk+=4;s.def+=2}skills();render();save(1)}
function character(){$("modalBody").innerHTML=`<h2>${s.name}</h2><p><b>Clan:</b> ${s.clan}<br><b>Technique:</b> ${s.tech}<br><b>Trait:</b> ${s.trait}</p><p>Level ${s.level} • XP ${s.xp}/${s.next}<br>HP ${s.hp}/${s.mhp} • CE ${s.ce}/${s.mce}<br>ATK ${s.atk} • DEF ${s.def}<br>Skill Points ${s.sp}</p>`;openM()}
function saves(){$("modalBody").innerHTML=`<h2>SAVE MANAGER</h2><p>Local browser saves plus portable JSON export/import.</p><button onclick="save(1)">SAVE 1</button><button onclick="save(2)">SAVE 2</button><button onclick="save(3)">SAVE 3</button><button onclick="exportSave()">EXPORT SAVE</button><button onclick="document.getElementById('file').click()">IMPORT SAVE</button><input id=file type=file accept=.json style=display:none onchange="importSave(event)"><p>Slot status: ${[1,2,3].map(n=>localStorage.getItem("JJKCL"+n)?"Slot "+n+" ✓":"Slot "+n+" empty").join(" • ")}</p>`;openM()}
function save(n){if(!s)return;localStorage.setItem("JJKCL"+n,JSON.stringify({...s,savedAt:new Date().toISOString()}));if(n==1){/* autosave */}}
function load(){let a=[1,2,3].map(n=>{let r=localStorage.getItem("JJKCL"+n);if(!r)return`<div class=skill>Slot ${n}: empty</div>`;let x=JSON.parse(r);return`<div class=skill>Slot ${n}: ${x.name} — Level ${x.level}<button onclick="loadSlot(${n})">LOAD</button></div>`}).join("");$("modalBody").innerHTML="<h2>LOAD GAME</h2>"+a;openM()}
function loadSlot(n){let r=localStorage.getItem("JJKCL"+n);if(!r)return;let x=JSON.parse(r);if(x.version!=1)return alert("Incompatible save.");s=x;closeM();screen("game");render();scene("SAVE LOADED","Your adventure continues.");acts([["Continue","campus()"]])}
function exportSave(){let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(s,null,2)],{type:"application/json"}));a.download=`JJK_Cursed_Legacy_${s.name}_Slot1.json`;a.click()}
function importSave(e){let f=e.target.files[0],r=new FileReader();r.onload=()=>{try{let x=JSON.parse(r.result);if(x.version!=1)throw 0;localStorage.setItem("JJKCL1",JSON.stringify(x));alert("Imported to Slot 1.")}catch{alert("Invalid or incompatible save.")}};r.readAsText(f)}
function help(){$("modalBody").innerHTML="<h2>HOW TO PLAY</h2><p>Explore, battle curses, gain XP, learn skills and advance through Spring, Summer, Autumn and Winter. Clan, technique and trait change your character and combat options. Late-game progression includes Reverse Cursed Technique, Simple Domain, Maximum Technique and Domain Expansion.</p>";openM()}
function openM(){$("modal").classList.remove("hide")}function closeM(){$("modal").classList.add("hide")}
document.addEventListener("keydown",e=>{if($("game").classList.contains("hide")||b)return;if(e.key=="ArrowLeft")move(-1,0);if(e.key=="ArrowRight")move(1,0);if(e.key=="ArrowUp")move(0,-1);if(e.key=="ArrowDown")move(0,1)})
screen("title");
