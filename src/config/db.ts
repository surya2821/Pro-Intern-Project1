// MongoDB Connection Configuration
export const dbConfig = {
  url: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  dbName: 'dv',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
};