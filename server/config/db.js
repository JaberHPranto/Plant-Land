import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_URL, {
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB connected : ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1)
    }
}

export default connectDB