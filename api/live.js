export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.thaistock2d.com/live");
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch live market data",
      message: error.message
    });
  }
}
