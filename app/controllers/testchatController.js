export function delayResponse(req, res) {
  const { message } = req.body;

  const delay = Math.random() * 2000 + 1000;

  setTimeout(() => {
    res.json({
      reply: `Delayed response for: ${message}\n\n- Hostel\n- Fees\n- Admission`
    });
  }, delay);
}

export function randomError(req, res) {
  const delay = Math.random() * 2000 + 500;

  setTimeout(() => {
    if (Math.random() < 0.5) {
      return res.status(500).json({
        error: "Random server failure"
      });
    }

    res.json({
      reply: "This request succeeded after randomness."
    });
  }, delay);
}

export function slowResponse(req, res) {
  setTimeout(() => {
    res.json({
      reply: "This took a LONG time... (5 seconds)"
    });
  }, 5000);
}

export function largeResponse(req, res) {
  const text = Array(50)
    .fill("This is a long response line.")
    .join("\n");

  res.json({
    reply: text
  });
}

export function streamResponse(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  const chunks = [
  "Space ", "exploration ", "is ", "the ", "discovery ", "and ", "exploration ", 
  "of ", "celestial ", "structures ", "in ", "outer ", "space ", "by ", "means ", 
  "of ", "evolving ", "and ", "growing ", "space ", "technology.\n", "While ", 
  "the ", "study ", "of ", "space ", "is ", "carried ", "out ", "mainly ", "by ", 
  "astronomers ", "with ", "telescopes, ", "the ", "physica l", "exploration ", 
  "of ", "space ", "is ", "conducted ", "both ", "by ", "unmanned ", "robotic ", 
  "space ", "probes ", "and ", "human ", "spaceflight.\n\n", "The ", "era ", "of ", 
  "modern ", "rocketry ", "began ", "in ", "the ", "early ", "20th ", "century, ", 
  "driven ", "by ", "the ", "visionary ", "work ", "of ", "scientists ", "like ", 
  "Konstantin ", "Tsiolkovsky ", "and ", "Robert ", "Goddard. ", "However, ", 
  "it ", "wasn't ", "until ", "the ", "mid-1950s ", "that ", "the ", "technology ", 
  "matured ", "enough ", "to ", "reach ", "orbit.\n", "The ", "launch ", "of ", 
  "Sputnik ", "1 ", "in ", "1957 ", "marked ", "the ", "official ", "start ", 
  "of ", "the ", "Space ", "Race, ", "a ", "period ", "of ", "intense ", "rivalry ", 
  "between ", "the ", "United ", "States ", "and ", "the ", "Soviet ", "Union. ", 
  "This ", "competition ", "accelerated ", "technological ", "leaps, ", 
  "leading ", "to ", "the ", "historic ", "Apollo ", "11 ", "mission ", "in ", 
  "1969, ", "where ", "humans ", "first ", "set ", "foot ", "on ", "the ", "lunar ", 
  "surface.\n\n", "Today, ", "the ", "focus ", "has ", "shifted ", "toward ", 
  "Mars ", "colonization, ", "asteroid ", "mining, ", "and ", "deep ", "space ", 
  "telescopes ", "capable ", "of ", "peering ", "back ", "to ", "the ", "dawn ", 
  "of ", "the ", "universe."
];

  let i = 0;

  const interval = setInterval(() => {
    if (i < chunks.length) {
      res.write(chunks[i]);
      i++;
    } else {
      clearInterval(interval);
      res.end();
    }
  }, 5);
}

export function multiMessage(req, res) {
  res.json({
    replies: [
      "First part of response",
      "Second part of response",
      "Final part"
    ]
  });
}
