const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Render services API is running. Go to /services');
});

app.get('/services', async (req, res) => {
  try {
    const response = await fetch('https://api.render.com/v1/services?limit=20', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.RENDER_API_KEY}`
      }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
