import { app } from "./src/app";
import dotenv from 'dotenv'

dotenv.config()

app.listen(3000, () => {
  console.log("Server running on 3000");
});
