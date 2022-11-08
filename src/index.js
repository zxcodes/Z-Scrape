import puppeteer from "puppeteer";
import { writeFileSync } from "fs";

// Links to be visited.
const linksArray = [
  "https://www.justdial.com/Hyderabad/308/On-Demand-Services_fil",
  "https://www.justdial.com/Hyderabad/279/Anything-on-Hire_fil",
  "https://www.justdial.com/loans",
  "https://www.justdial.com/Hyderabad/263/Auto-Care_fil",
  "https://www.justdial.com/Hyderabad/43/Automobile_fil",
  "https://www.justdial.com/Hyderabad/268/Baby-Care_fil",
  "https://www.justdial.com/Hyderabad/200/Banquets_fil",
  "https://www.justdial.com/online-bill-payment",
  "https://www.justdial.com/travel/hotel-booking",
  "https://www.justdial.com/Hyderabad/ods/Pest-Control/nid-10359866",
  "https://www.justdial.com/Travel/Bus-Booking",
  "https://www.justdial.com/Hyderabad/261/Cab-Car-Rental_fil",
  "https://www.justdial.com/Hyderabad/275/Caterer_fil",
  "https://www.justdial.com/Hyderabad/Chemists/nct-10096237",
  "https://www.justdial.com/Hyderabad/312/Civil-Contractors_fil",
  "https://www.justdial.com/Hyderabad/262/Courier_fil",
  "https://www.justdial.com/Hyderabad/278/Daily-Needs_fil",
  "https://www.justdial.com/Hyderabad/239/Dance-Music_fil",
  "https://www.justdial.com/Hyderabad/57/Doctor_fil",
  "https://www.justdial.com/Hyderabad/58/Education_fil",
  "https://www.justdial.com/Hyderabad/60/Emergency_fil",
  "https://www.justdial.com/Hyderabad/272/Event-Organizers_fil",
  "https://www.justdial.com/Hyderabad/210/Fitness_fil",
  "https://www.justdial.com/travel/flight-booking",
  "https://www.justdial.com/Hyderabad/296/flower_fil",
  "https://www.justdial.com/Hyderabad/297/Home-Decor_fil",
  "https://www.justdial.com/Hyderabad/211/Home-Improvements_fil",
  "https://www.justdial.com/Hyderabad/70/Hospitals_fil",
  "https://www.justdial.com/Hyderabad/294/House-Keeping_fil",
  "https://www.justdial.com/Hyderabad/303/Industrial-Products_fil",
  "https://www.justdial.com/insurance",
  "https://www.justdial.com/Hyderabad/284/Interior-Designers_fil",
  "https://www.justdial.com/Hyderabad/International-Calling-Card-Dealers/nct-10272684",
  "https://www.justdial.com/Hyderabad/283/Internet_fil",
  "https://www.justdial.com/Hyderabad/Placement-Services-Candidate/nct-10372869",
  "https://www.justdial.com/Hyderabad/281/Jewellery_fil",
  "https://www.justdial.com/Hyderabad/Pathology-Labs",
  "https://www.justdial.com/Hyderabad/231/Language-Classes_fil",
  "https://www.justdial.com/Hyderabad/280/Loan_fil",
  "https://www.justdial.com/Hyderabad/260/Medical_fil",
  "https://www.justdial.com/Hyderabad/282/Modular-Kitchen_fil",
  "https://www.justdial.com/Hyderabad/237/Packers-Movers_fil",
  "https://www.justdial.com/Hyderabad/206/Party_fil",
  "https://www.justdial.com/Hyderabad/264/Personal-Care_fil",
  "https://www.justdial.com/order-books",
  "https://www.justdial.com/Hyderabad/265/Pet-Pet-Care_fil",
  "https://www.justdial.com/Hyderabad/277/Play-Schools_fil",
  "https://www.justdial.com/real-estate?city=Hyderabad",
  "https://www.justdial.com/Hyderabad/59/Repairs_fil",
  "https://www.justdial.com/Hyderabad/Restaurant-Collections",
  "https://www.justdial.com/Hyderabad/306/Security-Services_fil",
  "https://www.justdial.com/Hyderabad/290/Sports-Coach_fil",
  "https://www.justdial.com/Hyderabad/300/Sports-Goods_fil",
  "https://www.justdial.com/Travel/Train-Booking",
  "https://www.justdial.com/Hyderabad/289/Training-Institute_fil",
  "https://www.justdial.com/Hyderabad/288/Transporters_fil",
  "https://www.justdial.com/Hyderabad/307/Wedding_fil",
];

// Headings that will be mapped to the data list.
const categoriesArray = [
  "On Demand Services",
  "Anything on Hire",
  "Loans",
  "Auto care",
  "Automobile",
  "Baby Care",
  "Banquets",
  "Bills & Recharge",
  "Book Hotel",
  "Pest Control",
  "Bus",
  "Cabs & Car rentals",
  "Caterers",
  "Chemists",
  "Civil Contractors",
  "Courier",
  "Daily Needs",
  "Dance & Music",
  "Doctor",
  "Education",
  "Emergency",
  "Event Organizer",
  "Fitness",
  "Flights",
  "Flowers",
  "Home Decor",
  "Home Improvements",
  "Hospitals",
  "House Keeping",
  "Industrial Products",
  "Insurance",
  "Interior Designer",
  "International SIM Card",
  "Internet",
  "Jobs",
  "Jewellery",
  "Labs",
  "Language Classes",
  "Loan & Credit Card",
  "Medical",
  "Modular Kitchen",
  "Packers and Movers",
  "Party",
  "Personal Care",
  "Books",
  "Pet and Pet Care",
  "Play School",
  "Real Estate",
  "Repairs",
  "Restaurants",
  "Security Services",
  "Sports Coach",
  "Sports Goods",
  "Train",
  "Training Institute",
  "Transporters",
  "Wedding",
];

let state = {
  count: -1,
  finalObject: {},
  tempArr: [],
  interval: 10000,
};

async function scrapeData(navLinks, selectorName, outFileName) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.87 Safari/537.36"
  );

  try {
    await page.goto(navLinks);
  } catch (err) {
    console.log("Something went wrong.", err);
  }

  const dataList = await page.$$eval(`.${selectorName}`, (el) =>
    el.map((item) => item.textContent)
  );

  if (state.count >= 0) {
    state.finalObject[categoriesArray[state.count]] = dataList;
    dataList.forEach((item) => {
      if (!state.tempArr.includes(item)) {
        state.tempArr.push(item);
      }
    });
  }
  if (state.tempArr.length) {
    console.log(`Writing ${categoriesArray[state.count]} to ${outFileName}...`);

    try {
      writeFileSync(
        `../generated/${outFileName}`,
        JSON.stringify(state.finalObject)
      );
    } catch (err) {
      console.log("Something went wrong!", err);
    }
  }
}

setInterval(() => {
  state.count++;
  scrapeData(linksArray[state.count], "meditle", "Data.json");
}, state.interval);
