-- Safe space aka backbone aka wifey aka postgreSQL

CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    source VARCHAR(50) NOT NULL,
    external_id VARCHAR(255) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price INTEGER,
    location TEXT,
    image_url TEXT,
    listing_url TEXT NOT NULL,
    category TEXT,
    published_at TIMESTAMP,
    fetched_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (source, external_id)
);


