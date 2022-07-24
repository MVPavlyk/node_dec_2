const express = require('express');
const mongoose = require('mongoose')

const {userRouter} = require('./routes');

const {config} = require('./config');

const app = express();

mongoose.connect('mongodb://localhost:27017/dec')

app.use(express.json());

app.use('/users', userRouter);

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500
        });
});

app.listen(config.PORT, () => {
    console.log(`Started on port ${config.PORT}`);
});
