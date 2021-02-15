import app from './src/app'
import sequelize from './src/database/database.js'

sequelize.sync({force: true}).then(()=>{
    app.listen(3001, ()=>{
        console.log('%s listening on port 3001')
    })
})

