
# Aries: crypto shopping platform

This is an e-commerce application that allow users to shop online with any crypto currency.


## API Reference

#### Create product

```http
  POST /api/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access_token` | `string` | **Required**. Your access_token |


#### Get all products

```http
  GET /api/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get product

```http
  GET /api/products/${product_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product_id`      | `string` | **Required**. Id of item to fetch |

#### Update product

```http
  PUT /api/products/${product_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product_id`      | `string` | **Required**. Id of item to fetch |

#### Delete product

```http
  DELETE /api/products/${product_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product_id`      | `string` | **Required**. Id of item to fetch |


#### Get performance metrics

```http
  GET ${endpoint}/metrics
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `endpoint`      | `string` | **Required**. api endpoint  |





## Tech Stack

**Client:** React, Redux, TailwindCSS, Typescript

**Server:** Node, Express, MongoDB, Typescript


## Authors

- [@ErnestCodes](https://www.github.com/ErnestCodes)


