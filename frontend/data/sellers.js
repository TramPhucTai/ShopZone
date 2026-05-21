export const sellers =
  JSON.parse(localStorage.getItem('sellers')) || [
    {
    id: "seller-1",
    shopName: "Tai Store",
    email: "tai@gmail.com",
    password: "1234"
  }
  ];

function saveToStorage() {
  localStorage.setItem(
    'sellers',
    JSON.stringify(sellers)
  );
}

export function registerSeller({
  shopName,
  email,
  password
}) {

  const seller = {
    id: crypto.randomUUID(),

    shopName,

    email,

    password
  };

  sellers.push(seller);

  saveToStorage();

  return seller;
}

export function loginSeller(email, password) {

  let matchingSeller;

  sellers.forEach((seller) => {

    if (
      seller.email === email
      &&
      seller.password === password
    ) {
      matchingSeller = seller;
    }

  });

  return matchingSeller;
}