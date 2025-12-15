
const SerpApi = require('google-search-results-nodejs')

const search = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY);

export async function  searchEmailMentions(email: string): Promise<string[]>{
    return new Promise((resolve, reject) => {
        search.json({
            q: `"${email}" site:pastebin.com OR site:reddit.com OR site:github.com`,
            hl: "en",
            num: 10
        }, (data: any) => {
            console.log('Raw SerpAPI response', data)
            if(data.organic_results  && data.organic_results.length > 0){
                const urls = data.organic_results.map((result: any) => result.link);
                console.log('Extracted URLs:', urls)
                resolve(urls);
            }else {
                resolve([])
                console.warn('No results found for email:', email)
                reject("No results found")
            }
        })

    })

}