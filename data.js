import { kagglePlayers } from "./data.generated.js";

// Featured fallback records share the same normalized shape as imported data.
const featuredPlayers = [
 {name:"Miloš Kerkez",club:"Bournemouth",country:"HUN",age:22,position:"Midfielder",marketValue:35,goalsPer90:.08,assistsPer90:.17,xGPer90:.1,xAPer90:.16,tacklesPer90:2.7,interceptionsPer90:1.2,progressiveCarriesPer90:3.4,progressivePassesPer90:4.5,successfulDribblesPer90:1.6,foulsPer90:1.8,pressuresPer90:18.8},
 {name:"Archie Gray",club:"Tottenham",country:"ENG",age:20,position:"Midfielder",marketValue:38,goalsPer90:.03,assistsPer90:.1,xGPer90:.05,xAPer90:.12,tacklesPer90:2.4,interceptionsPer90:1.5,progressiveCarriesPer90:2.6,progressivePassesPer90:6.8,successfulDribblesPer90:1.1,foulsPer90:1.2,pressuresPer90:17.1},
 {name:"Lucas Bergvall",club:"Tottenham",country:"SWE",age:20,position:"Midfielder",marketValue:32,goalsPer90:.16,assistsPer90:.2,xGPer90:.14,xAPer90:.19,tacklesPer90:2.1,interceptionsPer90:.9,progressiveCarriesPer90:3.8,progressivePassesPer90:5.9,successfulDribblesPer90:1.9,foulsPer90:1.4,pressuresPer90:16.4},
 {name:"João Neves",club:"Paris SG",country:"POR",age:21,position:"Midfielder",marketValue:75,goalsPer90:.09,assistsPer90:.15,xGPer90:.08,xAPer90:.18,tacklesPer90:3.1,interceptionsPer90:1.7,progressiveCarriesPer90:3.2,progressivePassesPer90:7.4,successfulDribblesPer90:1.4,foulsPer90:1.6,pressuresPer90:21.3},
 {name:"Kobbie Mainoo",club:"Man United",country:"ENG",age:21,position:"Midfielder",marketValue:50,goalsPer90:.12,assistsPer90:.09,xGPer90:.11,xAPer90:.1,tacklesPer90:2.5,interceptionsPer90:1,progressiveCarriesPer90:4.2,progressivePassesPer90:4.8,successfulDribblesPer90:2.2,foulsPer90:1.7,pressuresPer90:18},
 {name:"Florian Wirtz",club:"Liverpool",country:"GER",age:23,position:"Midfielder",marketValue:120,goalsPer90:.43,assistsPer90:.37,xGPer90:.39,xAPer90:.34,tacklesPer90:1.1,interceptionsPer90:.5,progressiveCarriesPer90:5.7,progressivePassesPer90:7.8,successfulDribblesPer90:2.9,foulsPer90:.7,pressuresPer90:13.1},
 {name:"Benjamin Šeško",club:"RB Leipzig",country:"SVN",age:23,position:"Forward",marketValue:65,goalsPer90:.61,assistsPer90:.12,xGPer90:.57,xAPer90:.09,tacklesPer90:.4,interceptionsPer90:.2,progressiveCarriesPer90:2.1,progressivePassesPer90:1.5,successfulDribblesPer90:1.2,foulsPer90:1,pressuresPer90:10.8},
 {name:"Jérémy Doku",club:"Man City",country:"BEL",age:24,position:"Forward",marketValue:70,goalsPer90:.28,assistsPer90:.31,xGPer90:.32,xAPer90:.3,tacklesPer90:.8,interceptionsPer90:.3,progressiveCarriesPer90:8.4,progressivePassesPer90:3.7,successfulDribblesPer90:5.8,foulsPer90:.9,pressuresPer90:12.2}
];

