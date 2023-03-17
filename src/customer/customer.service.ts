import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDto } from './DTO/customer.dto';
import { Customer } from './entity/customer.entity';
import { mergeSort } from './sorting/mergesort';

@Injectable()
export class CustomerService {

    
    constructor(
        @InjectRepository(Customer)
        private customerReopsitory : Repository<Customer>
    ){}
    
    
    async get(): Promise<Customer []>
    {
        // return all customer details according to weightedAmount in descending order
        const temp = await this.customerReopsitory.find();
        const sortedArray=mergeSort(temp);
        return sortedArray;
    }
    
    getUser(customerId: number): Promise<Customer>
    {
        // return a single customer details according to given customerId
        return this.customerReopsitory.findOne({ where : { id : customerId }});
        
    }
    
   
    create(customer : CustomerDto){
        // create a new customer profile in the database
        const newStudent= this.customerReopsitory.create({...customer, createdAt:new Date()});
        this.customerReopsitory.save(newStudent);
        if(Object.keys(customer).length>0){
            return newStudent;
        }
        else{
            return 1;
        }
    }
    
    async update(updatecustDto: CustomerDto , customerId : number){ 
        // update a requsted details according to given customerId and returns the updated value
        this.customerReopsitory.update
        ( 
            customerId  , 
            {...updatecustDto, modifiedAt: new Date()}
        );
        if(await this.customerReopsitory.countBy({ id : customerId })>0){
            return this.customerReopsitory.findOneBy({ id : customerId });
        }
        else{
            return 1;
        }
    }

    async delete( customerId : number)
    {
        // delete the requested customer profile in the database 
        if(await this.customerReopsitory.countBy({ id : customerId })>0){
            return this.customerReopsitory.delete({ id : customerId });
        }
        else{
            return 1;
        }
    }
}
