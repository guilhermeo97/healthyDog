import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { School } from '../../domain/school';

@Entity('school')
export class SchoolEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  @Column()
  cnpj: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(
    name: string,
    cnpj: string,
    address: string,
    phone: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
    id?: number,
  ) {
    this.id = id || undefined;
    this.name = name;
    this.cnpj = cnpj;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.createdAt = createdAt ? createdAt : new Date();
    this.updatedAt = updatedAt ? updatedAt : new Date();
  }

  static toEntity(school: School): SchoolEntity {
    return new SchoolEntity(
      school.getName(),
      school.getCnpj(),
      school.getaddress(),
      school.getPhone(),
      school.getEmail(),
      school.getCreatedAt(),
      school.getUpdatedAt(),
    );
  }

  toDomain(): School {
    return new School(
      this.name,
      this.cnpj,
      this.address,
      this.phone,
      this.email,
      this.id,
      this.createdAt,
      this.updatedAt,
    );
  }
}