// Synthetic prospects broaden the prototype without implying scraped or live data.
// Deterministic formulas keep every record reproducible while creating varied profiles.
const prospectNames = [
 "Mateo Silva","Noah Okafor","Elias Lindström","Tariq Mensah","Luka Petrović","Amadou Diallo","Finn Hartmann","Rafael Costa","Owen Mercer","Nico Valenti",
 "Ibrahim Konaté","Santiago Rojas","Hugo Laurent","Marek Zieliński","Youssef Benali","Theo Janssen","Callum Price","Enzo Moretti","Jakub Novák","Malik Traoré",
 "Daan de Wit","Tiago Mendes","Adam Kowalski","Samuel Boateng","Leon Weber","Gabriel Santos","Oscar Nyberg","Rayan Haddad","Jamie Walsh","Tomás Ferreira",
 "Victor Ionescu","Moussa Camara","Emil Andersen","Alex Moreno","Nathan Brooks","Karim Bensaïd","Ivan Horvat","Louis Dupont","Daniel Nwosu","Filip Marković",
 "Ben Carter","Álvaro Ruiz","Ismaël Sylla","Jonas Keller","Mikkel Larsen","Diego Álvarez","Kofi Asante","Robin Meijer","Andrei Popescu","Zakaria El Idrissi",
 "George Bennett","Matías Suárez","Abdoulaye Touré","Ruben Oliveira","Anton Karlsson","Micah Johnson","Stefan Jović","Bilal Aït Ali","Jasper Smit","Pablo Navarro",
 "Dominik Varga","Aliou Diop","Charlie Hughes","Renato Lima","Nils Berg","Hamza Rahmani","Liam O'Connor","Eduardo Molina","Sékou Keita","Tobias Fischer",
 "Marcelo Vega","Aron Gunnarsson","Kwame Osei","Maximilian Roth","Yanis Cherki","Bruno Cardoso","Peter van Dijk","Dario Marin","Isaac Campbell","Mehdi Ziani",
 "Sebastian Lund","Rodrigo Pérez","Femi Adeyemi","Matteo Ricci","Jan Kovač","Ayoub Amrani","Freddie Cooper","Gonçalo Pires","Lamine Fofana","Kristian Eriksen",
 "Nicolás Torres","Amin Bouzid","Harvey Stone","Leandro Ramos","Bence Nagy","Souleymane Ba","Martin Jørgensen","Carlos Domínguez","Jerome Williams","Fabio Conti"
];
const clubs=["Northbridge FC","Racing Union","Sporting Aurora","Olympique Verde","Atletico Portside","Dynamo Central","Royal Borough","FC Meridian","Union 04","AC Riverton"];
const countries=["ENG","ESP","FRA","GER","POR","NED","BEL","SWE","CRO","SEN"];
const round=value=>Math.round(value*100)/100;
const generatedProspects=prospectNames.map((name,index)=>{
 const position=["Midfielder","Forward","Defender"][index%3], attacking=(index*7)%13, defensive=(index*11)%15, progression=(index*5)%17;
 return {name,club:clubs[index%clubs.length],country:countries[(index*3)%countries.length],age:18+(index%12),position,marketValue:5+(index*9)%91,
  goalsPer90:round(position==="Forward"?.18+attacking/20:.02+attacking/55),assistsPer90:round(.04+(attacking+progression)/70),xGPer90:round(position==="Forward"?.2+attacking/22:.03+attacking/60),xAPer90:round(.04+progression/48),
  tacklesPer90:round(position==="Defender"?1.8+defensive/7:.7+defensive/8),interceptionsPer90:round(position==="Defender"?1.2+defensive/12:.3+defensive/14),progressiveCarriesPer90:round(1+progression/3.5),progressivePassesPer90:round(2+progression/2.2),
  successfulDribblesPer90:round(.4+progression/5),foulsPer90:round(.5+defensive/12),pressuresPer90:round(8+defensive*.9)};
});

export const players=kagglePlayers.length?kagglePlayers:[...featuredPlayers,...generatedProspects];
