import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        errors = []
        page.on("pageerror", lambda err: errors.append(err))

        # We also want to check for failed network requests or console errors
        # related to integrity checks. Subresource integrity errors usually show up
        # as a network error for the resource with an error message in the console.

        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

        print("Navigating to http://localhost:8000...")
        await page.goto("http://localhost:8000", wait_until="domcontentloaded")

        # Give it a moment to fetch resources
        await asyncio.sleep(2)

        # Print all errors
        if errors:
            print("Found errors:")
            for err in errors:
                print(f" - {err}")
        else:
            print("No errors found.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
