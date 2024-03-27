import { app } from "./app";
import "dotenv/config";



app.listen(process.env.PORT, () => {
	console.log(`Servidor rodando em http://localhost:${process.env.PORT} `);
});