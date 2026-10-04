export const getNearbyStops = async (req, res) => {
  try {
    const apiKey = process.env.DIGITRANSIT_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Digitransit API key is not configured",
      });
    }

    // Nordic Spices / Leiritie 1, Vantaa area
    const latitude = 60.258135;
    const longitude = 24.844233;

    const query = `
      query {
        nearest(
          lat: ${latitude}
          lon: ${longitude}
          maxDistance: 1500
          filterByPlaceTypes: [STOP]
        ) {
          edges {
            node {
              place {
                ... on Stop {
                  gtfsId
                  name
                  lat
                  lon
                  vehicleMode
                }
              }
              distance
            }
          }
        }
      }
    `;

    const response = await fetch(
      "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "digitransit-subscription-key": apiKey,
        },
        body: JSON.stringify({ query }),
      },
    );

    if (!response.ok) {
      console.error(
        "Digitransit API error:",
        response.status,
        await response.text(),
      );

      return res.status(502).json({
        message: "Failed to fetch public transport information",
      });
    }

    const data = await response.json();

    const stops =
      data?.data?.nearest?.edges
        ?.map((edge) => ({
          id: edge.node.place?.gtfsId,
          name: edge.node.place?.name,
          distance: Math.round(edge.node.distance),
          vehicleMode: edge.node.place?.vehicleMode,
          lat: edge.node.place?.lat,
          lon: edge.node.place?.lon,
        }))
        .filter((stop) => stop.id)
        .slice(0, 5) || [];

    res.json(stops);
  } catch (error) {
    console.error("Error fetching HSL stops:", error);

    res.status(500).json({
      message: "Failed to fetch public transport information",
    });
  }
};
