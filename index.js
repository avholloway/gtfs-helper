import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import fetch from "node-fetch";
import express from 'express';
const app = express();

const api_key = const databaseUrl = process.env.api_key;

app.use(express.json());

app.get('/', async (index, res) => {

  try {
    const response = await fetch(`https://gtfsapi.translink.ca/v3/gtfsposition?apikey=${api_key}`);
    if (!response.ok) {
      const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
    }
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
    let entities = [];
    feed.entity.forEach((entity) => {
      entities.push(entity.toJSON());
    });
    res.json(entities);
  } catch (error) {
    res.json({"status":"error","error":error});
  }
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
