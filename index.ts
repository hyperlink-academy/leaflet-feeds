import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

const domain = "feeds.leaflet.pub";
const serviceDid = `did:web:${domain}`;
app.get("/.well-known/did.json", (c) => {
  return c.json({
    "@context": ["https://www.w3.org/ns/did/v1"],
    id: serviceDid,
    service: [
      {
        id: "#bsky_fg",
        type: "BskyFeedGenerator",
        serviceEndpoint: `https://${domain}`,
      },
    ],
  });
});

serve(app);
