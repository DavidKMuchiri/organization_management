import { Controller, UsePipes, ValidationPipe, Body, Post, Get, Param, Put, Delete, UseGuards  } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './dtos/employee.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('employees')
@UseGuards(AuthGuard)
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService){}

    @Get('')
    async allEmployees() : Promise<Employee[]>{
        const employee = await this.employeesService.getAllEmployees();

        return employee;
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    async addEmployee(@Body() employeeDetails: Employee) : Promise<{id: string}>{
        const generatedId = await this.employeesService.createEmployee(employeeDetails)

        return {id: generatedId};
    }

    @Get(':id')
    async getOneEmployee(@Param('id') employeeId: string) : Promise<Employee>{
        const employee = await this.employeesService.getEmployeeById(employeeId);

        return employee;
    }

    @Delete('delete/:id')
    async deleteEmployee(@Param('id') employeeId: string) : Promise<{}>{
        const results = await this.employeesService.deleteEmployee(employeeId);

        return results;
    }

    @Put('update/:id')
    async editEmployee(@Body() changes: Employee, @Param('id') employeeId: string) : Promise<Employee>{
        const results = await this.employeesService.updateEmployee(employeeId, changes);

        return results;
    }
}
