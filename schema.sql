 -- Crear tabla de usuarios si no existe
CREATE TABLE IF NOT EXISTS users (
    uuid TEXT UNIQUE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    image TEXT,
    google_id TEXT,
    locale TEXT,
    verified_email BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_uuid ON users(uuid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);


-- Tabla de monedas (coins)
CREATE TABLE IF NOT EXISTS coins (
  id TEXT PRIMARY KEY, -- UUID v4 como texto
  country TEXT NOT NULL,
  description TEXT NOT NULL,
  imageSrc TEXT,
  reason TEXT,
  year INTEGER,
  UNIQUE (country, description)
);

-- Tabla de relación usuario-moneda (user_coins)
CREATE TABLE IF NOT EXISTS user_coins (
  user_id TEXT NOT NULL, -- UUID del usuario (users.uuid)
  coin_id TEXT NOT NULL, -- UUID de la moneda (coins.id)
  PRIMARY KEY (user_id, coin_id),
  FOREIGN KEY (user_id) REFERENCES users(uuid) ON DELETE CASCADE,
  FOREIGN KEY (coin_id) REFERENCES coins(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_coins_user ON user_coins(user_id);
CREATE INDEX IF NOT EXISTS idx_user_coins_coin ON user_coins(coin_id);
