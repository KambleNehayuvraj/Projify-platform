import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nehakamble0026:260620052004@cluster0.vwndk2r.mongodb.net/projify').then(()=>console.log("DB Connected"));
}
