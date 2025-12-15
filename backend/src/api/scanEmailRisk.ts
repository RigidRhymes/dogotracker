import {checkGravatar, searchEmailMentions} from "../utils/checkGravatar";


async function scanEmailRisk(email: string) : Promise<ScanResult> {
    const results: ScanResult = {
        email,
        isValid: false,
        hasGravatar: false,
        foundOnGitHub: false,
        foundInBreaches: false,
        publicMentions: [],
        summary: ''
    }

//     1. Email Verification
    results.isValid = await verifyEmail(email); //via Hunter.io

//     2. Gravatar Check
    results.hasGravatar = await checkGravatar(email)

//     3. GitHub usage
    results.foundOnGitHub = await searchGitHub(email);

    results.publicMentions = await searchEmailMentions(email);


    results.summary = await generateAISummary(results);

    return results;

}