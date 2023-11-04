# Z-Scrape

### A simple tool to automate scraping data from websites.

- Runs Headless Chrome to visit sites.
- Default interval has been set to 10s. The link will load most probably and moves to the next link. If not, increase the interval.
- Links and Category Headers needs to be in order for appropriate mapping.

> Usage

- Install deps: ` npm install`
- Replace the `linksArray[]` and `categoriesArray[]` manually in `index.js` and run ` node .`
- Could've made a CLI tool to take the input but right now it does the job.

# Output

- Writes generated file to **./generated/FileName.json/**
- `if(!data)`: appends an empty `array[]` to the appropriate header title.
