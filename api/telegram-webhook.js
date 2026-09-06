export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;

    if (update.channel_post) {
      // ၁။ Caption (သို့မဟုတ် စာသား) ကို ယူခြင်း
      const text = update.channel_post.caption || update.channel_post.text || '';
      
      // ၂။ Telegram မှ ပေးပို့လိုက်သော ရက်စွဲကို ယူခြင်း
      const postDate = new Date(update.channel_post.date * 1000).toLocaleDateString('en-CA'); // YYYY-MM-DD

      // ၃။ MOD နှင့် NET ဂဏန်းများကို ခွဲခြားယူခြင်း
      const modMatch = text.match(/MOD\s*::\s*(\d+)/i);
      const netMatch = text.match(/NET\s*::\s*(\d+)/i);

      const modValue = modMatch ? modMatch[1] : null;
      const netValue = netMatch ? netMatch[1] : null;

      console.log('Date:', postDate);
      console.log('MOD:', modValue);
      console.log('NET:', netValue);

      // TODO: ဒီနေရာမှာ Database (Supabase/Firebase/MongoDB) ထဲ သို့ ထည့်သွင်းနိုင်ပါသည်
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
