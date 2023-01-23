import express from "express";
import { getAllProducts,getProductById,deleteProduct,updateProduct,createProduct} from "../controllers/Products.js";

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter
