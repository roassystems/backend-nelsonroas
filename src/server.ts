import app from "./app";

const port = process.env.PORT || 3000;
const urlenv = process.env.DATABASE_URL;
app.listen(port, () =>{
  console.log(`Servidor backend Nelson Roas, corriendo en http://localhost:${port}`);
  console.log(`variable de ambiente del contenerdor configurada:${urlenv} `);
}
);
