export async function getRandomNumber(): Promise<number>{
    const baseUrl: string = 'https://aos-unicap-ex01.vercel.app';
    const response = await fetch(`${baseUrl}/random`);

    const data = await response.json();
    console.log(data);
    return data.number;
}