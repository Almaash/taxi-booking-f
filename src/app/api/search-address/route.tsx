// import { NextResponse } from "next/server";
// const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

// export async function GET(request: any) {
//   const { searchParams } = new URL(request.url);

//   const searchText = searchParams.get("q");

//     const res = await fetch(
//       BASE_URL +
//         "?q=" +
//         searchText +
//         "?language=en&limit=6&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&country=US" +
//         "&access_token=" +
//         'pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A',
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log(res.json())


//   let mapData 
// //   const res = await fetch(
// //     `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
// //   )
// //     .then((response) => response.json())
// //     .then((data) => mapData=data);
// //   const searchReasult = await res.json();
//   return NextResponse.json({ res });
// }


import { NextResponse } from "next/server";
const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");

  // Make sure we have a search query
  if (!searchText) {
    return NextResponse.json({ error: "No search query provided" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${BASE_URL}?q=${searchText}&language=en&limit=6&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&country=ind&access_token=pk.eyJ1Ijoia3VsZW1iZXRvdiIsImEiOiJjbHc2N2Nyc3kxcmpkMnJwZHNqcHFha2VwIn0.WXe-0CaUDyNjjzIj2Z3m0A`, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is ok
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch data from Mapbox" }, { status: res.status });
    }

    const data = await res.json();  // Wait for JSON parsing
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
