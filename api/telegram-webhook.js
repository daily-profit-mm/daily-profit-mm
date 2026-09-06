export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'OK' });
  }

  try {
    const update = req.body;
    console.log('Received update:', JSON.stringify(update));
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(200).json({ success: false });
  }
}
