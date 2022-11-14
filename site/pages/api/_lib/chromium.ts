import core from 'puppeteer';

let _page: core.Page | null;

async function getPage() {
    if (_page) {
        return _page;
    }
    const browser = await core.launch({ ignoreDefaultArgs: ['--disable-extensions'], headless: true });
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(html: string) {
    const page = await getPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
    await page.setContent(html);
    return await page.screenshot({ type: 'png' });
}
