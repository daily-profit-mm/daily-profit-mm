let latestData = { mod: null, net: null, updatedAt: null }; // Global memory cache

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(latestData); // api/live.js က လှမ်းယူဖို့
  }

  try {
    const update = req.body;
    const text = update?.channel_post?.caption || update?.channel_post?.text || '';
    
    const modMatch = text.match(/MOD\s*::\s*(\d+)/i);
    const netMatch = text.match(/NET\s*::\s*(\d+)/i);

    if (modMatch || netMatch) {
      if (modMatch) latestData.mod = modMatch[1];
      if (netMatch) latestData.net = netMatch[1];
      latestData.updatedAt = new Date().toISOString();
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Error' });
  }
}
