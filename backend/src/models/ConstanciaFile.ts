import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConstanciaFile {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'blob'})
    blob: Buffer;

    @Column()
    filename: string;

    @Column()
    fileType: string;
}