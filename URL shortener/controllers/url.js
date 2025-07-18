const shortId = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  try {
    // Step 1: Check if the URL already exists
    let existing = await URL.findOne({ redirectURL: body.url });
    const urls = await URL.find({}); // fetch all for table display

    if (existing) {
      // Step 2: Reuse existing shortId
      return res.render('home', { id: existing.shortId, urls });
    }

    // Step 3: Generate new shortId and create entry
    const shortID = shortId();
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: []
    });

    // Step 4: Re-fetch all URLs including the new one
    const updatedUrls = await URL.find({});
    return res.render('home', { id: shortID, urls: updatedUrls });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.json({
    clickCounter: result.visitHistory.length,
    visitHistory: result.visitHistory
  });
}

module.exports = {handleGenerateNewShortURL,handleGetAnalytics};