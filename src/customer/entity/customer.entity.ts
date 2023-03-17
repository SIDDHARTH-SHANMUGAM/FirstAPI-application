import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer{
    
    @PrimaryGeneratedColumn({type:'bigint'})
    id : number;

    @Column()
    customerName : string;

    @Column()
    mobileNumber : number;

    @Column()
    email : string;

    @Column({type:'int'})
    purchaseAmount : number;
    
    @Column()
    discount : number;
    
    @Column({default:null})
    createdAt : Date;
    
    @Column({default:null})
    modifiedAt : Date ;

}