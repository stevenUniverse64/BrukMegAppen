// Bruker Puppeteer til å (helt lovlig*) låne annonser fra Finn.no
// * Fordi det ikke skal brukes til noe !!!!! DETTE ER ET STUDIEEKSPERIMENT 

const puppeteer = require('puppeteer');
const logger = require('../../utils/logger');

async function scrapeFinn(query) {
  if (!query || !query.trim()) return [];

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    );

    const allListings = [];
    let pageNum = 1;
    let hasMore = true;

    while (hasMore && pageNum <= 10) {
      //const url = `https://www.finn.no/recommerce/forsale/search?q=${encodeURIComponent(query.trim())}&page=${pageNum}`; // Hele Norge
      const url = `https://www.finn.no/recommerce/forsale/search?q=${encodeURIComponent(query.trim())}&location=0.20061&page=${pageNum}`; // Oslo limit

      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      await page.waitForSelector('#seoStructuredData', { timeout: 10000 }).catch(() => {});

      const items = await page.evaluate(() => {
        const script = document.querySelector('#seoStructuredData');
        if (!script) return [];
        try {
          const data = JSON.parse(script.innerText);
          return data?.mainEntity?.itemListElement || [];
        } catch {
          return [];
        }
      });

      if (items.length === 0) {
        hasMore = false;
      } else {
        const listings = items.map((entry) => {
          const product = entry.item;
          const id = product?.url?.split('/').pop() || null;
          return {
            source: 'finn',
            external_id: id,
            title: product?.name || null,
            description: product?.description || null,
            price: product?.offers?.price ? parseInt(product.offers.price, 10) : null,
            location: null,
            image_url: product?.image || null,
            listing_url: product?.url || null,
            category: null,
            published_at: null,
          };
        }).filter((item) => item.external_id && item.listing_url);

        allListings.push(...listings);
        logger.info(`Scrapet Finn side ${pageNum}`, { query, count: listings.length });
        pageNum++;
        await new Promise(r => setTimeout(r, 1500)); // 1.5s pause mellom sider for å ikke overbelaste finn
      }
    }

    logger.info('Scraping fullført', { query, total: allListings.length });
    return allListings;

  } catch (err) {
    logger.error('Feil ved scraping av Finn', { message: err.message });
    return [];
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { scrapeFinn };