import { Body, Controller ,Get, Param, ParseIntPipe, Patch, Post, HttpStatus } from '@nestjs/common';
import { Delete, Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { CustomerService } from './customer.service';
import { CustomerDto } from './DTO/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customer : CustomerService){}

    @Get()
    get()
    {
        // return all customer details according to weightedAmount in descending order
        return this.customer.get();
    }

    @Get(':customerId')
    getUser(@Param('customerId' , ParseIntPipe) customerId : number)
    {
        // return a single customer details according to given customerId
        return this.customer.getUser(customerId);
    }

    @Post()
    create(@Body() createcusDto : CustomerDto, @Res() res:Response,)
    {
        // create a new customer profile in the database
        const flag =this.customer.create(createcusDto);
        if(flag==1){
            res.status(HttpStatus.BAD_REQUEST).send(HttpStatus.BAD_REQUEST + '   Bad Request');
        }
        else{
            const status=HttpStatus.CREATED + '  Created';
            res.send({status,flag });
        }
    }
    
    @Patch(':customerId')
    async update(@Param('customerId',ParseIntPipe)id: number, @Body() customer: CustomerDto,@Res() res:Response){
        // update a requsted details according to given customerId and returns the updated value
        const flag= await this.customer.update(customer, id);
        if(flag==1){
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND + '  Not Found');
        }
        else{
            const status=HttpStatus.OK+"  Ok";
            res.send({status, flag});
        }
    }

    @Delete(':customerId')
    
    async delete(@Param('customerId',ParseIntPipe)id:number, @Res() res:Response){
        // delete the requested customer profile in the database 
        const flag= await this.customer.delete(id);
        if(flag==1){
            res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND+'  Not Found');
        }
        else{
            const status=HttpStatus.NO_CONTENT + '  No Content';
            res.send(status);
        }
    }
}
