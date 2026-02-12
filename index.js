import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import express from 'express';
const app = express();

// Essential: This allows your app to parse incoming JSON data
app.use(express.json());

// 1 & 3. GET endpoint to check if it's live and return JSON
app.get('/', (index, res) => {
  res.json({ message: "Welcome to gtfs-helper.render.com!" });
});

// 2 & 3. POST endpoint to receive data and return JSON
app.post('/data', (req, res) => {
  const receivedData = req.body;
  console.log("Data received");

  const buffer = await response.arrayBuffer();
  const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
  let entities = [];
  feed.entity.forEach((entity) => {
      entities.push(entity.toJSON());
  });
  
  res.status(200).json({
    status: "success",
    data: entities
  });
});

// Important: Render assigns a port dynamically via process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
