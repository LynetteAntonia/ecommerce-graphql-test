# GraphQL E-Commerce Microservice

1. **Catalog Service (REST API)** = menyediakan data produk dummy menggunakan `json-server`.
2. **GraphQL Gateway** = menjembatani frontend melalui query & mutation GraphQL.
3. **Frontend** = tampilan frontend sederhana untuk query dan mutation GraphQL yang dibuat untuk catalog service.

```

## Flow

### 1. Client -> GraphQL Gateway

Frontend mengirim query atau mutation GraphQL ke gateway lewat `http://localhost:4000/graphql`.

### 2. GraphQL Gateway -> Catalog Service

Gateway meneruskan request ke catalog menggunakan Axios untuk CRUD

### 3. Catalog Service -> JSON File (db.json)

Catalog-service menyimpan perubahan data ke `db.json`.

### 4. Gateway -> Client

Gateway mengembalikan response ke frontend sesuai schema.

---

## Cara Run Project

### npm start catalog-service

Server berjalan di: [http://localhost:4001/products]

---

###  npm start graphql-gateway

Server berjalan di: [http://localhost:4000/graphql]

---

### npm start ecommerce-frontend 

Frontend berjalan di: [http://localhost:3000]


---

