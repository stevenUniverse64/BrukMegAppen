
// const props = item.rawProperties || {}; beskytter mot at finn returnerer rawProperties: null

function normalizeFinnListing(item) {
  if (!item || !item.id) return null; // Forhindrer krasj om finn returnerer uventede saker
  const props = item.rawProperties || {};

  return {
    source: 'finn',
    //external_id: props.CAMERA_ID || item.id || String(Math.random()),
    external_id: item.id ? String(item.id) : null,
    title: item.heading || 'Ukjent tittel', // Fallback på tittel som hindrer undefined 
    description: props.DESCRIPTION || null,
    price: item.price?.amount || null,
    location: item.location?.name || null,
    image_url: item.images?.[0]?.url || null,
    listing_url: item.canonicalUrl || props.STILL_IMAGE_URL || null,
    category: item.category?.name || null,
    published_at: item.timestamp ? new Date(item.timestamp) : null,
  };
}

module.exports = normalizeFinnListing;

