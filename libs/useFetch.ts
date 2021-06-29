export async function fetchData(url: string) {
    const res = await fetch(url);
    const content = await res.json();
    return content;
}