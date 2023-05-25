import * as mongoose from 'mongoose';


export const CompanySchema = new mongoose.Schema({
    name: String,

    email: String,

    address: String,

    organizationId: String,
    
    employees: []
})
