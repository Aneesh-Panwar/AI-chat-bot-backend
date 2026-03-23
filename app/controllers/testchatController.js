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
    "This ",
    "is ",
    "a ",
    "streaming ",
    "response.\n\n",
    "- Point 1\n",
    "- Point 2\n"
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
  }, 300);
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