import Url from "../model/url.js";
export const changeUrl = async (req, res) => {
  const { originalUrl, shortPath } = req.body;
  const owner = req.user?.id;

  console.log("req.user in changeUrl:", req.user);

  const exists = await Url.findOne({ shortPath });
  if (exists) {
    return res.status(400).json({ message: "Short path already taken." });
  }

  const newUrl = new Url({
    originalUrl,
    shortPath,
    owner: owner || undefined, 
  });

  await newUrl.save();

  res.status(201).json({
    message: "Short URL created!",
    shortUrl: `http://${req.headers.host}/${shortPath}`,
  });
};


export const redirectUrl = async (req, res) => {
  const { shortPath } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortPath });

    if (!urlEntry) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    urlEntry.clicks = (urlEntry.clicks || 0) + 1;

    urlEntry.clickDetails.push({
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      referrer: req.get("Referrer") || req.get("Referer"),
    });

    await urlEntry.save();

    return res.redirect(urlEntry.originalUrl);
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};



export const updateUrl = async (req, res, next) => {
  const { shortPath } = req.params;
  const { originalUrl, newShortPath } = req.body;

  try {
    const urlEntry = await Url.findOne({ shortPath });
    if (!urlEntry) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    
    if (newShortPath && newShortPath !== shortPath) {
      const exists = await Url.findOne({ shortPath: newShortPath });
      if (exists) {
        return res
          .status(400)
          .json({ message: "New short path already taken." });
      }
      urlEntry.shortPath = newShortPath;
    }

    if (originalUrl) urlEntry.originalUrl = originalUrl;

    await urlEntry.save();

    res.status(200).json({
      message: "URL updated successfully.",
      url: urlEntry,
      shortUrl: `http://${req.headers.host}/${urlEntry.shortPath}`,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteUrl = async (req, res, next) => {
  const { shortPath } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortPath });
    if (!urlEntry) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    await urlEntry.deleteOne();

    res.status(200).json({ message: "URL deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const getUserLinks = async (req, res) => {
  try {
    const userId = req.user?.id;
    const filter = userId ? { owner: userId } : { owner: null };

    const links = await Url.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ links });
  } catch (err) {
    console.error("Failed to fetch links", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getAnalytics = async (req, res) => {
  const { shortPath } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortPath });

    if (!urlEntry) {
      return res.status(404).json({ message: "Short URL not found." });
    }

    res.status(200).json({
      originalUrl: urlEntry.originalUrl,
      shortPath: urlEntry.shortPath,
      clicks: urlEntry.clicks,
      createdAt: urlEntry.createdAt,
      updatedAt: urlEntry.updatedAt,
      lastAccessed: urlEntry.clickDetails.slice(-1)[0]?.timestamp || null,
      clickDetails: urlEntry.clickDetails, 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
