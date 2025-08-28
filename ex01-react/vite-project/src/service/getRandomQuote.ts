export async function getRandomQuote(): Promise<string>{
    const baseUrl:string = 'https://aos-unicap-ex01.vercel.app';
    const response = await fetch(`${baseUrl}/inspiration`);

    const data = await response.json();
    console.log(data);
    return data.quote;
}