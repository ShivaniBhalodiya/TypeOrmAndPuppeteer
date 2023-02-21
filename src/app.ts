import * as express from "express"
import { Request, Response } from "express"
import { User } from "./entity/User"
import { Covid } from "./entity/covid"
import  myDataSource  from "./app-data-source"
const puppeteer = require("puppeteer");
// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
app.use(express.json())

// register routes
app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find()
    res.json(users)

})



// app.get("/users/:id", async function (req: Request, res: Response) {
//     const results = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     return res.send(results)
// })

app.post("/users", async function (req: Request, res: Response) {
  const user = await myDataSource.getRepository(User).create(req.body)
  const results = await myDataSource.getRepository(User).save(user)
  return res.send(results)
})

// app.put("/users/:id", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     myDataSource.getRepository(User).merge(user, req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})

app.post("/covidData", async function (req: Request, res: Response) {

  (async () => {
      try {
        const browser = await puppeteer.launch({ headless: false});
        const page = await browser.newPage();
        console.log('Page opened')
        await page.goto("https://www.worldometers.info/coronavirus/", { waitUntil: 'domcontentloaded' });
        await page.waitForSelector("table#main_table_countries_today");
        console.log('Link opened')
        const worldData = await page.evaluate(() => {
          const tbody = document.querySelector(
            "table#main_table_countries_today tbody"
          );

          const trs = Array.from(
            tbody.querySelectorAll("tr:not(.total_row_world)")
          );
            console.log("trs",trs)
          const worldData = [];

          for (const tr of trs) {
            const tds = Array.from(tr.querySelectorAll("td"));
            const data = tds.slice(1, 15).map((td) => td.innerText);
            worldData.push(data);
          }

          return worldData;
        });
        console.log("worldData",worldData)
        const data = []
        for(let i =0;i<worldData.length;i++){
            const datatmp = worldData[i]

               const temp=  {
                    "Country":datatmp[0],
                    "TotalCases":datatmp[1],
                    "NewCases":datatmp[2],
                    "TotalDeaths":datatmp[3],
                    "NewDeaths":datatmp[4],
                    "TotalRecovered":datatmp[5],
                    "NewRecovered":datatmp[6],
                    "ActiveCases":datatmp[7],
                    "Serious":datatmp[8],
                    "TotCases":datatmp[9],
                    "TotalTests":datatmp[10],
                    "Testspop":datatmp[11],
                    "Population":datatmp[12],
                }

                data.push(temp)

        }
        console.log("data",data)
        await myDataSource
        .createQueryBuilder()
        .insert()
        .into(Covid)
        .values(data)
        .execute()
      } catch (error) {
        console.log(error);
      }
    })();

})
// start express server
app.listen(3000)