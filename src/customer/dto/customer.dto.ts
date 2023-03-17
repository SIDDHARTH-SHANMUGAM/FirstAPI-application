import { IsString , IsEmail,IsNumber} from "class-validator";
// import { IsNumber } from "class-validator";

export class CustomerDto{
    @IsString()
    customerName : string;

    @IsNumber()
    mobileNumber : number;
    
    @IsEmail()
    email : string;
    
    @IsNumber()
    purchaseAmount : number;

    @IsNumber()
    discount : number;
    
}