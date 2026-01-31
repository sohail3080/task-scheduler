import mongoose from 'mongoose'

const connectDB = async () => {
    try {
      const mongoURI = process.env.MONGODB_URI; 
      await mongoose.connect(mongoURI);
      console.log('MongoDB Connected successfully!');
  
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err.message);
      // Exit process with failure
      process.exit(1); 
    }
  };
  
export default connectDB; 
  