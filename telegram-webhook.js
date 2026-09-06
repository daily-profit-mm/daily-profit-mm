export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;

    if (update.channel_post && update.channel_post.photo) {
      const photoArray = update.channel_post.photo;
      const caption = update.channel_post.caption || '';
      const bestPhoto = photoArray[photoArray.length - 1];
      const fileId = bestPhoto.file_id;

      console.log('Received Photo File ID:', fileId);
      console.log('Received Caption:', caption);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
