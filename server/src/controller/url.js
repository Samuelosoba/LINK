import Url from "../model/url.js";

// POST /shorten
export const changeUrl = async (req, res) => {
  const { originalUrl, shortPath } = req.body;

  // Check if shortPath already exists
  const exists = await Url.findOne({ shortPath });
  if (exists) {
    return res.status(400).json({ message: "Short path already taken." });
  }

  const newUrl = new Url({ originalUrl, shortPath });
  await newUrl.save();

  res.status(201).json({
    message: "Short URL created!",
    shortUrl: `http://${req.headers.host}/${shortPath}`,
  });
};
// GET /:shortPath
export const redirectUrl = async (req, res) => {
  const { shortPath } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortPath });

    if (!urlEntry) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    // Optionally track clicks
    urlEntry.clicks += 1;
    await urlEntry.save();

    return res.redirect(urlEntry.originalUrl);
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};
