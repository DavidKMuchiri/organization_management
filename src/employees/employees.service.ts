import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './dtos/employee.dto';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class EmployeesService {
    constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>, private readonly companyService: CompaniesService){}

    async createEmployee(body: Employee) : Promise<string>{
        const existingEmployee = await this.employeeModel.findOne({$or: [
            { email: body.email },
          ],
        })
      
        if(existingEmployee){
            throw new HttpException("Employee already exists", HttpStatus.BAD_REQUEST)
        }
        if(await this.companyService.getCompanyById(body.companyId)){
            const newEmployee = new this.employeeModel(body);
            const results = await  newEmployee.save()
            await this.companyService.addEmployee(body.companyId, results.id)
            return results.id as string;
        }else{
            throw new HttpException("Error in company creation", HttpStatus.BAD_REQUEST);
        }
        // 
    }

    async getAllEmployees() : Promise<Employee[]>{
        const allEmployees = await this.employeeModel.find()

        return allEmployees;
    }

    
    async deleteEmployee(employeeId: string) : Promise<{}>{
        const employeeInfo = await this.getEmployeeById(employeeId);
        let results : {};
        if(employeeInfo){
            await this.companyService.removeEmployee(employeeInfo.companyId, employeeId)
            results = await this.employeeModel.findByIdAndDelete(employeeId);
        }

        return results;
    }
    
    async updateEmployee(employeeId: string, body: Employee)  : Promise<Employee>{
        const employeeInfo = await this.getEmployeeById(employeeId);
        let results: Employee
        if(employeeInfo){
            results = await this.employeeModel.findByIdAndUpdate(employeeId, body, {new: true})
        }

        return results;
        
    }

    async getEmployeeById(id: string) : Promise<Employee>{
        let employee: Employee;
        try {
            employee = await this.employeeModel.findById(id);
        } catch (error) {
            throw new HttpException("No such employee",  HttpStatus.NOT_FOUND);
            
        }

        if(!employee){
            throw new HttpException("No such employee",  HttpStatus.NOT_FOUND);
        }else{
            return employee;
        }
    }
}
