import * as mongoose from 'mongoose';


export const OrganizationSchema = new mongoose.Schema({
    name: String,

    email: String,

    country: String,

    companies: []
})
