CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name VARCHAR(200) NOT NULL,
  price INTEGER NOT NULL,          -- lưu cents, khớp với frontend
  image TEXT,
  category VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  order_code VARCHAR(50) UNIQUE NOT NULL,
  customer_email VARCHAR(100),
  total_amount INTEGER NOT NULL,   -- cents
  status VARCHAR(30) DEFAULT 'processing',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(200) NOT NULL,
  image TEXT,
  price INTEGER NOT NULL,
  quantity INT NOT NULL,
  subtotal INTEGER NOT NULL,
  delivery_option_id VARCHAR(50)
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  order_id UUID REFERENCES orders(id),
  amount INTEGER NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'Visa',
  status VARCHAR(30) DEFAULT 'Completed',
  created_at TIMESTAMP DEFAULT NOW()
);