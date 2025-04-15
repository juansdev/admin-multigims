export async function GET() {
    return await fetch("http://65.109.172.234:3000/discord-users").then(async res => {
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        return res;
    }).catch(error => {
        console.error("Error fetching data:", error);
        return new Response(
            JSON.stringify({error: "Failed to fetch data"}), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
    });
}