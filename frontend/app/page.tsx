type Response = {
  message: string,
  success: boolean,
  time: string
}

export default async function Home() {
  let capys: Response = {
    message: "not connected",
    success: false,
    time: ""
  };

  try {
    const res = await fetch(`${process.env.URL}api/health`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      new Error('Failed to fetch data');
    }

    capys = await res.json();

    console.log(capys);

  } catch (error) {
    console.error("Internal fetch error:", error);
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to thecapy.org</h1>
      <h2>Our Resident Capybaras (Rendered via SSR):</h2>

      <h3>
        From Backend: {capys.message}
      </h3>
    </main>
  );
}