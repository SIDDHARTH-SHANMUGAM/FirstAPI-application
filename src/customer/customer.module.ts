import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './entity/customer.entity';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports : [TypeOrmModule.forFeature([Customer])],
})
export class CustomerModule {}
