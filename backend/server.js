import express from 'express';
import cors from 'cros';

const app = express();

app.use(cors());

app.get('/',(req ,res) => {
    res.send('server is ready');
});

const port = process.env.PORT  || 3000;

app.listen(port,()=>{
    console.log(`Serve at http://localhost:${port}`)
}
);