import {app} from './server';
import {db} from './db';


const PORT = process.env.PORT || 4000;

db.connect()
.then(() => {
    console.log('Database connected to PostgreSQL');
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
})
.catch(err => {
    console.error('PostgreSQL connection failed:', err)
    process.exit(1);
})