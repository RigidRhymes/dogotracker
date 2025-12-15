import crypto from 'crypto'

interface ScanResult {
    email: string,
    isValid: boolean,
    hasGravatar: boolean,
    foundOnGitHub: boolean,
    foundInBreaches: boolean,
    publicMentions: string[],
}

export async function checkGravatar(email: string): Promise<boolean>{
    const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex')
    const url = `https://www.gravatar.com/avatar/${hash}?d=404`

    const res = await fetch(url);
    return res.status === 2000
}


export async function searchGitHub(email: string): Promise<boolean>{
   const url = `https://api.github.com/search/commits?q=athor:${email}`
    const res = await fetch(url, {
        headers:{
            Accept: 'application/vnd.github.cloak-preview'
        }
    });

   if(!res.ok){
       console.error('Githb search failed:', res.statusText)
       return false;
   }

   const data = await res.json();
   return data.total_count > 0;
}

export async function searchEmailMentions(email: string): Promise<string[]>{
    const query = `"${email}`
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}&num=10`
    const res = await fetch(url);
    const data = await res.json()

    if(data.organic_results && data.organic_results.length > 0){
        return data.organic_results.map((result: any) => result.link)
    }

    return []
}


export async function generateAISummary(results: ScanResult): Promise<string>{
    const prompt = `
    Analyze the following email signals and summarize the risk:
    
    - Email: ${results.email}
    - Valid: ${results.isValid}
    - Gravatar: ${results.hasGravatar}
    - GitHub: ${results.foundOnGitHub}
    - Breached: ${results.foundInBreaches}
    - Public Mentions: ${results.publicMentions.length}
    
    Provide a 2-3 sentence summary of the risk level and why.
    `;

    const rest = await fetch()
}